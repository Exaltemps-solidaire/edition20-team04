import { LigneFinancement } from "./financements";

// Coûts annuels de référence (prototype de passation), pour les 4 postes des données fictives.
export const coutAnnuelParPoste: Record<string, number> = {
  "Coordinatrice Île-de-France": 29600,
  "Responsable Carillon national": 38400,
  "Chargé·e de formation": 32800,
  "Coordinatrice Marseille": 22200,
};

export type NiveauCouverture = "ok" | "risque" | "alerte";

export function calculerTauxCouverture(lignes: LigneFinancement[], poste: string, coutAnnuel: number): number {
  const total = lignes.filter((ligne) => ligne.poste === poste).reduce((somme, ligne) => somme + ligne.montant, 0);
  if (coutAnnuel <= 0) return 0;
  return Math.round((total / coutAnnuel) * 100);
}

export function niveauCouverture(tauxPourcent: number): NiveauCouverture {
  if (tauxPourcent >= 100) return "ok";
  if (tauxPourcent >= 70) return "risque";
  return "alerte";
}
