// app/api/auth/[...nextauth]/route.ts
// import { User } from "@/types/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "@/features/auth/auth.service"
// Extend the Profile type to include family_name and given_name
declare module "next-auth" {
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        expires_at?: string;
        idToken?: string;
        provider?: string;
        firstName?: string;
        lastName?: string;
        scopes?: string;
        restaurant?: {
            id: string;
            logo: string;
            name: string;
            phone: string;
            ifu: string;
            balance: string;
            owner: string;
        };
    }

    interface User {
        access_token?: string;
        refresh_token?: string;
        provider?: string;
        firstname?: string;
        lastname?: string;
        email?: string;
        restaurant : Restaurant
    }
    
    interface Restaurant {
        id: string;
        logo: string;
        name: string;
        phone: string;
        ifu: string;
        balance: string;
        owner: string;
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        idToken?: string;
        provider?: string;
        firstName?: string;
        lastName?: string;
        scopes?: string;
        expires_at?: string;
        restaurant?: {
            id: string;
            logo: string;
            name: string;
            phone: string;
            ifu: string;
            balance: string;
            owner: string;
        };
    }
}


const handler = NextAuth({

    providers: [
        Credentials({
            name: "CustomLogin",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Mot de passe", type: "password" },
              },
              
              async authorize(credentials) {
                if (!credentials) return null;
        
                try {
               
                  const response = await authService.authenticate({
                    email: credentials.email,
                    password: credentials.password,
                  });
                  if (response?.user && response?.token) {
                    console.log("response",response)
                    return {
                      id: response.user.id,
                      name: response.user.username,
                      email: response.user.email,
                      access_token: response.token,
                      refresh_token: response.refresh_token,
                      provider: "credentials",
                      firstname: response.user.firstname,
                      lastname: response.user.lastname,
                      restaurant: {
                        id:response.restaurant.id,
                        logo:response.restaurant.logo,
                        name:response.restaurant.name,
                        phone:response.restaurant.phone,
                        ifu:response.restaurant.ifu,
                        balance:response.restaurant.balance,
                        owner:response.restaurant.owner
                      },  // si tu veux
                    };
                  }
                  return null;
                } catch (error) {
                  console.error("Erreur login :", error);
                  return null;
                }
              },
        }),

        // Ajoutez d'autres fournisseurs ici
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user }) {
            return !!user;
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/`;
        },
        async session({ session, token }) {
            if (session && token && session.user) {
                session.user.name = token.name as string | undefined;
                session.user.email = token.email as string | undefined;
                session.accessToken = token.accessToken as string | undefined;
                session.refreshToken = token.refreshToken as string | undefined; // ← ici
                session.idToken = token.idToken as string | undefined;
                session.provider = token.provider as string | undefined;
                session.expires_at = token.expires_at as string | undefined;
                session.firstName = token.firstName as string | undefined;
                session.lastName = token.lastName as string | undefined;
                session.scopes = token.scopes as string | undefined;
                session.restaurant = token.restaurant as typeof session.restaurant;

            }
            return session;
        },
        async jwt({ token, user }) {

            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.accessToken = user.access_token;
                token.refreshToken = user.refresh_token;
                token.provider = user.provider;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                if (user.restaurant) {
                    token.restaurant = user.restaurant;
                }
                            
                // Si le user vient de credentials
                const profile = (user as { profile?: { givenName?: string; familyName?: string } }).profile;
                if (profile) {
                    token.firstName = profile.givenName;
                    token.lastName = profile.familyName;
                }
            }
            return token;
        }
        
    },
});

export { handler as GET, handler as POST };
