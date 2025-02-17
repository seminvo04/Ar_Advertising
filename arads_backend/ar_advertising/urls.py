from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from models3d.views import Model3DViewSet, get_model_by_qr
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'models3d', Model3DViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/qr/<str:qr_code>/', get_model_by_qr, name='get-model-by-qr'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)