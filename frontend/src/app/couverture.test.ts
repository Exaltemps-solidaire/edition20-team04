import { describe, expect, it } from "vitest";
import { calculerTauxCouverture, niveauCouverture } from "./couverture";

describe("calculerTauxCouverture", () => {
  it("additionne les montants du poste et les rapporte au coût annuel", () => {
    const lignes = [
      { poste: "Coordinatrice Marseille", financeur: "Ville de Marseille", mois: "2025-09", montant: 6000 },
      { poste: "Coordinatrice Marseille", financeur: "Fondation Apprentis d'Auteuil", mois: "2025-10", montant: 6000 },
      { poste: "Autre poste", financeur: "X", mois: "2025-09", montant: 9999 },
    ];
    expect(calculerTauxCouverture(lignes, "Coordinatrice Marseille", 12000)).toBe(100);
  });

  it("retourne 0 pour un poste sans ligne", () => {
    expect(calculerTauxCouverture([], "Poste inconnu", 10000)).toBe(0);
  });
});

describe("niveauCouverture", () => {
  it("classe en ok à partir de 100 %", () => {
    expect(niveauCouverture(100)).toBe("ok");
    expect(niveauCouverture(130)).toBe("ok");
  });

  it("classe en risque entre 70 et 99 %", () => {
    expect(niveauCouverture(70)).toBe("risque");
    expect(niveauCouverture(99)).toBe("risque");
  });

  it("classe en alerte en dessous de 70 %", () => {
    expect(niveauCouverture(69)).toBe("alerte");
    expect(niveauCouverture(0)).toBe("alerte");
  });
});
