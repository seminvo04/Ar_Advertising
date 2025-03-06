/*
import 'package:ar_flutter_plugin_flutterflow/widgets/ar_view.dart';
import 'package:flutter/material.dart';
import 'package:ar_flutter_plugin_flutterflow/ar_flutter_plugin.dart'; // Nouveau plugin
import 'package:ar_flutter_plugin_flutterflow/datatypes/node_types.dart'; // Import pour NodeType
import 'package:ar_flutter_plugin_flutterflow/managers/ar_location_manager.dart';
import 'package:ar_flutter_plugin_flutterflow/managers/ar_session_manager.dart';
import 'package:ar_flutter_plugin_flutterflow/managers/ar_object_manager.dart';
import 'package:ar_flutter_plugin_flutterflow/managers/ar_anchor_manager.dart';
import 'package:ar_flutter_plugin_flutterflow/models/ar_node.dart';
import 'package:vector_math/vector_math_64.dart' as vm;
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class PreviewScreen extends StatefulWidget {
  final String qrCode;

  const PreviewScreen({super.key, required this.qrCode});

  @override
  _PreviewScreenState createState() => _PreviewScreenState();
}

class _PreviewScreenState extends State<PreviewScreen> {
  ARSessionManager? arSessionManager;
  ARObjectManager? arObjectManager;
  ARNode? modelNode;
  bool isLoading = true;
  bool isError = false;
  String? modelUrl;

  @override
  void initState() {
    super.initState();
    fetchModel3D();
  }

  /// 🔍 Récupère l'URL du modèle 3D depuis le backend
  Future<void> fetchModel3D() async {
    setState(() {
      isLoading = true;
      isError = false;
    });

    try {
      final Uri url = Uri.parse(widget.qrCode);
      print('📡 Récupération du modèle depuis : $url'); // Debug log

      final response = await http.get(url);
      print('✅ Statut de la réponse : ${response.statusCode}'); // Debug log
      print('📜 Contenu de la réponse : ${response.body}'); // Debug log

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        // Vérifier si model_file existe dans la réponse
        if (data['model_file'] == null) {
          throw Exception('❌ Erreur : "model_file" est absent de la réponse.');
        }

        // Construire l'URL complète avec la même adresse IP
        final String modelUrl = "http://192.168.8.105:8000${data['model_file']}";
        print('🔗 URL du modèle : $modelUrl'); // Debug log

        setState(() {
          this.modelUrl = modelUrl;
          isLoading = false;
        });
      } else {
        print('⚠️ Erreur : Code HTTP ${response.statusCode}');
        setState(() {
          isError = true;
          isLoading = false;
        });
      }
    } catch (e) {
      print('🚨 Erreur lors de la récupération du modèle : $e'); // Error log
      setState(() {
        isError = true;
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Aperçu AR"),
        backgroundColor: Colors.blue,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (GoRouter.of(context).canPop()) {
              GoRouter.of(context).pop(); // Retour si possible
            } else {
              context.go('/explanation'); // Sinon, retour à l'accueil
            }
          },
        ),
      ),
      body: Center(
        child: isLoading
            ? const CircularProgressIndicator()
            : isError
            ? Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              "❌ Échec du chargement du modèle 3D",
              style: TextStyle(fontSize: 18, color: Colors.red),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: fetchModel3D,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
                padding: const EdgeInsets.symmetric(
                    horizontal: 40, vertical: 15),
              ),
              child: const Text("🔄 Réessayer",
                  style: TextStyle(color: Colors.white)),
            ),
          ],
        )
            : Stack(
          children: [
            ARView(
              onARViewCreated: _onARViewCreated,
            ),
            Positioned(
              bottom: 20,
              left: 0,
              right: 0,
              child: Center(
                child: ElevatedButton(
                  onPressed: () {
                    context.go('/');
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 15),
                  ),
                  child: const Text("🏠 Retour à l'accueil",
                      style: TextStyle(color: Colors.white)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _onARViewCreated(
      ARSessionManager sessionManager,
      ARObjectManager objectManager,
      ARAnchorManager anchorManager,
      ARLocationManager locationManager) {
    arSessionManager = sessionManager;
    arObjectManager = objectManager;

    arSessionManager?.onInitialize(
      showPlanes: true,
      showFeaturePoints: false,
      showWorldOrigin: false,
      handleTaps: false,
    );
    arObjectManager?.onInitialize();

    if (modelUrl != null) {
      _placeModel(modelUrl!);
    }
  }

  void _placeModel(String modelUrl) async {
    print('📍 Tentative de placement du modèle depuis : $modelUrl'); // Debug log

    try {
      modelNode = ARNode(
        type: NodeType.webGLB,
        uri: modelUrl,
        scale: vm.Vector3(0.5, 0.5, 0.5), // Ajustement de l'échelle pour éviter un modèle trop grand
        position: vm.Vector3(0.0, 0.0, -2.0), // Position du modèle devant l'utilisateur
      );

      print('✅ Nœud AR créé'); // Debug log

      bool? success = await arObjectManager?.addNode(modelNode!);
      print('🛠️ Résultat de l’ajout du nœud : $success'); // Debug log

      if (success != true) {
        throw Exception("❌ Échec de l'ajout du modèle à la scène.");
      }
    } catch (e) {
      print('🚨 Erreur lors du placement du modèle : $e'); // Error log
      setState(() {
        isError = true;
      });
    }
  }
}

 */




import 'package:flutter/material.dart';
import 'package:o3d/o3d.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class PreviewScreen extends StatefulWidget {
  final String qrCode;

  const PreviewScreen({super.key, required this.qrCode});

  @override
  _PreviewScreenState createState() => _PreviewScreenState();
}

class _PreviewScreenState extends State<PreviewScreen> {
  bool isLoading = true;
  bool isError = false;
  String? modelUrl;
  O3DController controller = O3DController();
  bool isAnimationPlaying = true;

  @override
  void initState() {
    super.initState();
    fetchModel3D();
  }

  Future<void> fetchModel3D() async {
    setState(() {
      isLoading = true;
      isError = false;
    });

    try {
      final Uri url = Uri.parse(widget.qrCode);
      print('📡 Fetching model from: $url');

      final response = await http.get(url);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        if (data['model_file'] == null) {
          throw Exception('Model file URL is missing');
        }

        final String modelUrl = "http://192.168.0.107:8000${data['model_file']}";

        setState(() {
          this.modelUrl = modelUrl;
          isLoading = false;
        });
      } else {
        throw Exception('Failed to load model: ${response.statusCode}');
      }
    } catch (e) {
      print('🚨 Error fetching model: $e');
      setState(() {
        isError = true;
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Aperçu AR"),
        backgroundColor: Colors.blue,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.canPop() ? context.pop() : context.go('/explanation'),
        ),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : isError
          ? _buildErrorView()
          : _buildO3DViewer(),
    );
  }

  Widget _buildErrorView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            "❌ Échec du chargement du modèle 3D",
            style: TextStyle(fontSize: 18, color: Colors.red),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: fetchModel3D,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.orange,
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
            ),
            child: const Text("🔄 Réessayer", style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  Widget _buildO3DViewer() {
    if (modelUrl == null) {
      return const Center(child: Text("URL du modèle invalide"));
    }

    return Stack(
      children: [
        O3D(
          src: modelUrl!,
          controller: controller,
          ar: true,
          autoRotate: true,
          cameraControls: true,
        ),
        Positioned(
          bottom: 20,
          left: 0,
          right: 0,
          child: Column(
            children: [
              // Contrôles d'animation
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          isAnimationPlaying = !isAnimationPlaying;
                        });
                        // Utilisez les méthodes disponibles pour contrôler l'animation
                        if (isAnimationPlaying) {
                          // Démarrez l'animation (si une méthode est disponible)
                          // Exemple : controller.startAnimation();
                        } else {
                          // Arrêtez l'animation (si une méthode est disponible)
                          // Exemple : controller.stopAnimation();
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 10),
                      ),
                      child: Icon(
                          isAnimationPlaying ? Icons.pause : Icons.play_arrow),
                    ),
                  ],
                ),
              ),
              // Bouton de retour
              ElevatedButton(
                onPressed: () => context.go('/'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  padding:
                  const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                ),
                child: const Text("🏠 Retour à l'accueil",
                    style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    // Libérez les ressources si nécessaire
    super.dispose();
  }
}