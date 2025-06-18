from django.contrib import admin
from django.urls import path
from models3d.views import get_model_by_qr, log_scan
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response

urlpatterns = [
    path('admin/', admin.site.urls),

    # API QR Scan + Logging
    path('api/qr/<str:qr_code>/', get_model_by_qr, name='get-model-by-qr'),
    path('api/log_scan/<str:qr_code>/', log_scan),

    # Auth JWT
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', lambda request: Response({"message": "Logged out"}), name='logout'),
]

# Pour les fichiers médias (ex: modèles 3D, vidéos)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
