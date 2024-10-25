"""
Views for managing publications, publication types, and keywords in the publications app.

This module contains the views for:
- Listing, creating, retrieving, updating, and deleting publications.
- Listing, creating, retrieving, updating, and deleting publication types.
- Listing, creating, retrieving, updating, and deleting keywords.

Each view is implemented as an APIView from Django Rest Framework, allowing for the handling of HTTP requests.

Publicacion Views:
    - PublicacionList: List all publications or create a new one.
    - PublicacionDetail: Retrieve, update, or delete a publication by its primary key (pk).

TipoPublicacion Views:
    - TipoPublicacionList: List all publication types or create a new one.
    - TipoPublicacionDetail: Retrieve, update, or delete a publication type by its primary key (pk).

PalabraClave Views:
    - PalabraClaveList: List all keywords or create a new one.
    - PalabraClaveDetail: Retrieve, update, or delete a keyword by its primary key (pk).
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

from misApps.publicaciones.models import Publicacion, TipoPublicacion, PalabraClave
from misApps.publicaciones.serializers import (
    PublicacionSerializer, TipoPublicacionSerializer,  
    PalabraClaveSerializer
)

# Publicacion Views
class PublicacionList(APIView):
    """
    List all publications or create a new one.
    """
    def get(self, request, format=None):
        publicaciones = Publicacion.objects.all()
        serializer = PublicacionSerializer(publicaciones, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PublicacionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicacionDetail(APIView):
    """
    Retrieve, update or delete a publication by its primary key (pk).
    """
    def get_object(self, pk):
        try:
            return Publicacion.objects.get(pk=pk)
        except Publicacion.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        publicacion = self.get_object(pk)
        serializer = PublicacionSerializer(publicacion)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        publicacion = self.get_object(pk)
        serializer = PublicacionSerializer(publicacion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        publicacion = self.get_object(pk)
        publicacion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# TipoPublicacion Views
class TipoPublicacionList(APIView):
    """
    List all publication types or create a new one.
    """
    def get(self, request, format=None):
        tipos = TipoPublicacion.objects.all()
        serializer = TipoPublicacionSerializer(tipos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TipoPublicacionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TipoPublicacionDetail(APIView):
    """
    Retrieve, update or delete a publication type by its primary key (pk).
    """
    def get_object(self, pk):
        try:
            return TipoPublicacion.objects.get(pk=pk)
        except TipoPublicacion.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tipo = self.get_object(pk)
        serializer = TipoPublicacionSerializer(tipo)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        tipo = self.get_object(pk)
        serializer = TipoPublicacionSerializer(tipo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        tipo = self.get_object(pk)
        tipo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# PalabraClave Views
class PalabraClaveList(APIView):
    """
    List all keywords or create a new one.
    """
    def get(self, request, format=None):
        palabras_clave = PalabraClave.objects.all()
        serializer = PalabraClaveSerializer(palabras_clave, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PalabraClaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PalabraClaveDetail(APIView):
    """
    Retrieve, update or delete a keyword by its primary key (pk).
    """
    def get_object(self, pk):
        try:
            return PalabraClave.objects.get(pk=pk)
        except PalabraClave.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        palabra_clave = self.get_object(pk)
        serializer = PalabraClaveSerializer(palabra_clave)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        palabra_clave = self.get_object(pk)
        serializer = PalabraClaveSerializer(palabra_clave, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        palabra_clave = self.get_object(pk)
        palabra_clave.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
