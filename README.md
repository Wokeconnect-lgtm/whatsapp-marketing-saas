# Woke Connect

Première base Next.js de la plateforme Woke Connect.

## Contenu
- Page d'accueil
- Page de connexion (préparée pour Supabase Auth)
- Première maquette du tableau de bord
- Client navigateur Supabase
- Variables d'environnement documentées dans `.env.example`

## Configuration locale
1. Installer Node.js LTS.
2. Exécuter `npm install`.
3. Copier `.env.example` vers `.env.local`.
4. Renseigner l'URL du projet Supabase et la clé publique/publishable.
5. Exécuter `npm run dev`.

Ne jamais placer une clé `service_role`, un jeton Meta ou un App Secret dans une variable `NEXT_PUBLIC_*`.
Le tableau de bord est une maquette initiale : l'authentification serveur, les contrôles d'accès multi-entreprises et les politiques RLS doivent être durcis et testés avant toute utilisation réelle.
