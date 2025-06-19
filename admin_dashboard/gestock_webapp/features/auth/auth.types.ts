// types/auth.ts ou où tu gères tes types
export type LoginResponse = {
  access: string;
  refresh: string;
};

// À garder uniquement si tu prévois d'ajouter une route d'inscription plus tard
// Supprime-le si le backend ne retourne pas `clientToken`
export type registerResponse = {
  access: string;
  refresh: string;
};
