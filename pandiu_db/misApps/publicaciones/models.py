"""
Models for managing publications, keywords, and types of publications in the research system.

These models define the structure for handling various aspects of research publications, including associating them with research groups, users, publication types, and keywords.

Classes:
    - TipoPublicacion: Represents the type of a publication (e.g., article, book, report).
    - PalabraClave: Represents a keyword that can be associated with a publication.
    - Publicacion: Represents a research publication with fields for title, summary, publication date, PDF file, and relationships to research groups, users, and keywords.
    - PublicacionPalabraClave: Intermediary model to create a many-to-many relationship between Publicacion and PalabraClave.

Fields:
    - TipoPublicacion:
        - nombre_tipo: CharField, the name of the publication type (max 100 characters).
        - descripcion: TextField, a description of the publication type.
    - PalabraClave:
        - palabra: CharField, the keyword associated with a publication (max 100 characters).
    - Publicacion:
        - titulo: CharField, the title of the publication (max 255 characters).
        - resumen: TextField, a brief summary of the publication.
        - fecha_publicacion: DateField, the date of publication.
        - archivo_pdf: FileField, optional field for uploading a PDF file of the publication.
        - grupo_investigacion: ForeignKey to GrupoInvestigacion, linking the publication to a specific research group.
        - usuario: ForeignKey to Usuario, linking the publication to a user.
        - tipos_publicacion: ForeignKey to TipoPublicacion, defining the type of the publication.
        - palabras_clave: ManyToManyField with PalabraClave, allowing multiple keywords for each publication.
    - PublicacionPalabraClave:
        - publicacion: ForeignKey, references a specific publication.
        - palabra_clave: ForeignKey, references a specific keyword.

Methods:
    - __str__: Returns a string representation of the instance for readability.
"""
from django.db import models
from misApps.usuarios.models import Usuario
from misApps.gruposDeInvestigacion.models import GrupoInvestigacion

class TipoPublicacion(models.Model):
    """
    Model representing a type of publication.
    
    Fields:
        - nombre_tipo: The name of the publication type.
        - descripcion: A description providing details about the type.
    """
    nombre_tipo = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre_tipo



class PalabraClave(models.Model):
    """
    Model representing a keyword associated with publications.
    
    Fields:
        - palabra: The keyword text used for categorizing publications.
    """
    palabra = models.CharField(max_length=100)

    def __str__(self):
        return self.palabra

class Publicacion(models.Model):
    """
    Model representing a research publication.
    
    Fields:
        - titulo: The title of the publication.
        - resumen: A brief summary of the publication.
        - fecha_publicacion: The date when the publication was released.
        - archivo_pdf: (Optional) PDF file of the publication.
        - grupo_investigacion: ForeignKey linking the publication to a specific research group.
        - usuario: ForeignKey linking the publication to a specific user.
        - tipos_publicacion: ForeignKey defining the type of publication.
        - palabras_clave: ManyToManyField linking to keywords through PublicacionPalabraClave.
    """
    titulo = models.CharField(max_length=255)
    resumen = models.TextField()
    fecha_publicacion = models.DateField()
    archivo_pdf = models.FileField(upload_to='publicaciones/pdf/', null=True, blank=True)  # Nuevo campo
    grupo_investigacion = models.ForeignKey(GrupoInvestigacion, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipos_publicacion = models.ForeignKey(TipoPublicacion, null=True,  on_delete=models.CASCADE)
    palabras_clave = models.ManyToManyField(PalabraClave, through='PublicacionPalabraClave')

    def __str__(self):
        return self.titulo


class PublicacionPalabraClave(models.Model):
    """
    Intermediary model to link publications and keywords.
    
    Fields:
        - publicacion: The related publication.
        - palabra_clave: The related keyword.
    """
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    palabra_clave = models.ForeignKey(PalabraClave, on_delete=models.CASCADE)
