# Nemphisia-web

Agence de création de sites web sur mesure et d'agents IA pour artisans.
Site principal : https://nemphisia.com

---

## Le site vitrine — nemphisia.com

### Ce que c'est

Site one-page de l'agence Nemphisia-web. Présente les services (création de sites sur mesure), les tarifs (300-600€), l'approche, les résultats concrets, une FAQ et un formulaire de contact. Le site inclut aussi des thèmes démo accessibles via `?theme=xxx` pour montrer aux clients les styles disponibles (startup, nature, esthétique, coaching, artisan, commerce, etc.).

### Pages existantes

- **Homepage** (`/`) — Hero, résultats concrets, tarifs, galerie de designs, approche, services, éducation, FAQ, contact
- **Blog** (`?page=blog`) — Liste des articles SEO
- **Articles** (`?article=slug`) — Article individuel avec JSON-LD (Article + FAQPage)
- **Thèmes démo** (`?theme=impact|care|esthetic|coaching|consultant|artisan|classic|commerce`) — Sites démo pour les clients
- **Booking** (`?booking=slug`) — Page de RDV par artisan

### Design

- Dark mode / light mode (toggle dans la navbar)
- Gradient fuchsia → orange comme identité visuelle
- Font : Inter (body) + Outfit (titres)
- Composants UI custom : Card, Button
- Responsive (mobile first)

---

## SEO — Stratégie et état actuel

### Ce qui est en place

- Meta tags complets (title, description, OG, Twitter Cards) sur toutes les pages
- JSON-LD ProfessionalService sur la homepage
- JSON-LD Article + FAQPage sur chaque article de blog
- `<noscript>` avec contenu complet pour les crawlers qui n'exécutent pas JS
- sitemap.xml avec toutes les URLs
- robots.txt
- Génération HTML statique des articles blog (crawlable sans JS)

### Articles de blog existants (5)

1. **combien-coute-site-internet-2026** — Cible : recherches prix/tarifs
2. **comment-apparaitre-premier-google-maps** — Cible : SEO local
3. **pourquoi-site-internet-entreprise-2026** — Cible : indécis/convaincre
4. **seo-local-guide-complet-petites-entreprises** — Cible : TPE/PME
5. **comment-choisir-developpeur-site-internet** — Cible : décision d'achat

### SEO à étendre — Sujets à couvrir

Nouveaux articles à créer pour couvrir plus de recherches :

- **Par métier** : "site internet pour plombier", "site internet pour restaurant", "site internet pour coiffeur", "site internet auto-entrepreneur"
- **Comparatifs** : "site internet gratuit vs payant", "Wix vs développeur web", "WordPress vs site sur mesure"
- **Questions fréquentes** : "combien de temps pour créer un site internet", "refonte site internet prix", "différence site vitrine et e-commerce"
- **Tendances** : "tendances web design 2026", "IA et création de sites web"

### Actions SEO restantes (hors code)

- **Google Search Console** : enregistrer nemphisia.com, soumettre le sitemap
- **Google Business Profile** : créer la fiche entreprise
- **Forcer l'indexation** : inspecter chaque URL dans Search Console et demander l'indexation
- **Backlinks** : inscription annuaires (Pages Jaunes, Malt, LinkedIn entreprise)

---

## Stack technique

- **Frontend** : React SPA + Vite + Tailwind CSS (CDN)
- **Déploiement** : Vercel
- **Routing** : query params (`?theme=X`, `?page=blog`, `?article=slug`, `?booking=slug`)
- **Blog** : articles en JSON (`data/articles.json`) + génération HTML statique (`scripts/generate-blog.mjs`)
- **Backend** : Vercel serverless functions (`/api/`)
- **BDD** : Neon Postgres via Vercel (tables `businesses`, `bookings`)
- **Calendar** : Google Calendar API (service account, compte `nemphisia@gmail.com`)
- **SMS** : Twilio (un numéro par artisan)
- **Agents IA** : ElevenLabs (un agent par artisan)

## Structure du projet

```
Nem/
├── components/          # Composants React
│   ├── blog/            # BlogList, BlogArticle, blogData
│   ├── booking/         # BookingPage, BookingForm, ManageBooking, RescheduleForm
│   ├── themes/          # Thèmes démo (impact, care, esthetic, etc.)
│   └── ui/              # Composants UI réutilisables
├── data/
│   └── articles.json    # Données des articles de blog
├── api/                 # Vercel serverless functions
│   ├── booking.ts       # POST : créer un RDV
│   ├── cancel.ts        # POST : annuler un RDV
│   ├── reschedule.ts    # POST : décaler un RDV
│   ├── lookup.ts        # GET : chercher un RDV par référence ou téléphone
│   ├── slots.ts         # GET : créneaux disponibles
│   ├── remind.ts        # GET (cron) : rappels SMS J-1
│   └── ping.ts          # GET (cron) : keepalive BDD
├── scripts/
│   └── generate-blog.mjs  # Génération HTML statique blog (postbuild)
├── public/
│   ├── sitemap.xml
│   └── robots.txt
├── vercel.json          # Rewrites, headers, crons
└── package.json
```

---

## Système de Booking — Flow complet

### Contexte

Nemphisia est une agence qui fournit des agents IA (ElevenLabs) aux artisans.
Chaque artisan est un client de Nemphisia. Chaque artisan a ses propres clients (les particuliers).

### Acteurs

- **Nemphisia** : l'agence, gère tout depuis `nemphisia@gmail.com`
- **Artisan** : client de Nemphisia (plombier, électricien, etc.)
- **Client** : le particulier qui veut prendre RDV avec l'artisan

### Setup par artisan

1. Nemphisia signe un artisan (ex: Jean Plomberie)
2. Nemphisia entre ses infos en BDD : nom, email, téléphone, services proposés, horaires, numéro Twilio
3. Nemphisia configure une redirection d'appel du numéro réel de l'artisan vers son numéro Twilio
4. Nemphisia crée un agent ElevenLabs lié à ce numéro Twilio

### Flow client — Prise de rendez-vous

1. Un client appelle le numéro de l'artisan (son vrai numéro)
2. L'appel est redirigé vers Twilio → l'agent ElevenLabs répond
3. L'agent IA gère la conversation et envoie un SMS au client : "Prenez rendez-vous ici : nemphisia.com/?booking=jean-plomberie"
4. Le client ouvre le lien → page de RDV personnalisée pour cet artisan
5. La page affiche 2 options :
   - **"Prendre rendez-vous"**
   - **"Gérer mon rendez-vous"**

#### Option A — Prendre rendez-vous

6. Le client remplit le formulaire :
   - Prénom
   - Nom
   - Numéro de téléphone
   - Type d'intervention (dropdown des services de l'artisan)
   - Date (jours selon les horaires de l'artisan)
   - Créneau horaire (créneaux libres pour cette date)
7. Validation → le système :
   - Stocke le RDV en BDD (statut : "confirmed")
   - Génère une référence simple (ex: `RDV-3F8K`)
   - Crée un event Google Calendar sur `nemphisia@gmail.com` avec l'email de l'artisan en invité
   - Affiche le récap au client avec sa référence
   - Envoie un SMS de confirmation au client avec la référence

#### Option B — Gérer mon rendez-vous

8. Le client s'identifie avec au choix :
   - Sa référence (ex: `RDV-3F8K`)
   - Son numéro de téléphone
9. Si téléphone + plusieurs RDV chez cet artisan → affiche la liste, le client choisit lequel
10. Le client voit le récap de son RDV et peut :
    - **Décaler** → choisir une nouvelle date/créneau → ancien event Calendar supprimé, nouveau créé → SMS envoyé à l'artisan pour le notifier du changement
    - **Annuler** → event Calendar supprimé + statut BDD → "cancelled"

### Rappel automatique J-1

- Cron Vercel tous les jours à 9h
- Cherche les RDV de demain (statut "confirmed", reminder_sent = false)
- Envoie un SMS rappel au client depuis le numéro Twilio de l'artisan
- Marque reminder_sent = true

### Ping BDD

- Cron Vercel tous les jours à 3h
- Simple query `SELECT 1` pour keepalive

---

## Base de données — Neon Postgres

### Table `businesses`

| Colonne       | Type      | Description                                      |
|---------------|-----------|--------------------------------------------------|
| id            | uuid (PK) | ID auto-généré                                   |
| slug          | text      | Unique, utilisé dans l'URL `?booking=slug`       |
| name          | text      | Nom affiché (ex: "Jean Plomberie")               |
| email         | text      | Email de l'artisan (invité Calendar)              |
| phone         | text      | Numéro réel de l'artisan                         |
| twilio_phone  | text      | Numéro Twilio attribué à cet artisan             |
| services      | jsonb     | Liste des services (ex: ["Fuite", "Eau chaude"]) |
| hours         | jsonb     | Horaires (ex: { days: [1,2,3,4,5], start: "08:00", end: "18:00", slot_duration: 60 }) |
| created_at    | timestamp | Date de création                                 |

### Table `bookings`

| Colonne            | Type      | Description                                    |
|--------------------|-----------|------------------------------------------------|
| id                 | uuid (PK) | ID auto-généré                                |
| business_id        | uuid (FK) | Référence vers businesses                     |
| reference          | text      | Référence simple (ex: "RDV-3F8K"), unique     |
| client_first_name  | text      | Prénom du client                              |
| client_last_name   | text      | Nom du client                                 |
| client_phone       | text      | Téléphone du client                           |
| service            | text      | Type d'intervention choisi                    |
| date               | date      | Date du RDV                                   |
| time               | text      | Heure du RDV (ex: "14:00")                    |
| status             | text      | "confirmed" ou "cancelled"                    |
| calendar_event_id  | text      | ID de l'event Google Calendar                 |
| reminder_sent      | boolean   | true si le rappel J-1 a été envoyé            |
| created_at         | timestamp | Date de création                              |

---

## API Serverless — Vercel

### POST `/api/booking`
Crée un nouveau RDV.
- Input : `business_slug`, `first_name`, `last_name`, `phone`, `service`, `date`, `time`
- Actions : vérifie créneau libre → stocke en BDD → crée event Calendar → envoie SMS confirmation
- Output : `{ reference, date, time, service, business_name }`

### GET `/api/slots?slug=xxx&date=2026-05-01`
Retourne les créneaux disponibles pour un artisan à une date donnée.
- Calcule les créneaux selon les horaires du business
- Exclut les créneaux déjà réservés (bookings confirmed)
- Output : `{ slots: ["08:00", "09:00", "10:00", ...] }`

### GET `/api/lookup?slug=xxx&ref=RDV-3F8K` ou `GET /api/lookup?slug=xxx&phone=0612345678`
Cherche un ou plusieurs RDV.
- Par référence → retourne 1 RDV
- Par téléphone → retourne la liste des RDV confirmed chez cet artisan
- Output : `{ bookings: [...] }`

### POST `/api/cancel`
Annule un RDV.
- Input : `reference`
- Actions : passe statut → "cancelled" + supprime event Calendar
- Output : `{ success: true }`

### POST `/api/reschedule`
Décale un RDV.
- Input : `reference`, `new_date`, `new_time`
- Actions : vérifie créneau libre → supprime ancien event Calendar → crée nouveau event → met à jour BDD → envoie SMS à l'artisan
- Output : `{ reference, new_date, new_time }`

### GET `/api/remind` (Cron : tous les jours 9h)
Envoie les rappels SMS J-1.

### GET `/api/ping` (Cron : tous les jours 3h)
Keepalive Supabase.

---

## Variables d'environnement (Vercel)

- `DATABASE_URL` — Connection string Neon Postgres (ajoutée auto par Vercel)
- `GOOGLE_CALENDAR_CREDENTIALS` — JSON du service account Google
- `GOOGLE_CALENDAR_ID` — ID du calendrier (nemphisia@gmail.com)
- `TWILIO_ACCOUNT_SID` — SID du compte Twilio
- `TWILIO_AUTH_TOKEN` — Token Twilio
- `CRON_SECRET` — Secret pour sécuriser les crons

---

## Agent ElevenLabs — Configuration

### Vue d'ensemble

Chaque artisan a un agent ElevenLabs dédié configuré pour :
- Répondre aux appels entrants (redirigés via Twilio)
- Collecter les infos de prise de rendez-vous (prénom, nom, service, date, créneau)
- Chercher des créneaux disponibles via l'API
- Valider et confirmer les réservations via l'API
- Gérer les annulations et les décalages de RDV

### Exemple de configuration : Coiffure Lyon

**Horaires** : Lundi-Samedi 9h-12h et 13h-18h, fermé dimanche et jours fériés
**Services** : Coupe, Coloration, Lissage, Permanente, Barbe (Note: barbier services NOT offered — redirect to barber)
**Slug** : `coiffure-lyon`

### Règles d'optimisation API

**RÈGLE CRITIQUE** : Avant d'appeler `find_available_slots`, TOUJOURS vérifier en premier que l'heure demandée est dans les horaires connus du salon.

Horaires connus par défaut (Coiffure Lyon) :
- Lundi à samedi : 9h à 12h, puis 13h à 18h
- Dimanche : FERMÉ
- Jours fériés : FERMÉ

**Logique à appliquer** :

1. Si le client demande une heure manifestement hors horaires (ex: 19h quand salon ferme à 18h, ou dimanche), réponds IMMÉDIATEMENT sans appeler l'API :
   - "On est fermé ce soir, le salon ferme à 18 heures."
   - "On est fermé dimanche, on rouvre lundi à 9 heures."

2. Si le client demande une heure durant la pause déjeuner (12h-13h), réponds IMMÉDIATEMENT :
   - "On est fermés de 12h à 13h, c'est notre pause déjeuner. Vous pouvez avoir un créneau avant midi ou à partir de 13h."

3. Si l'heure est clairement dans les horaires, ALORS appelle `find_available_slots` pour vérifier la disponibilité réelle.

**Bénéfice** : Réduit les appels API inutiles et rend le service plus fluide et rapide.

### Guardrails

1. **Ne jamais inventer de raison** : Les seules raisons de non-disponibilité sont : closed (dimanche/fériés), full (complet), lunch_break (pause), outside_hours (fermé)
2. **Ne jamais poser de question dans les réponses d'erreur** : Toujours utiliser des affirmations plates
3. **Ne jamais re-proposer dimanche** : Le salon est fermé dimanche, point.
4. **Ne jamais demander 2 fois la même info** : Si le client a dit "à 17h", c'est validé, pas besoin de re-confirmer
5. **Ne jamais paraphraser** : Récite jamais la demande du client à voix haute
6. **Auto-collecter le téléphone** : Utiliser `system__caller_id` pour le numéro de téléphone, ne pas le demander au client