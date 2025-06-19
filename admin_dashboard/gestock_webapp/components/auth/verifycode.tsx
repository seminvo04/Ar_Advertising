'use client';

import { useState, KeyboardEvent, useEffect } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useVerificationCode } from "@/hooks/useVerificationCode";
import { VerifyCodeProps } from "@/features/auth/auth.types";

export const VerifyCode = ({ queryCode, clientToken, handleSubmit }: VerifyCodeProps) => {
    const { verificationCode, setVerificationCode, inputRefs } = useVerificationCode(6);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("clientToken :", clientToken);
        
        // Pré-remplir les champs si queryCode est présent
        if (queryCode) {
            const codeArray = queryCode.split('').slice(0, 6);
            setVerificationCode((prev) => {
                const newCode = [...prev];
                codeArray.forEach((char, index) => {
                    if (index < 6) {
                        newCode[index] = char;
                    }
                });
                return newCode;
            });

            // Focus sur le premier champ vide
            const firstEmptyIndex = codeArray.findIndex((char) => char === '');
            if (firstEmptyIndex !== -1) {
                inputRefs[firstEmptyIndex]?.current?.focus();
            } else {
                inputRefs[codeArray.length]?.current?.focus();
            }
        }
    }, [queryCode, inputRefs, setVerificationCode]);

    const handleInputChange = (index: number, value: string) => {
        if (!value || value.length > 1 || !/^\d+$/.test(value)) return;

        setVerificationCode(prev => {
            const newCode = [...prev];
            newCode[index] = value;
            return newCode;
        });

        if (index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await handleSubmit(verificationCode);
        } catch (error) {
            console.error(error)
            setError('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="flex justify-between gap-2">
                {verificationCode.map((digit, index) => (
                    <Input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        className="w-12 h-12 text-center text-lg font-semibold"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        autoFocus={index === 0}
                    />
                ))}
            </div>

            <Button
                type="submit"
                className="w-full"
                variant="default"
                disabled={isLoading || verificationCode.join('').length !== 6}
            >
                {isLoading ? "Vérification..." : "Vérifier"}
            </Button>
        </form>
    );
};