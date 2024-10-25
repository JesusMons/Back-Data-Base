"""
URL configuration for the usuarios app.

This module defines the URL patterns for managing user-related views, including
users (Usuario), user types (TipoUsuario), and the relationship between users 
and user types (UsuarioTipoUsuario).

URL Patterns:
- Usuario List and Detail:
    - GET, POST /usuarios/ : List all users or create a new user.
    - GET, PUT, DELETE /usuarios/<int:pk>/ : Retrieve, update, or delete a user by primary key.

- TipoUsuario List and Detail:
    - GET, POST /usuarios/tipos-usuario/ : List all user types or create a new user type.
    - GET, PUT, DELETE /usuarios/tipos-usuario/<int:pk>/ : Retrieve, update, or delete a user type by primary key.

- UsuarioTipoUsuario List and Detail:
    - GET, POST /usuarios/usuario-tipos/ : List all user-type relationships or create a new relationship.
    - GET, PUT, DELETE /usuarios/usuario-tipos/<int:pk>/ : Retrieve, update, or delete a user-type relationship by primary key.
"""
from django.urls import path
from misApps.usuarios.views import (
    UsuarioList, UsuarioDetail, 
    TipoUsuarioList, TipoUsuarioDetail, 
    UsuarioTipoUsuarioList, UsuarioTipoUsuarioDetail
)

app_name = "usuarios"

urlpatterns = [
    # Usuario List y Detail
    path('', UsuarioList.as_view(), name="usuario-list"),
    path('<int:pk>/', UsuarioDetail.as_view(), name="usuario-detail"),

    # TipoUsuario List y Detail
    path('tipos-usuario/', TipoUsuarioList.as_view(), name="tipousuario-list"),
    path('tipos-usuario/<int:pk>/', TipoUsuarioDetail.as_view(), name="tipousuario-detail"),

    # UsuarioTipoUsuario List y Detail
    path('usuario-tipos/', UsuarioTipoUsuarioList.as_view(), name="usuariotipousuario-list"),
    path('usuario-tipos/<int:pk>/', UsuarioTipoUsuarioDetail.as_view(), name="usuariotipousuario-detail"),
]
