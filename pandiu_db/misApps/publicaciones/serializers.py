"""
Serializers for managing publications, publication types, keywords, and the relationships between them.

These serializers define how the data is converted to and from JSON format for use with the Django REST Framework.

Classes:
    - TipoPublicacionSerializer: Serializer for the TipoPublicacion model.
    - PalabraClaveSerializer: Serializer for the PalabraClave model.
    - PublicacionPalabraClaveSerializer: Serializer for the PublicacionPalabraClave model.
    - PublicacionSerializer: Serializer for the Publicacion model, including related fields and nested serializers.

Fields:
    - TipoPublicacionSerializer:
        - nombre_tipo: The name of the publication type.
        - descripcion: A description providing details about the type.
    - PalabraClaveSerializer:
        - palabra: The keyword associated with publications.
    - PublicacionPalabraClaveSerializer:
        - publicacion: The related publication.
        - palabra_clave: The related keyword.
    - PublicacionSerializer:
        - id: The unique identifier of the publication.
        - titulo: The title of the publication.
        - resumen: A brief summary of the publication.
        - fecha_publicacion: The date when the publication was released.
        - archivo_pdf: (Optional) PDF file of the publication.
        - tipos_publicacion: ForeignKey, write-only, linking the publication to a specific type.
        - tipos_publicacion_info: Nested serializer providing full information about the publication type (read-only).
        - palabras_clave: ManyToManyField, write-only, linking to keywords associated with the publication.
        - palabras_clave_info: Nested serializer providing full information about associated keywords (read-only).
        - grupo_investigacion: ForeignKey, write-only, linking the publication to a specific research group.
        - grupo_investigacion_info: Nested serializer providing full information about the research group (read-only).
        - usuario: ForeignKey, write-only, linking the publication to a specific user.
        - usuario_info: Nested serializer providing full information about the user (read-only).
"""
from rest_framework import serializers
from misApps.publicaciones.models import Publicacion, TipoPublicacion, PalabraClave, PublicacionPalabraClave
from misApps.gruposDeInvestigacion.serializers import GrupoInvestigacionSerializer
from misApps.usuarios.serializers import UsuarioSerializer
from misApps.gruposDeInvestigacion.models import GrupoInvestigacion
from misApps.usuarios.models import Usuario
class TipoPublicacionSerializer(serializers.ModelSerializer):
    """
    Serializer for the TipoPublicacion model.
    
    Fields:
        - nombre_tipo: The name of the publication type.
        - descripcion: A description providing details about the type.
    """
    class Meta:
        model = TipoPublicacion
        fields = ("__all__")


class PalabraClaveSerializer(serializers.ModelSerializer):
    """
    Serializer for the PalabraClave model.
    
    Fields:
        - palabra: The keyword associated with publications.
    """
    class Meta:
        model = PalabraClave
        fields = ("__all__")



class PublicacionPalabraClaveSerializer(serializers.ModelSerializer):
    """
    Serializer for the PublicacionPalabraClave model.
    
    Fields:
        - publicacion: The related publication.
        - palabra_clave: The related keyword.
    """
    class Meta:
        model = PublicacionPalabraClave
        fields = ("__all__")

class PublicacionSerializer(serializers.ModelSerializer):
    """
    Serializer for the Publicacion model, including related fields and nested serializers.
    
    Fields:
        - id: The unique identifier of the publication.
        - titulo: The title of the publication.
        - resumen: A brief summary of the publication.
        - fecha_publicacion: The date when the publication was released.
        - archivo_pdf: (Optional) PDF file of the publication.
        - tipos_publicacion: ForeignKey, write-only, linking the publication to a specific type.
        - tipos_publicacion_info: Nested serializer providing full information about the publication type (read-only).
        - palabras_clave: ManyToManyField, write-only, linking to keywords associated with the publication.
        - palabras_clave_info: Nested serializer providing full information about associated keywords (read-only).
        - grupo_investigacion: ForeignKey, write-only, linking the publication to a specific research group.
        - grupo_investigacion_info: Nested serializer providing full information about the research group (read-only).
        - usuario: ForeignKey, write-only, linking the publication to a specific user.
        - usuario_info: Nested serializer providing full information about the user (read-only).
    """
    tipos_publicacion = serializers.PrimaryKeyRelatedField(
        queryset=TipoPublicacion.objects.all(),
        write_only=True
    )
    
    palabras_clave = serializers.PrimaryKeyRelatedField(
        queryset=PalabraClave.objects.all(),
        many=True,
        write_only=True
    )
    
    grupo_investigacion = serializers.PrimaryKeyRelatedField(
        queryset=GrupoInvestigacion.objects.all(),
        write_only=True
    )
    
    usuario = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        write_only=True
    )

    tipos_publicacion_info = TipoPublicacionSerializer(source='tipos_publicacion', read_only=True)
    palabras_clave_info = PalabraClaveSerializer(many=True, source='palabras_clave', read_only=True)
    grupo_investigacion_info = GrupoInvestigacionSerializer(source='grupo_investigacion', read_only=True)
    usuario_info = UsuarioSerializer(source='usuario', read_only=True)

    class Meta:
        model = Publicacion
        fields = (
            'id',
            'titulo',
            'resumen',
            'fecha_publicacion',
            'archivo_pdf',
            'tipos_publicacion',  # ID for write
            'tipos_publicacion_info',  # Full information for read
            'palabras_clave',  # ID for write
            'palabras_clave_info',  # Full information for read
            'grupo_investigacion',  # ID for write
            'grupo_investigacion_info',  # Full information for read
            'usuario',  # ID for write
            'usuario_info',  # Full information for read
        )