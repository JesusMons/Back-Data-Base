"""
Models for managing users and their types in the users app.

This module contains the following models:

1. TipoUsuario: Represents the type of user (e.g., Student, Teacher, Researcher).
2. Usuario: Represents a user with associated personal details and a link to their program.
3. UsuarioTipoUsuario: A many-to-many relationship model between Usuario and TipoUsuario.

Models:
- TipoUsuario:
    - name: A character field that specifies the type of user.

- Usuario:
    - name: A character field for the user's first name.
    - lastName: A character field for the user's last name.
    - email: An email field that must be unique for each user.
    - program: A foreign key linking to the Programa model, allowing null and blank values.
    - tipos_usuario: A many-to-many relationship with TipoUsuario through the UsuarioTipoUsuario model.

- UsuarioTipoUsuario:
    - usuario: A foreign key linking to the Usuario model.
    - tipo_usuario: A foreign key linking to the TipoUsuario model.
"""
from django.db import models
from misApps.facultades.models import Programa

class TipoUsuario(models.Model):
    """
    Represents a type of user in the system.

    Attributes:
        name (str): The name of the user type (e.g., Student, Teacher, Researcher).
    """
    name = models.CharField(max_length=50)  # E.g., Student, Teacher, Researcher

    def __str__(self):
        return self.name

class Usuario(models.Model):
    """
    Represents a user with personal details and associated program.

    Attributes:
        name (str): The user's first name.
        lastName (str): The user's last name.
        email (str): The user's email address (must be unique).
        program (Programa): A foreign key linking to the associated program.
        tipos_usuario (ManyToManyField): A many-to-many relationship with TipoUsuario.
    """
    name = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    program = models.ForeignKey(Programa, on_delete=models.CASCADE, null=True, blank=True)
    tipos_usuario = models.ManyToManyField(TipoUsuario, through='UsuarioTipoUsuario')

    def __str__(self):
        return f'{self.name} {self.lastName}'

class UsuarioTipoUsuario(models.Model):
    """
    Represents a many-to-many relationship between Usuario and TipoUsuario.

    Attributes:
        usuario (Usuario): A foreign key linking to the Usuario model.
        tipo_usuario (TipoUsuario): A foreign key linking to the TipoUsuario model.
    """
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipo_usuario = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.usuario} - {self.tipo_usuario}'

