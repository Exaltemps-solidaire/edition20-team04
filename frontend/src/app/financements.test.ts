import { describe, expect, it } from "vitest";
import { correspondAuxFiltres, detecterDoublons } from "./financements";

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

describe("correspondAuxFiltres", () => {
  const ligne = { poste: "Coordinateur Carillon", financeur: "SNANC", mois: "2026-03", montant: 1000 };

  it("correspond toujours quand aucun filtre n'est actif", () => {
    expect(correspondAuxFiltres(ligne, {})).toBe(true);
  });

  it("filtre sur un seul critère (poste)", () => {
    expect(correspondAuxFiltres(ligne, { poste: "Coordinateur Carillon" })).toBe(true);
    expect(correspondAuxFiltres(ligne, { poste: "Chargée de lien social" })).toBe(false);
  });

  it("ne correspond que si tous les critères combinés correspondent", () => {
    expect(correspondAuxFiltres(ligne, { poste: "Coordinateur Carillon", financeur: "SNANC" })).toBe(true);
    expect(correspondAuxFiltres(ligne, { poste: "Coordinateur Carillon", financeur: "Fondation de France" })).toBe(
      false,
    );
  });
});
