# Architecture Decision Record (ADR)

Journal des décisions d'architecture prises pendant le hackathon (dépendance nouvelle, stockage, pattern structurant).

Une entrée par décision, ajoutée à la fin, au format :

```
### AAAA-MM-JJ — <titre court>

- **Décision** : ce qui a été choisi
- **Contexte** : le problème à résoudre
- **Alternatives envisagées** : les autres options, et pourquoi elles sont écartées
- **Conséquences** : les compromis acceptés
```

Le fichier est un journal : on ajoute, on ne réécrit pas. Pour revenir sur une décision, une nouvelle entrée le dit explicitement.

---

## Décisions

### 2026-11-18 — Garder le `frontend/nginx.conf` du gabarit, pas le template de la plateforme

- **Décision** : conserver `frontend/nginx.conf` tel que posé par le gabarit du serveur (routage `try_files`, fichiers statiques `/health` et `/sante`), sans reprendre `core-platform/templates/nginx.conf`.
- **Contexte** : le `/CLAUDE.md` du serveur suggère de reprendre ce gabarit pour ses en-têtes de sécurité, mais prévient que sa CSP est taillée pour une SPA avec des bundles sous `/assets/` (Vite/CRA) ; l'export statique Next.js sert ses bundles sous `/_next/static/...` et sa CSP `default-src 'self'` sans `script-src` explicite risque de bloquer l'hydratation (page blanche, sans erreur serveur).
- **Alternatives envisagées** : adapter le template (chemins `/assets/` → `/_next/static/`, ajouter un `script-src`) — écarté pour l'itération 1, le risque de casser le rendu sans pouvoir le tester finement dans le budget de 10 minutes de codage est trop élevé pour un screen encore statique.
- **Conséquences** : pas d'en-têtes de sécurité (CSP, X-Frame-Options, etc.) sur le front pour l'instant. À reprendre dans une itération dédiée si le temps le permet, en adaptant le template à la structure de build Next.js avant de le déployer.
