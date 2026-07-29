# app-front (app.nemphisia.com)

Projet Vercel SEPARE du site vitrine.

- Vercel > New Project > importer ce repo `Nem`, **Root Directory = `app-front`**.
- Ajouter le domaine `app.nemphisia.com`.
- Le `vercel.json` proxifie **tout** vers `https://agent.nemphisia.com` -> masque l'IP du serveur aux commerciaux/staff.
- La telephonie (Twilio) reste en direct sur agent.nemphisia.com, non concernee.
