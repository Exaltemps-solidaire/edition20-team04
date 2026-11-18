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
