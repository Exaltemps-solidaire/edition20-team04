import { describe, expect, it } from "vitest";
import { detecterDoublons } from "./financements";

describe("detecterDoublons", () => {
  it("signale un doublon pour le même poste et le même mois", () => {
    const lignes = [
      { poste: "Coordinateur Carillon", financeur: "SNANC", mois: "2026-03", montant: 1000 },
      { poste: "Coordinateur Carillon", financeur: "Fondation de France", mois: "2026-03", montant: 500 },
    ];
    expect(detecterDoublons(lignes)).toEqual(new Set([0, 1]));
  });

  it("ne signale rien sur des mois différents pour le même poste", () => {
    const lignes = [
      { poste: "Coordinateur Carillon", financeur: "SNANC", mois: "2026-03", montant: 1000 },
      { poste: "Coordinateur Carillon", financeur: "Fondation de France", mois: "2026-04", montant: 500 },
    ];
    expect(detecterDoublons(lignes)).toEqual(new Set());
  });

  it("ne signale rien sur des postes différents pour le même mois", () => {
    const lignes = [
      { poste: "Coordinateur Carillon", financeur: "SNANC", mois: "2026-03", montant: 1000 },
      { poste: "Chargée de lien social", financeur: "Fondation de France", mois: "2026-03", montant: 500 },
    ];
    expect(detecterDoublons(lignes)).toEqual(new Set());
  });
});
