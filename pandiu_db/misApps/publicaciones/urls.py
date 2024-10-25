"""
URL configuration for the publications app.

This module defines the URL patterns for accessing the publication-related views, 
including listings and detail views for publications, publication types, and keywords.

URL Patterns:
    - PublicacionList: List all publications or create a new one.
    - PublicacionDetail: Retrieve, update, or delete a specific publication.
    - TipoPublicacionList: List all publication types or create a new one.
    - TipoPublicacionDetail: Retrieve, update, or delete a specific publication type.
    - PalabraClaveList: List all keywords or create a new one.
    - PalabraClaveDetail: Retrieve, update, or delete a specific keyword.

Static and Media URL Configuration:
    - If in DEBUG mode, serves media files uploaded by users, accessible through MEDIA_URL.
"""

from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from misApps.publicaciones.views import (
    PublicacionList, PublicacionDetail, 
    TipoPublicacionList, TipoPublicacionDetail,  
    PalabraClaveList, PalabraClaveDetail
)

app_name = "publicaciones"

urlpatterns = [
    # Publicacion List and Detail
    path('', PublicacionList.as_view(), name="publicacion-list"),
    path('<int:pk>/', PublicacionDetail.as_view(), name="publicacion-detail"),

    # TipoPublicacion List and Detail
    path('tipos-publicacion/', TipoPublicacionList.as_view(), name="tipopublicacion-list"),
    path('tipos-publicacion/<int:pk>/', TipoPublicacionDetail.as_view(), name="tipopublicacion-detail"),

    # PalabraClave List and Detail
    path('palabras-clave/', PalabraClaveList.as_view(), name="palabraclave-list"),
    path('palabras-clave/<int:pk>/', PalabraClaveDetail.as_view(), name="palabraclave-detail"),
]
# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
