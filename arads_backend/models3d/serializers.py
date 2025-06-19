from rest_framework import serializers
from .models import Model3D

class Model3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model3D
        fields = ['id', 'name', 'qr_code', 'qr_code_image', 'model_file', 'type', 'created_at', 'scan_count']
        read_only_fields = ('scan_count',)