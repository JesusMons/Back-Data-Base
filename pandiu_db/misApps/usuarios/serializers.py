"""
Serializers for managing user data in the users app.

This module contains the following serializers:

1. TipoUsuarioSerializer: Serializes the TipoUsuario model.
2. UsuarioTipoUsuarioSerializer: Serializes the UsuarioTipoUsuario model, representing the relationship between Usuario and TipoUsuario.
3. UsuarioSerializer: Serializes the Usuario model, including nested serialization for related fields.

Serializers:
- TipoUsuarioSerializer:
    - Serializes all fields of the TipoUsuario model.

- UsuarioTipoUsuarioSerializer:
    - tipo_usuario: A nested serializer for the TipoUsuario model (read-only).
    - usuario: A primary key related field for the Usuario model (read-only).

- UsuarioSerializer:
    - tipos_usuario: A primary key related field for the many-to-many relationship with TipoUsuario.
    - name_program: A serialized field that returns the program's details (name and ID).
    - program: A primary key related field for the Programa model (write-only).
"""

from rest_framework import serializers
from misApps.usuarios.models import Usuario, TipoUsuario, UsuarioTipoUsuario
from misApps.facultades.serializers import ProgramaSerializer
from misApps.facultades.models import Programa

class TipoUsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer for the TipoUsuario model.

    Serializes all fields of the TipoUsuario model.
    """
    class Meta:
        model = TipoUsuario
        fields = "__all__"


class UsuarioTipoUsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer for the UsuarioTipoUsuario model, representing the relationship 
    between Usuario and TipoUsuario.

    Attributes:
        tipo_usuario: A nested serializer for the TipoUsuario model (read-only).
        usuario: A primary key related field for the Usuario model (read-only).
    """
    tipo_usuario = TipoUsuarioSerializer(read_only=True)  
    usuario = serializers.PrimaryKeyRelatedField(read_only=True)  

    class Meta:
        model = UsuarioTipoUsuario
        fields = ["usuario", "tipo_usuario"]


class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializer for the Usuario model, including fields for personal details and program information.

    Attributes:
        tipos_usuario: A primary key related field for the many-to-many relationship with TipoUsuario.
        name_program: A serialized field that returns the program's details (name and ID).
        program: A primary key related field for the Programa model (write-only).
    """
    tipos_usuario = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=TipoUsuario.objects.all()
    )
   
    name_program = serializers.SerializerMethodField()
    program = serializers.PrimaryKeyRelatedField(
        queryset=Programa.objects.all(),
        write_only=True
    )
    
    class Meta:
        model = Usuario
        fields = ("id", "name", "lastName", "email", "program","name_program", "tipos_usuario")

    def create(self, validated_data):
        """
        Creates a new Usuario instance and associates it with the selected TipoUsuario instances.

        Args:
            validated_data (dict): The validated data for creating a new Usuario.

        Returns:
            Usuario: The newly created Usuario instance.
        """
        tipos_usuario_data = validated_data.pop('tipos_usuario')
        usuario = Usuario.objects.create(**validated_data)
        
        for tipo in tipos_usuario_data:
            UsuarioTipoUsuario.objects.create(usuario=usuario, tipo_usuario=tipo)
        
        return usuario
    
    
    def get_name_program(self, obj):
        """
        Retrieves the program details (ID and name) for the Usuario instance.

        Args:
            obj (Usuario): The Usuario instance.

        Returns:
            dict: A dictionary containing the program's ID and name.
        """
        return {
        "id": obj.program.id,
        "program_name": obj.program.program_name,
    }
   
    def to_representation(self, instance):
        """
        Customizes the representation of the Usuario instance to include detailed user types.

        Args:
            instance (Usuario): The Usuario instance.

        Returns:
            dict: A representation of the Usuario instance, including detailed user types.
        """
        representation = super().to_representation(instance)
        tipos_usuario_full = UsuarioTipoUsuario.objects.filter(usuario=instance)
        representation['tipos_usuario'] = [
            {
                'id': tu.tipo_usuario.id,
                'name': tu.tipo_usuario.name
            }
            for tu in tipos_usuario_full
        ]
        
        return representation