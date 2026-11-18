# Plan d'itérations — La Cloche (équipe VSSC36)

**Plan validé le 2026-11-18**, tel quel (itérations 1 et 2).

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation — `cadrage/` ne contient pas de fichier `iteration*`, `passation.json` ne porte pas de clé `iterations`).
- **Temps restant annoncé** : 60 minutes (question posée le 2026-11-18).
- **Durée du tour de test PM Lab** : 10 minutes (valeur par défaut, le développeur ne la connaissait pas précisément).
- **Temps restant au début de l'itération 1** : ~55 minutes (question posée le 2026-11-18).
- **Temps restant au début de l'itération 2** : ~30 minutes (question posée le 2026-11-18). ⚠️ Moins que prévu par le calcul initial (le plan supposait ~45-50 min disponibles à ce stade). Avec 10 min de codage + ~5 min de publication + 10 min de tour de test = ~25 min nécessaires, il reste ~5 min de marge seulement : **cette itération doit être traitée comme la dernière avant le pitch**, sans ouvrir de nouveau périmètre ensuite.
- **Capacité estimée** : chaque itération coûte au plus 10 min de codage + ~5 min de publication + 10 min de tour de test = ~25 min. Avec 60 minutes, **2 itérations complètes tiennent confortablement** (50 min), avec ~10 min de marge en fin de build — insuffisant pour une 3ᵉ itération complète (elle recoupe le même calcul : 25 min minimum). Cette marge sert donc à stabiliser, pas à ouvrir un nouveau périmètre.
- **Hors périmètre pour ce build** (✂️) : Météo des postes, Simulateur de falaise et Export du justificatif ne rentreront probablement pas avant le pitch, sauf si le build est prolongé ou le tour de test plus court que prévu. Ils restent dans « À venir », dans l'ordre de priorité fixé par l'équipe (`6-plan-de-livraison.md`).

⚠️ Le temps restant peut changer : il sera redemandé au début de chaque `/iteration`, et ce plan sera ajusté en conséquence.

---

## Itération 1 : L'application démarre et affiche l'écran « Qui êtes-vous ? »

- **Dans le périmètre** :
  - Squelette de déploiement conforme au contrat (`api/` et `frontend/` déjà posés par le gabarit) : ajout de `.env.example` et `DEPLOIEMENT.md`.
  - Écran d'accueil « Qui êtes-vous ? » : liste des deux personas du scénario (la gestion administrative et financière, la directrice du développement et des partenariats), avec données en dur.
  - Choix d'un persona → affichage de son nom et son rôle (pas encore de navigation vers un autre écran fonctionnel).
- **Hors périmètre** : saisie réelle de données, calculs, changement de persona en cours de session, tout écran au-delà de l'accueil.
- **Critères d'acceptation** :
  - Étant donné l'application déployée, quand on ouvre l'URL racine, alors l'écran « Qui êtes-vous ? » affiche les deux personas du scénario.
  - Étant donné l'écran « Qui êtes-vous ? », quand on choisit un persona, alors son nom et son rôle s'affichent.
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune directement — itération de squelette, préalable à la saisie testée en itération 2.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : `api/.env.example`, `DEPLOIEMENT.md`, une page/écran d'accueil côté `frontend/` (persona selector), une liste de personas en dur (petit fichier de données ou constante).
- **Tests unitaires prévus** : aucun — pas de logique métier sur cet écran statique (uniquement de l'affichage).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouverture de l'app, sélection d'un persona.
- **Bilan** :
  - **Durée de codage réelle** : 3 minutes (budget 8 min, aucun dépassement, alarme non déclenchée).
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés en relisant le HTML rendu sur `localhost:8080/` (les deux personas « Amina Diallo » / « Claire Moreau » et leurs rôles y figurent), en relisant `page.tsx` (sélection → affichage nom + rôle), et en rappelant `/health` et `/sante` sur 8080 et 8081 (tous `200`, corps `ok` / `{"status":"ok"}`).
  - **Reporté** : rien de cette itération ; le reste du scénario (financements, profils salariés, etc.) était déjà hors périmètre, listé en Itération 2 et « À venir ».
  - **Bloqué ou refusé par le harnais** : rien — `verifier-deployabilite.sh` ne signale aucune borne ni alarme, `npm test` passe (2 tests existants côté `api/`, aucun nouveau test requis : pas de logique métier introduite, seulement de l'affichage et un `useState` de sélection), `signaler-version.sh 1` a été accepté.
  - **Écart non prévu** : l'exécution de la démo Playwright a nécessité `npx playwright install chromium` puis `npx playwright install-deps chromium` (bibliothèques système manquantes, ex. `libnspr4.so`) — non prévu au plan initial, sans impact sur le budget de codage (hors chrono, étape 4 de `/iteration`).
  - **Modifications** :
    - `frontend/src/app/personas.ts` (nouveau) — données en dur des deux personas du scénario ; sert le 1ᵉʳ critère.
    - `frontend/src/app/page.tsx` (réécrit) — écran « Qui êtes-vous ? » et affichage du persona choisi ; sert les 1ᵉʳ et 2ᵉ critères.
    - `frontend/src/app/page.module.css` (réécrit) — mise en forme de l'écran ci-dessus.
    - `.env.example` (nouveau) — port d'écoute documenté, exigé par le contrat de déployabilité.
    - `DEPLOIEMENT.md` (nouveau) — description de l'app et de ses services, exigé par le contrat de déployabilité.
    - `adr.md` (complété) — décision de ne pas reprendre la CSP du gabarit nginx de la plateforme pour cet export statique Next.js.
    - `api/Dockerfile`, `frontend/Dockerfile` (modifiés) — images de base qualifiées `docker.io/library/...` pour fiabiliser le build hors terminal interactif.
    - `podman-compose.yml` (nouveau) — déploiement des deux services sur le réseau `core-network`, ports 8080/8081 uniquement.
    - `e2e/demo.spec.ts` (complété) — étape « Je choisis mon persona » ; sert le 3ᵉ critère (démonstration, hors DoD).

---

## Itération 2 : Saisie des financements et détection des doublons

- **Dans le périmètre** :
  - Écran Financements : la gestion administrative et financière saisit une ligne de financement (poste, financeur, mois, montant).
  - La liste des lignes déjà saisies pour le poste démo s'affiche.
  - Détection et signalement d'un double financement : deux lignes du même poste sur le même mois sont mises en évidence.
- **Hors périmètre** : profils salariés (sheet 2), calcul du taux de couverture, date de falaise, météo des postes, export, persistance en base (en mémoire ou mock côté API acceptable pour cette itération).
- **Critères d'acceptation** :
  - Étant donné l'écran Financements, quand on saisit une ligne (poste, financeur, mois, montant), alors elle apparaît dans la liste.
  - Étant donné deux lignes existantes pour le même poste et le même mois, quand la page affiche la liste, alors un signal de double financement est visible sur ces lignes.
  - Étant donné des lignes sur des mois différents pour le même poste, quand la page affiche la liste, alors aucun signal de doublon n'apparaît.
- **Hypothèse de l'équipe couverte** : « la structure ligne par ligne (poste, financeur, mois) permet de repérer un double financement sur un mois » — cible 0 écart non détecté.
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : page/écran Financements côté `frontend/` (formulaire + liste), fonction de détection de doublon (logique métier isolée, testable), route API `api/.../financements` (stockage en mémoire), types partagés le cas échéant.
- **Tests unitaires prévus** : 2 à 3 tests Vitest sur la fonction de détection de doublon (détecte un doublon même poste/même mois ; ne signale rien sur des mois différents ; ne signale rien sur des postes différents).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : saisie de deux lignes de financement sur le même poste et même mois, vérification du signal de doublon affiché.
- **Bilan** :
  - **Durée de codage réelle** : 1 minute (budget 10 min, aucun dépassement, alarme non déclenchée).
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés en relisant `Financements.tsx` et `financements.ts`, en relançant `npm test` (5 tests, dont les 3 nouveaux sur `detecterDoublons`), et en rejouant la démo Playwright contre le déploiement local (`localhost:8080`) : saisie de deux lignes même poste/même mois → 2 mentions « double financement » visibles.
  - **Reporté** : persistance côté API (stockage en mémoire sur `api/.../financements` prévu au plan initial) — remplacé par un état client (`useState`) pour tenir dans un budget de codage très réduit (1 min visée, 30 min de build restantes annoncées en début d'itération) ; à reprendre si une itération de stabilisation le permet, sans quoi reste tel quel pour le pitch. Pas de validation de format du mois ni du montant (champ `number`/texte libre) — hors des 3 critères d'acceptation, non traité.
  - **Bloqué ou refusé par le harnais** : rien — `verifier-deployabilite.sh` ne signale aucune borne, `npm test` passe, `signaler-version.sh 2` accepté.
  - **Modifications** :
    - `frontend/src/app/financements.ts` (nouveau) — fonction pure `detecterDoublons` (même poste + même mois) ; sert les 2ᵉ et 3ᵉ critères.
    - `frontend/src/app/financements.test.ts` (nouveau) — 3 tests Vitest sur `detecterDoublons` (doublon détecté, mois différents, postes différents).
    - `frontend/src/app/Financements.tsx` (nouveau) — écran Financements : formulaire de saisie + liste avec signal de doublon ; sert les 1ᵉʳ, 2ᵉ et 3ᵉ critères.
    - `frontend/src/app/page.tsx` (modifié) — affiche `Financements` sous le persona « gestion administrative et financière » une fois sélectionné.
    - `e2e/demo.spec.ts` (complété) — étape « Je saisis deux lignes de financement sur le même poste et le même mois » (démonstration, hors DoD).
    - `ITERATIONS.md` (complété) — temps restant à l'itération 2, Bilan.

---

⚠️ **Fin de build annoncée proche** (~30 min restantes au début de l'itération 2, dont ~10 min consommées par le codage/publication/signal de cette itération). Conformément au calcul de capacité, **aucune itération 3 complète ne tient** dans le temps qui reste après le tour de test de l'équipe : le temps restant doit servir à stabiliser ce qui est déjà démontré (itérations 1 et 2), pas à ouvrir « Profils salariés » ou un autre point de la liste ci-dessous. À confirmer par les cadreurs si le temps restant annoncé diffère à la prochaine vérification.

## À venir (non détaillé, ordre de priorité de l'équipe)

1. Profils salariés (sheet 2) : saisie du salaire, répartition du financement par poste, suivi des heures — prérequis au calcul du taux de couverture.
2. Météo des postes : calcul automatique du taux de couverture et de la date de falaise, tableau postes × mois en couleurs.
3. Alerte falaise (6 mois / 3 mois) pour la directrice du développement et des partenariats.
4. Simulateur de falaise : recalcul immédiat à partir de date de départ, durée de vacance, coût du remplaçant (cible : 3 champs).
5. Export du justificatif par financeur en un clic.
