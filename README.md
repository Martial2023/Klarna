<div align="center">

# Klarna · Suivi intelligent de dépenses personnelles

Application web moderne pour créer des catégories budgétaires, suivre ses dépenses au quotidien et obtenir une analyse IA actionnable.

</div>

## ✨ Aperçu

Klarna est une application de gestion financière construite avec le routeur App de Next.js. Elle aide les particuliers à garder le contrôle de leurs dépenses grâce à :

- un tableau de bord organisé par catégories avec budgets personnalisables ;
- des formulaires fluides pour créer ou supprimer catégories et dépenses ;
- des statistiques détaillées (totaux, moyennes, extrêmes, histogrammes) ;
- une synthèse stratégique générée par l’IA Gemini de Google ;
- une expérience responsive, multithème et localisée en français.

## 🧩 Fonctionnalités principales

- **Authentification sécurisée** : connexion e-mail/mot de passe et SSO Google via Better Auth.
- **Gestion des catégories** : icône, couleur, budget plafond et suivi du montant consommé en temps réel.
- **Suivi des dépenses** : création rapide, filtrage par période, suppression sécurisée avec feedback utilisateur.
- **Vue par catégorie** : tableau détaillé, tri par date et accès aux fiches complètes via un tiroir latéral.
- **Statistiques globales** : totaux dépensés, moyenne, dépenses min/max et histogramme interactif propulsé par Recharts.
- **Analyse IA** : résumé pratique généré par Gemini pour identifier priorités et actions correctives.
- **UI soignée** : design adaptatif Tailwind, mode sombre, notifications Sonner, composants Radix/React Aria.

## 🏗️ Architecture en un clin d’œil

```
app/
├─ (auth)/          Pages d’inscription/connexion Better Auth
├─ (main)/          Expérience authentifiée (home, category, expenses, statistics)
├─ actions/         Server actions Prisma (CRUD catégories/dépenses, statistiques)
components/         Bibliothèque UI (Credenza, formulaires, graphiques, pickers)
lib/                Auth, Prisma, intégrations externes (Gemini, Resend)
prisma/             Schéma et migrations PostgreSQL
public/             Assets statiques (logos, visuels)
```

## 🛠️ Stack technique

- **Framework** : Next.js 16 (App Router) + React 19
- **Langage** : TypeScript strict
- **UI/UX** : Tailwind CSS 4, Radix UI, React Aria Components, Sonner, Lucide Icons
- **Formulaires** : React Hook Form + Zod pour la validation
- **Base de données** : Prisma ORM sur PostgreSQL
- **Auth** : Better Auth (sessions, providers sociaux)
- **Graphiques** : Recharts
- **IA** : Google Gemini (`@google/generative-ai`)
- **Emails transactionnels** : Resend

## ✅ Prérequis

- Node.js 20 ou supérieur
- PostgreSQL accessible (local, Docker ou cloud)
- Clé API Google Gemini (compte Google AI Studio)
- Clé API Resend (optionnelle mais requise pour les e-mails de réinitialisation)

## 🚀 Démarrage rapide

1. **Cloner** le dépôt et se placer dans le dossier `klarna/`.
2. **Installer** les dépendances :
	```bash
	npm install
	```
3. **Configurer** les variables d’environnement (voir section suivante).
4. **Initialiser** la base de données :
	```bash
	npx prisma migrate dev
	```
5. **Lancer** l’application :
	```bash
	npm run dev
	```
6. Ouvrir [http://localhost:3000](http://localhost:3000) et créer un compte.

## 🔐 Variables d’environnement

Créer un fichier `.env` à la racine avec, au minimum :

| Nom | Description |
| --- | --- |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL (ex. `postgresql://user:pass@localhost:5432/klarna`). |
| `BETTER_AUTH_URL` | URL de base des routes d’auth (ex. `http://localhost:3000/api/auth`). |
| `GOOGLE_CLIENT_ID` | Identifiant OAuth Google pour le SSO. |
| `GOOGLE_CLIENT_SECRET` | Secret OAuth Google associé. |
| `RESEND_API_KEY` | (Optionnel) Clé API Resend pour les e-mails de réinitialisation. |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Clé API publique pour les appels à Gemini côté serveur. |

> ℹ️ Reportez-vous à la documentation de Better Auth pour les secrets supplémentaires recommandés (ex. `AUTH_SECRET`).

## 📦 Scripts NPM

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur Next.js en mode développement. |
| `npm run build` | Crée la build de production. |
| `npm run start` | Lance la build de production. |
| `npm run lint` | Analyse le code avec ESLint. |

## 🗃️ Base de données & Prisma

- Migrations versionnées dans `prisma/migrations/`.
- Générer le client Prisma avant utilisation : `npx prisma generate` (inclus dans `migrate dev`).
- Explorer les données avec Prisma Studio :
  ```bash
  npx prisma studio
  ```
- Les modèles principaux : `User`, `Category`, `Expense`, `Session`, `Account`, `Verification`.

## 📊 Fonctions clés

- **Tableau de bord catégories** : création, personnalisation (icône/couleur), suivi du budget consommé.
- **Vue dépense détaillée** : tiroir (`Credenza`) affichant description, montants formatés, métadonnées, dates localisées en français.
- **Filtres temporels** : sélection de plages de dates via des composants React Aria.
- **Statistiques globales** : indicateurs clés, histogramme comparant montants et volumes par catégorie.
- **Analyse Gemini** : synthèse de moins de 100 mots, orientée actions concrètes, générée automatiquement ou manuellement.
- **Notifications** : feedback utilisateur (`toast`) sur toutes les actions critiques.

## 🧪 Qualité & bonnes pratiques

- Linting via `npm run lint` avant commit.
- Typage strict TypeScript et validations Zod côté formulaires.
- Server Actions Next.js pour centraliser la logique backend et garantir la sécurité des accès Prisma.

## 📦 Déploiement

- Provisionner une base PostgreSQL accessible depuis l’hébergement.
- Définir les variables d’environnement sur la plateforme choisie (Vercel, Render, Railway, etc.).
- Exécuter `npm run build` suivi de `npm run start`.
- Vérifier que l’URL renseignée dans `BETTER_AUTH_URL` correspond à l’origin de production et que les origines de `betterAuth` incluent cette URL.

## 🔭 Pistes d’amélioration

- Export des rapports en CSV/PDF.
- Partage sécurisé des catégories entre utilisateurs.
- Budgets récurrents avec alertes automatiques.
- Application mobile ou PWA optimisée hors-ligne.

---

Klarna est un outil interne en évolution. N’hésitez pas à ouvrir des issues ou proposer des améliorations pour enrichir l’expérience budgétaire des utilisateurs.
