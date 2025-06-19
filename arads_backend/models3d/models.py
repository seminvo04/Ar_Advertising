# models3d/models.py
from django.db import models
import uuid
from io import BytesIO
from django.core.files import File
import qrcode

class Model3D(models.Model):
    TYPE_CHOICES = [
        ('static', 'Statique'),
        ('animated', 'Animé'),
        ('video', 'Vidéo')
    ]

    name = models.CharField(max_length=100)
    qr_code = models.CharField(max_length=200, unique=True, blank=True)
    qr_code_image = models.ImageField(upload_to='qr_codes/', blank=True)
    model_file = models.FileField(upload_to='models3d/')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='static')
    created_at = models.DateTimeField(auto_now_add=True)
    scan_count = models.PositiveIntegerField(default=0, editable=False)

    def save(self, *args, **kwargs):
        if not self.qr_code:
            self.qr_code = str(uuid.uuid4())

        if not self.qr_code_image:
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(f'http://192.168.100.29:8000/api/qr/{self.qr_code}')
            qr.make(fit=True)

            img = qr.make_image(fill_color="black", back_color="white")
            buffer = BytesIO()
            img.save(buffer, format='PNG')
            filename = f'qr_{self.qr_code}.png'
            self.qr_code_image.save(filename, File(buffer), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Scan(models.Model):
    model = models.ForeignKey(Model3D, on_delete=models.CASCADE)
    scanned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Scan for {self.model.name} at {self.scanned_at}'