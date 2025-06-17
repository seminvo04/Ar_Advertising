// preview_screen.dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'package:model_viewer_plus/model_viewer_plus.dart';
import 'package:video_player/video_player.dart';

class PreviewScreen extends StatefulWidget {
  final String qrCode;

  const PreviewScreen({super.key, required this.qrCode});

  @override
  State<PreviewScreen> createState() => _PreviewScreenState();
}

class _PreviewScreenState extends State<PreviewScreen> {
  bool isLoading = true;
  bool isError = false;
  String? modelUrl;
  String? type;
  VideoPlayerController? _videoController;

  @override
  void initState() {
    super.initState();
    fetchModelData();
  }

  Future<void> fetchModelData() async {
    setState(() {
      isLoading = true;
      isError = false;
    });

    try {
      final Uri url = Uri.parse(widget.qrCode);
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final String file = data['model_file'];
        final String contentType = data['type']; // 'static', 'animated', 'video'

        if (file.isEmpty || contentType.isEmpty) {
          throw Exception('Contenu incomplet depuis l’API');
        }

        setState(() {
          modelUrl = "http://192.168.0.107:8000$file";
          type = contentType;
          isLoading = false;
        });

        if (type == 'video') {
          _videoController = VideoPlayerController.networkUrl(Uri.parse(modelUrl!));
          await _videoController!.initialize();
          _videoController!.play();
          _videoController!.setLooping(true);
          setState(() {});
        }
      } else {
        throw Exception('Échec du chargement : ${response.statusCode}');
      }
    } catch (e) {
      print('Erreur: $e');
      setState(() {
        isError = true;
        isLoading = false;
      });
    }
  }

  @override
  void dispose() {
    _videoController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("Aperçu AR"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/scan'),
        ),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : isError
          ? Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text("Erreur de chargement", style: TextStyle(color: Colors.red)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: fetchModelData,
              child: const Text("Réessayer"),
            )
          ],
        ),
      )
          : type == 'video'
          ? Center(
        child: _videoController != null && _videoController!.value.isInitialized
            ? AspectRatio(
          aspectRatio: _videoController!.value.aspectRatio,
          child: VideoPlayer(_videoController!),
        )
            : const CircularProgressIndicator(),
      )
          : ModelViewer(
        src: modelUrl!,
        alt: "Modèle 3D",
        ar: true,
        autoRotate: true,
        cameraControls: true,
        autoPlay: type == 'animated',
        backgroundColor: Colors.transparent,
      ),
    );
  }
}
