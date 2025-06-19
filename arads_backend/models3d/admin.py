from django.contrib import admin
from django.utils.html import format_html
from .models import Model3D

@admin.register(Model3D)
class Model3DAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'qr_code_image_tag', 'scan_count', 'created_at')  # 👈 colonne image QR
    readonly_fields = ('qr_code_image', 'qr_code', 'created_at')  # 👈 non modifiables
    fields = ('name', 'model_file', 'type', 'qr_code_image')  # 👈 champs visibles dans le formulaire

    def qr_code_image_tag(self, obj):
        if obj.qr_code_image:
            return format_html(
                '<a href="{}" download><img src="{}" width="30" height="30" style="border:1px solid #ccc;"/></a>',
                obj.qr_code_image.url,
                obj.qr_code_image.url
            )
        return "Pas d'image"

    qr_code_image_tag.short_description = "QR Code"

    def has_add_permission(self, request):
        return True
