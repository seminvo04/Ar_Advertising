from django.contrib import admin
from .models import Model3D

@admin.register(Model3D)
class Model3DAdmin(admin.ModelAdmin):
    list_display = ('name', 'qr_code','scan_count', 'created_at')
    readonly_fields = ['scan_count']
    search_fields = ('name', 'qr_code')
    list_filter = ('created_at',)

# Register your models here.
