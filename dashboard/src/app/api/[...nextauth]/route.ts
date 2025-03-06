import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Faire une requête POST à ton backend Django pour récupérer le token JWT
        const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.access) {
          return { accessToken: data.access };  // Le token JWT
        } else {
          return null;  // L'utilisateur n'est pas authentifié
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",  // Page de connexion customisée
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
