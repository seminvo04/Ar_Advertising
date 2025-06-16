import qrcode
from io import BytesIO
from django.core.files import File
from django.db import models
import uuid
from django.contrib.auth.models import User

class Model3D(models.Model):
    name = models.CharField(max_length=100)
    qr_code = models.CharField(max_length=200, unique=True, blank=True)  # On le rend blank=True car on va le générer
    qr_code_image = models.ImageField(upload_to='qr_codes/', blank=True)
    model_file = models.FileField(upload_to='models3d/')
    created_at = models.DateTimeField(auto_now_add=True)
    scan_count = models.PositiveIntegerField(default=0, editable=False)

    def save(self, *args, **kwargs):
        if not self.qr_code:
            # Générer un code unique
            self.qr_code = str(uuid.uuid4())

        # Générer l'image QR
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(f'http://192.168.8.105:8000/api/qr/{self.qr_code}')  # Vous changerez cette URL
        qr.make(fit=True)
        qr_image = qr.make_image(fill_color="black", back_color="white")

        # Sauvegarder l'image
        buffer = BytesIO()
        qr_image.save(buffer, format='PNG')
        file_name = f'qr_{self.qr_code}.png'
        self.qr_code_image.save(file_name, File(buffer), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Scan(models.Model):
    model = models.ForeignKey(Model3D, on_delete=models.CASCADE)
    scanned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Scan for {self.model.name} at {self.scanned_at}'


# Nouveau modèle MediaModel pour vidéos et modèles 3D

class MediaModel(models.Model):
    TYPE_CHOICES = [
        ('3D', 'Modèle 3D'),
        ('Video', 'Vidéo'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Associe le modèle à un utilisateur
    title = models.CharField(max_length=255)
    media_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    file = models.FileField(upload_to='uploads/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
