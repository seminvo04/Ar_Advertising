from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

from .models import Model3D, Scan
from .serializers import Model3DSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_model_by_qr(request, qr_code):
    model = get_object_or_404(Model3D, qr_code=qr_code)
    return Response({
        "model_file": model.model_file.url,
        "type": model.type
    })

@api_view(['POST'])
def log_scan(request, qr_code):
    model = get_object_or_404(Model3D, qr_code=qr_code)
    Scan.objects.create(model=model)
    model.scan_count += 1
    model.save()
    return Response({"message": "Scan enregistré"})

class Model3DViewSet(viewsets.ModelViewSet):
    queryset = Model3D.objects.all()
    serializer_class = Model3DSerializer
