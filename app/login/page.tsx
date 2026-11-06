
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      if (recoveryMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage("Si cette adresse correspond à un compte, un lien de récupération vient de lui être envoyé. Vérifiez votre boîte mail.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage(error.message);
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch {
      setMessage("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600">
          <ArrowLeft size={16} /> Retour à l’accueil
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white">W</span>
            <div>
              <p className="text-xl font-black">Woke <span className="text-orange-500">Connect</span></p>
              <p className="text-sm text-slate-500">Votre espace de travail</p>
            </div>
          </div>

          <h1 className="text-2xl font-black text-slate-950">
            {recoveryMode ? "Mot de passe oublié ?" : "Bienvenue"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {recoveryMode
              ? "Saisissez votre adresse e-mail pour recevoir un lien de récupération."
              : "Connectez-vous à votre espace professionnel."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Adresse e-mail</span>
              <span className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-orange-400">
                <Mail size={18} className="text-slate-400" />
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@entreprise.com" className="w-full py-3.5 outline-none" />
              </span>
            </label>

            {!recoveryMode && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Mot de passe</span>
                <span className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-orange-400">
                  <LockKeyhole size={18} className="text-slate-400" />
                  <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Votre mot de passe" className="w-full py-3.5 outline-none" />
                </span>
              </label>
            )}

            {message && <p role="status" className="rounded-xl bg-orange-50 p-3 text-sm leading-6 text-orange-800">{message}</p>}

            <button disabled={loading} className="w-full rounded-xl bg-orange-500 px-5 py-4 font-bold text-white transition hover:bg-orange-600 disabled:opacity-60">
              {loading
                ? "Veuillez patienter..."
                : recoveryMode
                  ? "Envoyer le lien de récupération"
                  : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button type="button" onClick={() => { setRecoveryMode(!recoveryMode); setMessage(""); }} className="font-semibold text-orange-600 hover:text-orange-700">
              {recoveryMode ? "Retour à la connexion" : "Mot de passe oublié ?"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
