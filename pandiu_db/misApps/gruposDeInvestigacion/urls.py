"""
URL Configuration for GrupoInvestigacion views.

This module defines the URL patterns for the research groups (GrupoInvestigacion) section of the API. 
It maps incoming requests to the appropriate view classes for listing all research groups or retrieving 
detailed information about a specific group.

URL patterns:
    - '': Maps to GrupoInvestigacionList, a view that lists all research groups or creates a new one.
    - '<int:pk>/': Maps to GrupoInvestigacionDetail, a view that handles retrieving, updating, or deleting 
      a specific research group by its primary key (pk).

Namespaces:
    - app_name: "gruposDeInvestigacion" - Defines the namespace for the URLs of this app, used for reverse URL lookups.

"""
from django.urls import path
from misApps.gruposDeInvestigacion.views import GrupoInvestigacionList, GrupoInvestigacionDetail

app_name = "gruposDeInvestigacion"

urlpatterns = [
    # Default route for listing all research groups or creating a new one
    path('', GrupoInvestigacionList.as_view(), name="grupo-investigacion-list"),
    # Route for retrieving, updating, or deleting a specific research group by ID (primary key)
    path('<int:pk>/', GrupoInvestigacionDetail.as_view(), name="grupo-investigacion-detail"),
]
