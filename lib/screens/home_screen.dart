import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:ar_advertising/theme.dart';

const Color backgroundColor = Color(0xFF0B1E35);
const Color buttonColor = Color(0xFF2D9CDB);
const Color textColor = Colors.white;

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Spacer(),
            const Text(
              "AR Advertiser",
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: textColor,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                "Révolutionnez la publicité avec des expériences en réalité augmentée",
                style: TextStyle(fontSize: 16, color: Colors.white70),
                textAlign: TextAlign.center,
              ),
            ),
            Image.asset(
              'assets/images/logo_ar.png',
              width: 120,
              height: 120,
            ),
            const Spacer(),
            ElevatedButton(
              onPressed: () => context.go('/explanation'),
              style: ElevatedButton.styleFrom(
                backgroundColor: buttonColor,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
              ),
              child: const Text("Commencer", style: TextStyle(fontSize: 18, color: textColor)),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}

