# Plan d'itérations — La Cloche (équipe VSSC36)

**Plan validé le 2026-11-18**, tel quel (itérations 1 et 2). **Itérations 3 et 4 validées le 2026-11-18**, tel quel également (demande nouvelle du développeur, ✂️ taillée en deux itérations ci-dessous).

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation — `cadrage/` ne contient pas de fichier `iteration*`, `passation.json` ne porte pas de clé `iterations`).
- **Temps restant annoncé** : 60 minutes (question posée le 2026-11-18).
- **Durée du tour de test PM Lab** : 10 minutes (valeur par défaut, le développeur ne la connaissait pas précisément).
- **Temps restant au début de l'itération 1** : ~55 minutes (question posée le 2026-11-18).
- **Temps restant au début de l'itération 2** : ~30 minutes (question posée le 2026-11-18). ⚠️ Moins que prévu par le calcul initial (le plan supposait ~45-50 min disponibles à ce stade). Avec 10 min de codage + ~5 min de publication + 10 min de tour de test = ~25 min nécessaires, il reste ~5 min de marge seulement : **cette itération doit être traitée comme la dernière avant le pitch**, sans ouvrir de nouveau périmètre ensuite.
- **Capacité estimée** : chaque itération coûte au plus 10 min de codage + ~5 min de publication + 10 min de tour de test = ~25 min. Avec 60 minutes, **2 itérations complètes tiennent confortablement** (50 min), avec ~10 min de marge en fin de build — insuffisant pour une 3ᵉ itération complète (elle recoupe le même calcul : 25 min minimum). Cette marge sert donc à stabiliser, pas à ouvrir un nouveau périmètre.
- **Hors périmètre pour ce build** (✂️) : Météo des postes, Simulateur de falaise et Export du justificatif ne rentreront probablement pas avant le pitch, sauf si le build est prolongé ou le tour de test plus court que prévu. Ils restent dans « À venir », dans l'ordre de priorité fixé par l'équipe (`6-plan-de-livraison.md`).

⚠️ Le temps restant peut changer : il sera redemandé au début de chaque `/iteration`, et ce plan sera ajusté en conséquence.

- **Temps restant annoncé avant l'itération 3** : 60 minutes (question posée le 2026-11-18, en réponse à une demande nouvelle du développeur). ⚠️ Remonte par rapport à l'estimation donnée en fin d'itération 2 (~20 min restantes à ce moment-là) : le build a visiblement été prolongé, ou l'estimation précédente était pessimiste. Je prends la valeur annoncée telle quelle, sans supposer la raison de l'écart.
- **Capacité recalculée** : avec 60 minutes et le même coût par itération (~25 min), **2 itérations complètes tiennent** (50 min), ~10 min de marge — comme au début du build. La mise en garde « aucune itération 3 ne tient » de la fin d'itération 2 est donc levée par ce nouveau temps annoncé.
- **Demande nouvelle du développeur** (hors plan initial, ✂️ taillée en deux itérations) : « styliser le rendu, le rendre plus user-friendly, et rajouter des listes déroulantes et des filtres au besoin » → listes déroulantes et filtres fonctionnels en Itération 3, habillage visuel en Itération 4. ⚠️ **Changement de priorité** par rapport à l'ordre « À venir » fixé par les cadreurs (qui plaçait « Profils salariés » en tête) : ces deux itérations passent devant, à la demande explicite du développeur sur cette session — à confirmer par les cadreurs au prochain tour de test.

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

⚠️ Note historique : à la fin de l'itération 2, ~20 min restantes avaient été annoncées et laissaient supposer qu'aucune itération 3 ne tiendrait. Le développeur a ensuite annoncé 60 minutes restantes avant l'itération 3 (ci-dessus) : le calcul de capacité est donc revu en conséquence.

---

## Itération 3 : Saisie assistée (listes déroulantes) et filtres sur la liste Financements

- **Dans le périmètre** :
  - Champs **Poste** et **Financeur** du formulaire Financements proposés en liste déroulante de suggestions (valeurs déjà saisies dans la session), tout en acceptant une valeur nouvelle (pas de catalogue fixe fourni par la passation).
  - Filtres sur la liste des lignes : poste, financeur, mois (sélecteurs, valeur par défaut « Tous »).
  - La fonction de filtrage est une fonction pure testable, combinée au signal de doublon déjà en place.
- **Hors périmètre** : habillage visuel (reporté en Itération 4), filtre sur le montant, tri des colonnes, persistance des filtres après rechargement.
- **Critères d'acceptation** :
  - Étant donné des lignes déjà saisies, quand on ouvre la liste déroulante du champ Poste ou Financeur, alors les valeurs déjà utilisées apparaissent en suggestion, et une valeur nouvelle reste saisissable.
  - Étant donné plusieurs lignes avec des postes différents, quand on choisit un poste dans le filtre, alors seules les lignes de ce poste s'affichent.
  - Étant donné un filtre actif sur poste et financeur en même temps, quand les deux critères ne correspondent à aucune ligne, alors la liste affichée est vide (aucune ligne hors critères ne reste visible).
- **Hypothèse de l'équipe couverte** : aucune directement — confort de saisie et de lecture, pas une des 4 hypothèses mesurées de la passation.
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : `frontend/src/app/financements.ts` (fonction de filtrage + extraction des valeurs distinctes), `frontend/src/app/financements.test.ts` (tests du filtre), `frontend/src/app/Financements.tsx` (datalist + sélecteurs de filtre).
- **Tests unitaires prévus** : 2 à 3 tests Vitest sur la fonction de filtrage (un critère seul, plusieurs critères combinés, aucun résultat).
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : filtrer la liste par poste après la saisie des deux lignes de doublon, vérifier que seules les lignes attendues restent visibles.
- **Bilan** :
  - **Durée de codage réelle** : moins d'1 minute (budget 10 min, aucun dépassement, alarme non déclenchée).
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés en relisant `Financements.tsx` (datalist sur Poste/Financeur, sélecteurs de filtre avec option « Tous »), en relançant `npm test` (8 tests, dont les 3 nouveaux sur `correspondAuxFiltres`), et en rejouant la démo Playwright contre le déploiement local (`localhost:8080`) : ajout d'une 3ᵉ ligne sur un poste différent, filtre sur ce poste → seule cette ligne reste visible, aucun « double financement » affiché.
  - **Reporté** : filtre sur le montant, tri des colonnes, persistance des filtres après rechargement — non demandés dans les 3 critères d'acceptation, non traités.
  - **Bloqué ou refusé par le harnais** : rien — `verifier-deployabilite.sh` ne signale aucune borne, `npm test` passe, `signaler-version.sh 3` accepté.
  - **Écart non prévu** : la démo Playwright a d'abord échoué (`strict mode violation`, le texte du poste apparaissant à la fois dans l'option de filtre et dans la ligne de la liste) — corrigé en ciblant précisément l'élément de liste (`locator("li").filter(...)`), sans impact sur le budget de codage (démo hors DoD).
  - **Modifications** :
    - `frontend/src/app/financements.ts` (modifié) — ajoute `correspondAuxFiltres` et `valeursDistinctes` ; sert les 3 critères.
    - `frontend/src/app/financements.test.ts` (modifié) — 3 tests Vitest sur `correspondAuxFiltres` (aucun filtre, un seul critère, critères combinés).
    - `frontend/src/app/Financements.tsx` (modifié) — `datalist` sur les champs Poste/Financeur, sélecteurs de filtre poste/financeur/mois, rendu filtré de la liste.
    - `e2e/demo.spec.ts` (complété) — étape « Je filtre la liste par poste » (démonstration, hors DoD).
    - `ITERATIONS.md` (complété) — temps restant à l'itération 3, Bilan.

---

## Itération 4 : Habillage visuel des écrans Qui êtes-vous ? et Financements

- **Dans le périmètre** :
  - Mise en forme de l'écran Financements : tableau plutôt que liste brute, espacements, mise en évidence visuelle (couleur) des lignes en double financement, style cohérent des filtres et du formulaire.
  - Petits ajustements de l'écran persona existant si besoin de cohérence visuelle (mêmes couleurs/typographie), sans changer son comportement.
- **Hors périmètre** : toute nouvelle fonctionnalité ; dépendance de composants UI externe (reste en CSS natif / modules CSS déjà utilisés par le projet).
- **Critères d'acceptation** :
  - Étant donné l'écran Financements, quand il s'affiche, alors les lignes sont présentées en tableau lisible (pas une liste à puces brute).
  - Étant donné une ligne en double financement, quand la liste s'affiche, alors elle se distingue visuellement (couleur/fond), en plus du texte déjà présent.
  - Étant donné les deux écrans, quand on passe de l'un à l'autre, alors l'apparence (typographie, couleurs, espacements) est cohérente.
- **Hypothèse de l'équipe couverte** : aucune — confort visuel, pas une des hypothèses mesurées.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : `frontend/src/app/page.module.css` (ou nouveau `Financements.module.css`), `Financements.tsx` (classes), `page.tsx` (classes si ajustement de cohérence).
- **Tests unitaires prévus** : aucun — pur style/balisage, pas de logique métier (cohérent avec les conventions de test du projet).
- **Étapes ajoutées à la démo** : aucune nouvelle étape fonctionnelle ; la démo existante a dû être corrigée (voir Écart non prévu) pour continuer de passer sur le nouveau balisage.
- **Bilan** :
  - **Temps restant annoncé avant l'itération 4** : 15 à 30 minutes (question posée le 2026-11-18). Suffisant pour cette itération (habillage, ~8 min de codage visés) suivie d'un tour de test, sans ouvrir de nouveau périmètre après.
  - **Déclencheur** : le développeur a signalé que le visuel de l'accueil était « loupé » (capture d'écran à l'appui) — bug visible dès l'écran Financements, qui correspondait exactement au périmètre déjà planifié de cette itération.
  - **Durée de codage réelle** : 2 minutes (budget 8-10 min, aucun dépassement, alarme non déclenchée).
  - **Cause du bug signalé** : `Financements.tsx` réutilisait les classes `.page`/`.main` de `page.module.css`, qui fixent `min-height: 100vh`. Imbriqué dans le conteneur `.page` déjà plein écran de `page.tsx`, cela empilait un second écran plein vide sous la carte persona (le grand vide noir de la capture).
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés par capture d'écran (Playwright, local et en mode sombre) : écran Financements en tableau HTML (plus de liste à puces), lignes en double financement surlignées en rouge/rose (clair et sombre), apparence (carte, typographie, couleurs) cohérente entre l'écran persona et l'écran Financements.
  - **Reporté** : rien de cette itération.
  - **Bloqué ou refusé par le harnais** : rien — `verifier-deployabilite.sh` ne signale aucune borne, `npm test` passe (8 tests, inchangé : pas de nouvelle logique métier), `signaler-version.sh 4` accepté.
  - **Écart non prévu** : le changement de balisage (liste → tableau) cassait le sélecteur `page.locator("li")` de `e2e/demo.spec.ts` — corrigé en `page.locator("tbody tr")`, démo revérifiée verte en local.
  - **Modifications** :
    - `frontend/src/app/page.module.css` (modifié) — `.page` passe de `justify-content: center` à `padding`/`gap`, pour empiler plusieurs cartes sans vide plein écran ; sert le 3ᵉ critère.
    - `frontend/src/app/Financements.module.css` (nouveau) — style de carte, formulaire, filtres et tableau propres à l'écran Financements (au lieu de réutiliser `page.module.css`) ; sert les 1ᵉʳ, 2ᵉ et 3ᵉ critères.
    - `frontend/src/app/Financements.tsx` (modifié) — remplace la liste à puces par un `<table>`, retire l'imbrication `.page`/`.main` qui causait le bug signalé ; sert les 1ᵉʳ et 2ᵉ critères.
    - `e2e/demo.spec.ts` (corrigé) — sélecteur de ligne adapté au tableau (`tbody tr` au lieu de `li`).
    - `ITERATIONS.md` (complété) — temps restant à l'itération 4, Bilan.

---

⚠️ **Replanification après l'itération 4** : temps restant annoncé 15 à 30 minutes au début de cette itération, déjà entamé par le codage (2 min), la publication et le tour de test PM Lab à venir. Avec un coût minimum d'environ 25 minutes par itération complète (codage + publication + tour de test), **il ne reste probablement pas de marge pour une itération 5 complète** : propose de consacrer le temps restant à vérifier `$URL_PUBLIQUE/health` et `/sante` et à stabiliser ce qui est déjà en ligne pour le pitch, plutôt qu'ouvrir un nouveau périmètre (« Profils salariés » ci-dessous). À confirmer en demandant à nouveau le temps restant avant toute nouvelle itération.

---

## Itération 5 : Données fictives de démonstration sur l'écran Financements

- **Source** : demande nouvelle du développeur, taillée en itération (pas codée directement), validée par ses réponses aux questions de cadrage : il veut ces données comme état de départ dans le code (visibles de tous, y compris au tour de test PM Lab et au pitch), pas une vérification locale éphémère.
- **Temps restant annoncé** : 10 à 20 minutes (question posée le 2026-11-18). ⚠️ Trop court pour une itération complète avec tour de test PM Lab après (coût minimum ~25 min) : traitée comme la **dernière itération avant le pitch**, consacrée à la stabilisation de la démo plutôt qu'à un nouveau tour de test complet.
- **Dans le périmètre** :
  - Une dizaine de lignes fictives pré-chargées dans l'état initial de l'écran Financements (poste, financeur, mois, montant), couvrant plusieurs postes/financeurs/mois différents.
  - Au moins une paire de lignes en double financement (même poste, même mois), pour démontrer le surlignage sans action de l'utilisateur.
- **Hors périmètre** : persistance en base, bouton de réinitialisation, désactivation de la saisie manuelle (qui reste possible en plus des lignes fictives).
- **Critères d'acceptation** :
  - Étant donné l'écran Financements, quand il s'affiche sans aucune saisie, alors au moins 8 lignes fictives apparaissent déjà dans le tableau.
  - Étant donné ces lignes fictives, quand la page s'affiche, alors au moins une paire se distingue visuellement comme double financement.
  - Étant donné ces lignes fictives, quand on saisit une nouvelle ligne ou qu'on filtre, alors le formulaire et les filtres fonctionnent toujours normalement.
- **Codage estimé** : 5 minutes.
- **Fichiers prévus** : `frontend/src/app/financements.ts` (constante de données fictives), `frontend/src/app/Financements.tsx` (état initial).
- **Tests unitaires prévus** : aucun — données statiques, pas de nouvelle logique métier (cohérent avec l'itération 4).
- **Bilan** :
  - **Durée de codage réelle** : 2 minutes (budget 5 min, aucun dépassement).
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés par capture d'écran (10 lignes fictives visibles dès l'ouverture de l'écran, reprenant postes et financeurs du prototype de passation `passation/prototype/index.html` ; une paire en double financement surlignée sans aucune saisie), et par la démo Playwright rejouée contre le déploiement (`localhost:8080`) qui ajoute encore des lignes et filtre, donc confirme que saisie et filtres restent fonctionnels avec les données fictives déjà présentes.
  - **Reporté** : rien.
  - **Bloqué ou refusé par le harnais** : rien — `verifier-deployabilite.sh` ne signale aucune borne, `npm test` passe (8 tests, inchangé : données statiques, pas de nouvelle logique), `signaler-version.sh 5` accepté.
  - **Écart non prévu** : la démo `e2e/demo.spec.ts` comptait exactement 2 occurrences de « double financement » après l'ajout de ses propres lignes de test ; avec le doublon désormais déjà présent dans les données fictives, ce compte global n'était plus exact — corrigé en ciblant spécifiquement les lignes « Coordinateur Carillon » ajoutées par le scénario.
  - **Modifications** :
    - `frontend/src/app/financements.ts` (modifié) — ajoute la constante `lignesDemo` (10 lignes fictives, dont une paire en doublon) ; sert les 1ᵉʳ et 2ᵉ critères.
    - `frontend/src/app/Financements.tsx` (modifié) — état initial de la liste réglé sur `lignesDemo` au lieu d'un tableau vide ; sert les 1ᵉʳ et 2ᵉ critères.
    - `e2e/demo.spec.ts` (corrigé) — assertion de doublon ciblée sur les lignes du scénario, pour ne plus dépendre du nombre total de doublons affichés.
    - `ITERATIONS.md` (complété) — section Itération 5, Bilan.

---

## Itération 6 : Taux de couverture par poste (version minimale)

- **Source** : demande nouvelle du développeur, qui a montré l'ensemble du prototype de passation (tableau de bord, fiche poste, imputations mensuelles, justificatif) en disant que l'écran Financements seul « ne répond pas aux exigences ». ✂️ Tout ce périmètre ne tient pas dans le temps restant : taillé en un seul morceau maintenant (ce que le développeur a choisi explicitement), le reste documenté ci-dessous pour après le build.
- **Temps restant annoncé** : moins de 15 minutes (question posée le 2026-11-18). Traitée comme la dernière itération avant le pitch : un seul petit écran, pas de tour de test complet après.
- **Dans le périmètre** :
  - Un coût annuel de référence par poste (constante, reprenant les montants visibles dans le prototype pour les 4 postes déjà utilisés par les données fictives de l'itération 5).
  - Un tableau de bord simple (persona « directrice du développement et des partenariats », jusqu'ici sans écran fonctionnel) : pour chaque poste, un taux de couverture = somme des montants déjà financés (toutes lignes fictives confondues) / coût annuel, avec un code couleur (vert ≥100 %, orange 70-99 %, rouge <70 %).
  - Fonction de calcul pure et testée.
- **Hors périmètre, reporté explicitement** (❗️ simplifications assumées faute de temps) :
  - **Profils salariés** (ETP, heures réalisées) : non saisis, donc le taux affiché est une approximation (somme brute des montants / coût annuel), pas le calcul mensuel du prototype.
  - **Date de falaise**, **alertes 6 mois/3 mois**, **simulateur de départ** : nécessitent la notion de période/échéance de convention, absente du modèle actuel.
  - **Imputations mensuelles en tableau mois × financeur avec % de dépassement** (capture « Double financement détecté · mai 2025 ») : le signal de doublon actuel reste binaire (itération 2), pas transformé en vue mensuelle.
  - **Génération de justificatif par financeur** : sans fiche poste détaillée ni imputations mensuelles en amont, cet écran n'aurait rien de réel à exporter.
  - Le tableau de bord lit les données fictives fixes de l'itération 5, pas l'état saisi en direct dans l'écran Financements (pas de partage d'état entre les deux écrans dans ce budget).
- **Critères d'acceptation** :
  - Étant donné le persona « directrice du développement et des partenariats » sélectionné, quand l'écran s'affiche, alors chaque poste montre son taux de couverture en %.
  - Étant donné un taux ≥100 %, 70-99 % ou <70 %, alors le poste s'affiche respectivement en vert, orange ou rouge.
  - Le calcul du taux de couverture est une fonction pure, couverte par 2 à 3 tests Vitest (seuils des 3 couleurs).
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/app/couverture.ts` (nouveau), `frontend/src/app/couverture.test.ts` (nouveau), `frontend/src/app/TableauDeBord.tsx` (nouveau), `frontend/src/app/TableauDeBord.module.css` (nouveau), `frontend/src/app/page.tsx` (branchement).
- **Bilan** :
  - **Durée de codage réelle** : 1 minute (budget 8 min, aucun dépassement).
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés par capture d'écran (persona Claire Moreau → les 4 postes affichent un taux en %, avec rouge/orange selon les seuils ; aucun n'atteint 100 % avec les données fictives actuelles, donc le vert n'a pas pu être vérifié visuellement mais l'est par les tests unitaires) et par `npm test` (11 tests, dont 5 nouveaux sur `calculerTauxCouverture`/`niveauCouverture`, seuils des 3 couleurs couverts).
  - **Reporté** : l'ensemble documenté ci-dessus en « Hors périmètre » (profils salariés, date de falaise, alertes, imputations mensuelles en %, simulateur, justificatif) — repris et détaillé dans « À venir ».
  - **Bloqué ou refusé par le harnais** : rien — `verifier-deployabilite.sh` ne signale aucune borne, `npm test` passe, `signaler-version.sh 6` accepté.
  - **Modifications** :
    - `frontend/src/app/couverture.ts` (nouveau) — coûts annuels de référence par poste, `calculerTauxCouverture`, `niveauCouverture` ; sert les 3 critères.
    - `frontend/src/app/couverture.test.ts` (nouveau) — 5 tests Vitest (calcul, poste inconnu, 3 seuils de couleur).
    - `frontend/src/app/TableauDeBord.tsx` (nouveau) — écran de couverture par poste pour la persona « directrice du développement et des partenariats ».
    - `frontend/src/app/TableauDeBord.module.css` (nouveau) — style cohérent avec les cartes existantes.
    - `frontend/src/app/page.tsx` (modifié) — branche `TableauDeBord` sur la seconde persona, jusqu'ici sans écran fonctionnel.
    - `ITERATIONS.md` (complété) — section Itération 6, Bilan, « À venir » détaillé.

## À venir (non détaillé, ordre de priorité de l'équipe — reprend après les itérations 3, 4, 5 et 6)

1. Profils salariés (sheet 2) : saisie du salaire, de l'ETP et du suivi d'heures par poste — pour remplacer l'approximation de couverture de l'itération 6 par le vrai calcul du prototype.
2. Imputations mensuelles : vue mois × financeur par poste, avec détection du dépassement en % (et non plus un simple signal binaire).
3. Date de falaise, calculée à partir des conventions de financement (échéances), et alertes 6 mois / 3 mois pour la directrice du développement et des partenariats.
4. Simulateur de falaise : recalcul à partir de date de départ, durée de vacance, coût du remplaçant.
5. Export du justificatif par financeur en un clic, une fois la fiche poste et les imputations mensuelles disponibles.
