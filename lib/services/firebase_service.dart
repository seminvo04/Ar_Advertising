import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/ar_model.dart';

class FirebaseService {
  final FirebaseStorage _storage = FirebaseStorage.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<ARModel?> getModelByQRCode(String qrCode) async {
    try {
      final QuerySnapshot result = await _firestore
          .collection('ar_models')
          .where('qrCode', isEqualTo: qrCode)
          .limit(1)
          .get();

      if (result.docs.isEmpty) return null;

      return ARModel.fromFirestore(result.docs.first);
    } catch (e) {
      print('Error getting model: $e');
      return null;
    }
  }

  Future<String?> getModelDownloadUrl(String modelPath) async {
    try {
      return await _storage.ref(modelPath).getDownloadURL();
    } catch (e) {
      print('Error getting download URL: $e');
      return null;
    }
  }
}