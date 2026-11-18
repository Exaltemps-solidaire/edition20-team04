export type Persona = {
  id: string;
  nom: string;
  role: string;
};

// Les deux acteurs du scénario retenu par l'équipe (passation/cadrage/3-solution.md) :
// aucune connexion dans cette version, on incarne un persona depuis une liste fixe.
export const personas: Persona[] = [
  {
    id: "gestion-administrative-financiere",
    nom: "Amina Diallo",
    role: "Gestion administrative et financière",
  },
  {
    id: "directrice-developpement-partenariats",
    nom: "Claire Moreau",
    role: "Directrice du développement et des partenariats",
  },
];
