import 'package:cloud_firestore/cloud_firestore.dart';

class ARModel {
  final String id;
  final String name;
  final String description;
  final String modelUrl;
  final String qrCode;
  final String? thumbnailUrl;
  final DateTime createdAt;

  ARModel({
    required this.id,
    required this.name,
    required this.description,
    required this.modelUrl,
    required this.qrCode,
    this.thumbnailUrl,
    required this.createdAt,
  });

  factory ARModel.fromFirestore(DocumentSnapshot doc) {
    Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
    return ARModel(
      id: doc.id,
      name: data['name'] ?? '',
      description: data['description'] ?? '',
      modelUrl: data['modelUrl'] ?? '',
      qrCode: data['qrCode'] ?? '',
      thumbnailUrl: data['thumbnailUrl'],
      createdAt: (data['createdAt'] as Timestamp).toDate(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'description': description,
      'modelUrl': modelUrl,
      'qrCode': qrCode,
      'thumbnailUrl': thumbnailUrl,
      'createdAt': FieldValue.serverTimestamp(),
    };
  }
}