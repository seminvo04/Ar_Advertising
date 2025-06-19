# urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from models3d.views import Model3DViewSet, get_model_by_qr, log_scan
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from models3d import views

# Router pour les ViewSets
router = DefaultRouter()
router.register(r'api/models3d', Model3DViewSet, basename='models3d')

urlpatterns = [
    path('admin/', admin.site.urls),

    # API via ViewSet
    path('', include(router.urls)),  # <-- enregistrement du router ici

    # API QR Scan + Logging
    path('api/qr/<str:qr_code>/', get_model_by_qr, name='get-model-by-qr'),
    path('api/log_scan/<str:qr_code>/', log_scan),

    # Auth JWT
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', lambda request: Response({"message": "Logged out"}), name='logout'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
