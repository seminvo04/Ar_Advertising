import firebase_admin
from firebase_admin import credentials, storage
from django.conf import settings

try:
    # Initialiser Firebase s'il n'est pas déjà initialisé
    if not firebase_admin._apps:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
        firebase_admin.initialize_app(cred, {
            'storageBucket': settings.FIREBASE_BUCKET
        })
except Exception as e:
    print(f"Erreur d'initialisation Firebase: {e}")

def get_firebase_bucket():
    """
    Obtenir le bucket Firebase de manière sécurisée
    """
    try:
        return storage.bucket()
    except Exception as e:
        print(f"Erreur d'accès au bucket Firebase: {e}")
        return None