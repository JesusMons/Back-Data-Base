"""
Models for the educational structure, specifically faculties and programs.

This module defines two models: Facultad and Programa. The Facultad model
represents the different faculties in an institution, while the Programa model
is associated with a Facultad and represents the various academic programs.

Classes:
    - Facultad: Represents a faculty or academic division in an institution.
    - Programa: Represents an academic program linked to a specific Facultad.

"""

from django.db import models

class Facultad(models.Model):
    """
    Represents a faculty within the educational institution.
    
    Attributes:
        nombre_facultad (CharField): The name of the faculty. It has a maximum length of 255 characters.
    
    Methods:
        __str__: Returns a string representation of the faculty, which is the faculty's name.
    """
    nombre_facultad = models.CharField(max_length=255)

    def __str__(self):
        """
        Returns:
            str: The name of the faculty.
        """
        return self.nombre_facultad

class Programa(models.Model):
    
    """
    Represents an academic program offered by a faculty.
    
    Attributes:
        program_name (CharField): The name of the academic program. It has a maximum length of 255 characters.
        facultad (ForeignKey): A ForeignKey relationship linking the program to a Facultad.
                              When the related Facultad is deleted, all associated programs are also deleted (CASCADE).
    
    Methods:
        __str__: Returns a string representation of the program, which is the program's name.
    """
    program_name = models.CharField(max_length=255)
    facultad = models.ForeignKey(Facultad, on_delete=models.CASCADE)

    def __str__(self):
        """
        Returns:
            str: The name of the academic program.
        """
        return self.program_name


