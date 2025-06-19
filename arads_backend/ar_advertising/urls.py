# urls.py
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from models3d import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/qr/<str:qr_code>/', views.get_model_by_qr, name='get-model-by-qr'),
    path('api/log_scan/<str:qr_code>/', views.log_scan),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', lambda request: Response({"message": "Logged out"}), name='logout'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
