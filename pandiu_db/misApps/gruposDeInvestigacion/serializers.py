"""
Serializer for GrupoInvestigacion model.

This serializer converts the GrupoInvestigacion model instances into JSON format 
for API responses, and it also validates and deserializes input data to create or update 
GrupoInvestigacion instances.

Attributes:
    - model (GrupoInvestigacion): The model being serialized.
    - fields (tuple): Specifies that all fields of the model should be included in the 
      serialization process.

Usage:
    - This serializer is used to convert GrupoInvestigacion model objects into a JSON-compatible
      format for API views, and to handle the creation and updating of these objects from API input.

"""
from rest_framework import serializers
from misApps.gruposDeInvestigacion.models import GrupoInvestigacion

class GrupoInvestigacionSerializer(serializers.ModelSerializer):
    """
    Serializer class for the GrupoInvestigacion model.
    
    Meta options:
        - model: Specifies the model to serialize (GrupoInvestigacion).
        - fields: Includes all fields ("__all__") in the model in the serialization.
    """
    class Meta:
        model = GrupoInvestigacion
        fields = ( "__all__")
