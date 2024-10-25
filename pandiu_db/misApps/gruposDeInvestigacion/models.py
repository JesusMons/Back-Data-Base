"""
Model representing research groups (GrupoInvestigacion) within an institution.

This model stores the basic information for research groups, including their name and description.
Each research group is identified by its name and has an associated description field to provide more details.

Fields:
    - nombre_grupo (CharField): The name of the research group. Limited to 255 characters.
    - descripcion (TextField): A detailed description of the research group's activities or mission.

Methods:
    - __str__: Returns the name of the research group as its string representation.

"""

from django.db import models

class GrupoInvestigacion(models.Model):
    """
    Represents a research group (GrupoInvestigacion) in the system.
    
    Attributes:
        - nombre_grupo (str): The name of the research group.
        - descripcion (str): A description of the research group's focus and activities.
    """
    nombre_grupo = models.CharField(max_length=255)
    descripcion = models.TextField()

    def __str__(self):
        """
        Returns the string representation of the research group.
        This is used in the Django admin and other places where the object is displayed as a string.
        
        Returns:
            str: The name of the research group.
        """
        return self.nombre_grupo
