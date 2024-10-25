"""
Views for managing Facultad and Programa models via API requests.

This module provides API views for listing, retrieving, creating, updating,
and deleting instances of the Facultad and Programa models. These views use
Django Rest Framework's APIView and support both full and partial updates
as well as error handling for non-existent objects.

Classes:
    - FacultadList: Handles listing all Facultad instances or creating a new Facultad.
    - FacultadDetail: Handles retrieving, updating, or deleting a specific Facultad.
    - ProgramaList: Handles listing all Programa instances or creating a new Programa.
    - ProgramaDetail: Handles retrieving, updating, or deleting a specific Programa.

"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from misApps.facultades.models import Facultad, Programa
from misApps.facultades.serializers import FacultadSerializer, ProgramaSerializer

# Vista para listar todas las facultades o crear una nueva
class FacultadList(APIView):
    """
    Lista todas las facultades o crea una nueva.
    """
    def get(self, request, format=None):
        facultades = Facultad.objects.all()
        serializer = FacultadSerializer(facultades, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FacultadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vista para obtener, actualizar o eliminar una facultad específica
class FacultadDetail(APIView):
    """
    Retrieve, update o delete de una facultad específica.
    """
    def get_object(self, pk):
        try:
            return Facultad.objects.get(pk=pk)
        except Facultad.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        facultad = self.get_object(pk)
        serializer = FacultadSerializer(facultad)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        facultad = self.get_object(pk)
        serializer = FacultadSerializer(facultad, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        facultad = self.get_object(pk)
        serializer = FacultadSerializer(facultad, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        facultad = self.get_object(pk)
        facultad.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Vista para listar todos los programas o crear uno nuevo
class ProgramaList(APIView):
    """
    Lista todos los programas o crea uno nuevo.
    """
    def get(self, request, format=None):
        programas = Programa.objects.all()
        serializer = ProgramaSerializer(programas, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProgramaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vista para obtener, actualizar o eliminar un programa específico
class ProgramaDetail(APIView):
    """
    Retrieve, update o delete de un programa específico.
    """
    def get_object(self, pk):
        try:
            return Programa.objects.get(pk=pk)
        except Programa.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        programa = self.get_object(pk)
        serializer = ProgramaSerializer(programa)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        programa = self.get_object(pk)
        serializer = ProgramaSerializer(programa, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        programa = self.get_object(pk)
        serializer = ProgramaSerializer(programa, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        programa = self.get_object(pk)
        programa.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
