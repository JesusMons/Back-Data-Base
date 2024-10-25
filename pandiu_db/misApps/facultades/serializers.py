"""
Serializers for Facultad and Programa models.

This module provides two serializers to convert Facultad and Programa models
to and from JSON format. It handles validation and custom fields for 
representation of related objects.

Classes:
    - FacultadSerializer: Serializes the Facultad model.
    - ProgramaSerializer: Serializes the Programa model, including a custom 
      field for the related Facultad model's name.

"""

from rest_framework import serializers
from misApps.facultades.models import Facultad, Programa


class FacultadSerializer(serializers.ModelSerializer):
    """
    Serializer for the Facultad model.

    This serializer converts Facultad instances into JSON format and vice versa.
    It uses Django Rest Framework's ModelSerializer, which automatically handles
    the creation of fields based on the Facultad model.

    Meta:
        model (Facultad): The model to be serialized.
        fields (str): The fields to be included in the serialization.
                      "__all__" means all model fields are included.
    """
    class Meta:
        model = Facultad
        fields = ("__all__")


class ProgramaSerializer(serializers.ModelSerializer):
    """
    Serializer for the Programa model.

    This serializer includes a custom method field `facultad_nombre` to provide
    additional information about the related Facultad object. The `facultad`
    field is write-only and expects an ID when creating or updating a Programa
    instance.

    Attributes:
        facultad_nombre (SerializerMethodField): A read-only field that returns 
                                                 the related Facultad's ID and name.
        facultad (PrimaryKeyRelatedField): A write-only field that accepts the
                                           Facultad ID when creating/updating a
                                           Programa instance.
    
    Meta:
        model (Programa): The model to be serialized.
        fields (tuple): The fields to be included in the serialization. These include
                        the 'id', 'program_name', 'facultad' (ID only, for write),
                        and 'facultad_nombre' (custom field for read).

    Methods:
        get_facultad_nombre: Returns a dictionary containing the ID and name of the
                             related Facultad object.
    """
    facultad_nombre = serializers.SerializerMethodField()
    
    # Write-only field for creating/updating the Programa model with Facultad ID
    facultad = serializers.PrimaryKeyRelatedField(
        queryset=Facultad.objects.all(),
        write_only=True
    )

    class Meta:
        model = Programa
        fields = ('id', 'program_name', 'facultad', 'facultad_nombre')

    def get_facultad_nombre(self, obj):
        """
        Returns the ID and name of the related Facultad instance.
        
        Args:
            obj (Programa): The Programa instance.
        
        Returns:
            dict: A dictionary with 'id' and 'nombre_facultad' keys.
        """
        return {
            "id": obj.facultad.id,
            "nombre_facultad": obj.facultad.nombre_facultad
        }
