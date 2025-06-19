from rest_framework import serializers
from .models import Model3D

class Model3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model3D
        fields = ['id', 'name', 'model_file', 'qr_code', 'qr_code_image', 'created_at', 'scan_count']
        read_only_fields = ('scan_count',)