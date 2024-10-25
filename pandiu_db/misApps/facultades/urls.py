"""
URL routing for Facultad and Programa views.

This module defines the URL patterns for the Facultad and Programa models. It
maps HTTP requests to their respective class-based views (CBVs) to handle
listing, retrieving, creating, updating, and deleting instances of these models.

URL patterns:
    - List and detail routes for Facultad.
    - List and detail routes for Programa.

The routes are organized under the 'facultades' app namespace.

"""
from django.urls import path
from misApps.facultades.views import FacultadList, FacultadDetail, ProgramaList, ProgramaDetail

app_name = "facultades"

urlpatterns = [
    # Route for listing all Facultad instances and creating a new Facultad.
    # Maps to FacultadList view.
    path('', FacultadList.as_view(), name="facultad-list"),
    # Route for retrieving, updating, or deleting a specific Facultad by its ID.
    # Maps to FacultadDetail view
    path('<int:pk>/', FacultadDetail.as_view(), name="facultad-detail"),
    # Route for listing all Programa instances and creating a new Programa.
    # Maps to ProgramaList view.
    path('programas/', ProgramaList.as_view(), name="programa-list"),
    # Route for retrieving, updating, or deleting a specific Programa by its ID.
    # Maps to ProgramaDetail view.
    path('programas/<int:pk>/', ProgramaDetail.as_view(), name="programa-detail"),
]
