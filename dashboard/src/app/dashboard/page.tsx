"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bienvenue, {session.user.email} !</p>
      <button onClick={() => signOut()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Déconnexion
      </button>
    </div>
  );
}
