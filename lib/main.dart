/*
import 'package:ar_advertising/screens/home_screen.dart';
import 'package:ar_advertising/screens/qr_scanner_screen.dart';
import 'package:ar_advertising/screens/scan_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'home_screen.dart'; // Importer l'écran d'accueil
import '../screens/scan_screen.dart'; // Importer l'écran de scan (qu'on fera après)

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}


class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      debugShowCheckedModeBanner: false,
    );
  }
}

// Configuration des routes
final GoRouter _router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
    GoRoute(path: '/scan', builder: (context, state) => const ScanScreen()), // Écran suivant
    GoRoute(path: '/preview', builder: (context, state) {
      final code = state.uri.queryParameters['code']; // Récupérer le paramètre 'code'
      return PreviewScreen(code: code ?? ''); // Passer le code QR à l'écran d'aperçu
    }),
  ],
);

 */


import 'package:flutter/material.dart';
import 'package:ar_advertising/screens/home_screen.dart';
import 'package:ar_advertising/screens/preview_screen.dart';
import 'package:ar_advertising/screens/scan_screen.dart';
import 'package:go_router/go_router.dart';
import 'package:ar_advertising/screens/explanation_screen.dart';



void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      debugShowCheckedModeBanner: false,
    );
  }
}

final GoRouter _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      pageBuilder: (context, state) {
        return CustomTransitionPage(
          child: const HomeScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(
              opacity: animation,
              child: ScaleTransition(
                scale: Tween<double>(begin: 0.95, end: 1.0).animate(animation),
                child: child,
              ),
            );
          },
        );
      },
    ),
    GoRoute(
      path: '/explanation',
      pageBuilder: (context, state) {
        return CustomTransitionPage(
          child: const ExplanationScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(0, 1),
                end: Offset.zero,
              ).animate(animation),
              child: child,
            );
          },
        );
      },
    ),
    GoRoute(
      path: '/scan',
      pageBuilder: (context, state) {
        return CustomTransitionPage(
          child: const ScanScreen(),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return FadeTransition(
              opacity: animation,
              child: child,
            );
          },
        );
      },
    ),
    GoRoute(
      path: '/preview',
      pageBuilder: (context, state) {
        final code = state.uri.queryParameters['code'];
        return CustomTransitionPage(
          child: PreviewScreen(qrCode: code ?? ""),
          transitionsBuilder: (context, animation, secondaryAnimation, child) {
            return ScaleTransition(
              scale: Tween<double>(begin: 0.8, end: 1.0).animate(animation),
              child: FadeTransition(opacity: animation, child: child),
            );
          },
        );
      },
    ),
  ],
);
