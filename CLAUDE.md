# Nemphisia-web

Agence de création de sites web sur mesure et d'agents IA pour artisans.

## Stack technique

- **Frontend** : React SPA + Vite + Tailwind CSS (CDN)
- **Déploiement** : Vercel
- **Routing** : query params (`?theme=X`, `?page=blog`, `?article=slug`, `?booking=slug`)
- **Blog** : articles en JSON (`data/articles.json`) + génération HTML statique (`scripts/generate-blog.mjs`)
- **Backend** : Vercel serverless functions (`/api/`)
- **BDD** : Supabase (tables `businesses`, `bookings`)
- **Calendar** : Google Calendar API (service account, compte `nemphisia@gmail.com`)
- **SMS** : Twilio (un numéro par artisan)
- **Agents IA** : ElevenLabs (un agent par artisan)

## Structure du projet

```
Nem/
├── components/          # Composants React
│   ├── blog/            # BlogList, BlogArticle, blogData
│   ├── booking/         # BookingPage, ManageBooking (à créer)
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
│   └── ping.ts          # GET (cron) : keepalive Supabase
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

### Ping Supabase

- Cron Vercel tous les jours à 3h
- Simple query `SELECT 1` pour éviter le freeze du free tier Supabase

---

## Base de données — Supabase

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

- `SUPABASE_URL` — URL du projet Supabase
- `SUPABASE_ANON_KEY` — Clé anon Supabase
- `GOOGLE_CALENDAR_CREDENTIALS` — JSON du service account Google
- `GOOGLE_CALENDAR_ID` — ID du calendrier (nemphisia@gmail.com)
- `TWILIO_ACCOUNT_SID` — SID du compte Twilio
- `TWILIO_AUTH_TOKEN` — Token Twilio
