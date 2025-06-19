export const RESET_PASSWORD_STEPS = {
  EMAIL: 1,
  CODE: 2,
  NEW_PASSWORD: 3
} as const;

export const MESSAGES = {
  EMAIL_STEP: "Entrez votre adresse email pour recevoir un code de réinitialisation",
  CODE_STEP: "Entrez le code reçu par email",
  PASSWORD_STEP: "Créez votre nouveau mot de passe"
} as const;