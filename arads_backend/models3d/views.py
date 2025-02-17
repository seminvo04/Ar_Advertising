from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Model3D
from .serializers import Model3DSerializer

class Model3DViewSet(viewsets.ModelViewSet):
    queryset = Model3D.objects.all()
    serializer_class = Model3DSerializer

@api_view(['GET'])
def get_model_by_qr(request, qr_code):
    try:
        model = Model3D.objects.get(qr_code=qr_code)
        serializer = Model3DSerializer(model)
        return Response(serializer.data)
    except Model3D.DoesNotExist:
        return Response({'error': 'QR code not found'}, status=404)