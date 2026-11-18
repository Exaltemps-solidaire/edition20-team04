# Déploiement

Tableau de bord qui consolide, poste par poste, les financements et le taux de couverture des salarié·es de l'association La Cloche. Il permet à la gestion administrative et financière de repérer un double financement sur un mois, et à la direction de voir venir une date de fin de financement avant qu'elle ne devienne une crise.

## Services

- `frontend/` : export statique Next.js servi par nginx, port 80 (publié en 8080). **Seul service exposé au public.**
- `api/` : service Node, port 8081. Appelé par le front en chemin relatif (`/api/v1/...`), jamais exposé directement au navigateur.

## Services externes

Aucun pour cette itération : pas d'appel à un modèle d'IA, pas de base de données, pas de service de paiement ou de cartographie. Rien ne casse en cascade si un service externe tombe, puisqu'il n'y en a pas encore.

## Connu comme fragile ou inachevé

- L'écran « Qui êtes-vous ? » affiche deux personas en dur ; aucune donnée n'est encore saisie ni persistée.
- Pas encore de base de données : tout le futur contenu métier (financements, profils salariés, météo des postes, simulateur, export) reste à construire dans les itérations suivantes, voir `ITERATIONS.md`.

## Contact

- Équipe : équipe VSSC36 (hackathon eXaltemps Solidaire) — pas de contact nominatif renseigné à ce stade.
- Association : La Cloche — contact non renseigné dans la passation.
