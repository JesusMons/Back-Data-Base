"""
API Views for managing research groups (GrupoInvestigacion).

These views handle HTTP requests for listing, creating, retrieving, updating, and deleting research groups.
The views are based on Django REST Framework's `APIView` class, providing detailed control over request handling.

Classes:
    - GrupoInvestigacionList: Handles listing all research groups or creating a new one.
    - GrupoInvestigacionDetail: Handles retrieving, updating, or deleting a specific research group by its primary key (pk).

Methods:
    - get_object: Utility method to retrieve a GrupoInvestigacion instance by primary key, raises Http404 if not found.

Details:
    - GET requests on GrupoInvestigacionList retrieve all research groups.
    - POST requests on GrupoInvestigacionList allow creating a new research group.
    - GET requests on GrupoInvestigacionDetail retrieve a specific research group.
    - PUT and PATCH requests on GrupoInvestigacionDetail update an existing research group.
    - DELETE requests on GrupoInvestigacionDetail remove a research group.

Status codes:
    - 200 OK: Successful retrieval or update of resources.
    - 201 CREATED: Successfully created a new resource.
    - 204 NO CONTENT: Successfully deleted a resource.
    - 400 BAD REQUEST: Invalid data provided.
    - 404 NOT FOUND: Requested resource not found.

"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from misApps.gruposDeInvestigacion.models import GrupoInvestigacion
from misApps.gruposDeInvestigacion.serializers import GrupoInvestigacionSerializer

# Vista para listar todos los grupos de investigación
class GrupoInvestigacionList(APIView):
    """
    Lists all research groups (GET) or creates a new one (POST).
    
    Methods:
        - get: Retrieve all research groups from the database and serialize them to JSON.
        - post: Create a new research group from the incoming JSON data, validate it, and save it to the database.
    """
    def get(self, request, format=None):
        grupos = GrupoInvestigacion.objects.all()
        serializer = GrupoInvestigacionSerializer(grupos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GrupoInvestigacionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GrupoInvestigacionDetail(APIView):
    """
    Retrieves, updates, or deletes a specific research group (GET, PUT, PATCH, DELETE).
    
    Methods:
        - get_object: Retrieve a research group by its primary key (pk). Raises Http404 if not found.
        - get: Retrieve the details of a specific research group.
        - put: Update an existing research group by replacing its data with the provided JSON data.
        - patch: Partially update an existing research group.
        - delete: Delete the specified research group from the database.
    """
    def get_object(self, pk):
        try:
            return GrupoInvestigacion.objects.get(pk=pk)
        except GrupoInvestigacion.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        grupo = self.get_object(pk)
        serializer = GrupoInvestigacionSerializer(grupo)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        grupo = self.get_object(pk)
        serializer = GrupoInvestigacionSerializer(grupo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        grupo = self.get_object(pk)
        serializer = GrupoInvestigacionSerializer(grupo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        grupo = self.get_object(pk)
        grupo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

