
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      if (recoveryMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          setMessage("Erreur : " + error.message);
        } else {
          setMessage(
            "Un lien de récupération a été envoyé à votre adresse e-mail."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage("E-mail ou mot de passe incorrect.");
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Woke Connect
          </h1>
          <p className="mt-2 text-gray-500">
            {recoveryMode
              ? "Récupération de votre mot de passe"
              : "Connectez-vous à votre espace"}
          </p>
        </div>

        {recoveryMode && (
          <button
            type="button"
            onClick={() => {
              setRecoveryMode(false);
              setMessage("");
            }}
            className="mb-5 flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600"
          >
            <ArrowLeft size={16} />
            Retour à la connexion
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {!recoveryMode && (
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setRecoveryMode(true);
                    setMessage("");
                  }}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </div>
          )}

          {message && (
            <p
              role="status"
              className="rounded-lg bg-orange-50 p-3 text-sm text-gray-700"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Veuillez patienter..."
              : recoveryMode
                ? "Envoyer le lien de récupération"
                : "Se connecter"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Woke Connect - Plateforme de communication WhatsApp
        </p>
      </div>
    </main>
  );
}
