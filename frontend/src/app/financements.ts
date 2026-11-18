export type LigneFinancement = {
  poste: string;
  financeur: string;
  mois: string;
  montant: number;
};

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
