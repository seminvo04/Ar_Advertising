import { useState, useRef } from 'react';

export const useVerificationCode = (length: number = 6) => {
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = Array(length).fill(null).map(() => useRef<HTMLInputElement | null>(null));

  return {
    verificationCode,
    setVerificationCode,
    inputRefs
  };
};

// Séparer les types dans un fichier dédié
// filepath: c:\Users\isido\gestock\gestock_webapp\types\auth.ts
