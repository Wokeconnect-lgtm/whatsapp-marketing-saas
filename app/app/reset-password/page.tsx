"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [validSession, setValidSession] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data, error }) => {
      setValidSession(!error && !!data.session);
      setChecking(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Impossible de modifier le mot de passe : " + error.message);
    } else {
      await supabase.auth.signOut();
      setMessage("Mot de passe modifié avec succès. Vous pouvez maintenant vous connecter.");
      setPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  }

  if (checking) {
    return <main className="min-h-screen flex items-center justify-center">Vérification du lien...</main>;
  }

  if (!validSession) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border p-8">
          <h1 className="text-2xl font-bold mb-4">Lien invalide</h1>
          <p>Ce lien de récupération est invalide ou a expiré. Demandez un nouveau lien de récupération.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border p-8 space-y-5">
        <h1 className="text-2xl font-bold">Nouveau mot de passe</h1>
        <p>Choisissez un nouveau mot de passe pour votre compte Woke Connect.</p>

        <div>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {message && <p role="status">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-orange-500 text-white p-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Modification en cours..." : "Modifier mon mot de passe"}
        </button>
      </form>
    </main>
  );
}
