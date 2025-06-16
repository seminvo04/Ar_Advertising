from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from models3d.views import Model3DViewSet, get_model_by_qr, log_scan
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from models3d.views import login_view

router = DefaultRouter()
router.register(r'models3d', Model3DViewSet)

urlpatterns = [
    path('', include('admin_material.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/qr/<str:qr_code>/', get_model_by_qr, name='get-model-by-qr'),
    path('api/log_scan/<str:qr_code>/', log_scan),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Connexion avec JWT
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', lambda request: Response({"message": "Logged out"}), name='logout'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)