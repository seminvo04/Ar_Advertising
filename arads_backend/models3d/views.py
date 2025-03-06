from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Model3D, Scan
from .serializers import Model3DSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import logging

logger = logging.getLogger(__name__)

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

@api_view(['POST'])
def log_scan(request, qr_code):
    try:
        model = Model3D.objects.get(qr_code=qr_code)
        # Enregistrer un scan
        Scan.objects.create(model=model)
        # Incrémenter le nombre de scans pour le modèle
        model.scan_count += 1
        model.save()
        return Response({'message': 'Scan logged successfully'}, status=200)
    except Model3D.DoesNotExist:
        return Response({'error': 'QR code not found'}, status=404)

@api_view(['POST'])

def login_view(request):
    logger = logging.getLogger(__name__)

    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
            logger.warning("Email or password missing.")
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        logger.info(f"User found: {user.username}")

        if user.check_password(password):  # Vérifie si le mot de passe est correct
            logger.info("Password correct.")
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            print(f"Generated Access Token: {access_token}")

            return Response({
                'access': access_token,  # Renommé en 'access'
                'refresh': str(refresh),  # Ajout du jeton de rafraîchissement
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            logger.warning("Invalid credentials.")
    except User.DoesNotExist:
        logger.error("User not found.")
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

def logout_view(request):
    """
    Cette vue permet de révoquer un jeton de rafraîchissement lors de la déconnexion.
    """
    try:
        # Récupérer le jeton de rafraîchissement depuis les données de la requête
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'error': 'Refresh token is required'}, status=400)

        # Créer un objet RefreshToken à partir du jeton de rafraîchissement
        token = RefreshToken(refresh_token)

        # Ajouter le jeton à la blacklist
        token.blacklist()

        return Response({'message': 'Logged out successfully'}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)
