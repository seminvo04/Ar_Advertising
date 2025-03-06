import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Activer le mode strict de React
  async redirects() {  // Fonction pour définir les redirections d'URL
    return [
      {
        source: "/",  // L'URL d'origine (la racine)
        destination: "/auth/signin",  // L'URL de destination (la page de connexion)
        permanent: true,  // Redirection permanente (code HTTP 301)
      },
    ];
  },
};

export default nextConfig;
