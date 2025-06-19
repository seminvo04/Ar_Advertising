import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ar_advertising/theme.dart';

class ExplanationScreen extends StatelessWidget {
  const ExplanationScreen({super.key});

  @override

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/images/logo_ar.png',
                width: 120,
                height: 120,
              ),
              const Text(
                "Scanner un code QR",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: textColor),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              const Text(
                "Découvrez l'univers de la publicité en réalité augmentée. Scannez des affiches et des vidéos pour débloquer du contenu AR interactif et interagir avec les marques comme jamais auparavant.",
                style: TextStyle(fontSize: 16, color: Colors.white70),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: () => context.go('/scan'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: buttonColor,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                ),
                child: const Text("Scanner", style: TextStyle(fontSize: 18, color: textColor)),
              ),
              const SizedBox(height: 20),
              TextButton(
                onPressed: () => context.go('/'),
                child: const Text("Retour à l'accueil", style: TextStyle(color: Colors.white60)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}