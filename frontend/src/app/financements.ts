export type LigneFinancement = {
  poste: string;
  financeur: string;
  mois: string;
  montant: number;
};

// Données fictives de démonstration (Itération 5), reprenant les postes et financeurs du prototype de passation.
export const lignesDemo: LigneFinancement[] = [
  { poste: "Coordinatrice Île-de-France", financeur: "Ville de Paris – Mission Solidarité", mois: "2025-09", montant: 4200 },
  { poste: "Coordinatrice Île-de-France", financeur: "Fondation Apprentis d'Auteuil", mois: "2025-09", montant: 3100 },
  { poste: "Coordinatrice Île-de-France", financeur: "DREETS Île-de-France", mois: "2025-10", montant: 2600 },
  { poste: "Responsable Carillon national", financeur: "Fondation de France", mois: "2025-09", montant: 3800 },
  { poste: "Responsable Carillon national", financeur: "SNANC", mois: "2025-11", montant: 3200 },
  { poste: "Chargé·e de formation", financeur: "DREETS Île-de-France", mois: "2025-10", montant: 2100 },
  { poste: "Chargé·e de formation", financeur: "Région Île-de-France", mois: "2025-12", montant: 1900 },
  { poste: "Coordinatrice Marseille", financeur: "Ville de Marseille", mois: "2025-09", montant: 2900 },
  { poste: "Coordinatrice Marseille", financeur: "Fondation Apprentis d'Auteuil", mois: "2026-01", montant: 3000 },
  { poste: "Responsable Carillon national", financeur: "Fondation de France", mois: "2026-02", montant: 3500 },
];

export function detecterDoublons(lignes: LigneFinancement[]): Set<number> {
  const indicesParCle = new Map<string, number[]>();
  lignes.forEach((ligne, index) => {
    const cle = `${ligne.poste}|${ligne.mois}`;
    const indices = indicesParCle.get(cle) ?? [];
    indices.push(index);
    indicesParCle.set(cle, indices);
  });

  const doublons = new Set<number>();
  for (const indices of indicesParCle.values()) {
    if (indices.length > 1) {
      indices.forEach((index) => doublons.add(index));
    }
  }
  return doublons;
}

export type FiltresFinancement = {
  poste?: string;
  financeur?: string;
  mois?: string;
};

export function correspondAuxFiltres(ligne: LigneFinancement, filtres: FiltresFinancement): boolean {
  if (filtres.poste && ligne.poste !== filtres.poste) return false;
  if (filtres.financeur && ligne.financeur !== filtres.financeur) return false;
  if (filtres.mois && ligne.mois !== filtres.mois) return false;
  return true;
}

export function valeursDistinctes(
  lignes: LigneFinancement[],
  champ: "poste" | "financeur" | "mois",
): string[] {
  return Array.from(new Set(lignes.map((ligne) => ligne[champ]))).sort();
}
