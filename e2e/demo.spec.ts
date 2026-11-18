import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je choisis mon persona", async () => {
    await expect(page.getByRole("heading", { name: "Qui êtes-vous ?" })).toBeVisible();
    await page.getByRole("button", { name: /Amina Diallo/ }).click();
    await expect(page.getByRole("heading", { name: "Amina Diallo" })).toBeVisible();
  });

  await test.step("Je saisis deux lignes de financement sur le même poste et le même mois", async () => {
    await expect(page.getByRole("heading", { name: "Financements" })).toBeVisible();

    await page.getByPlaceholder("Poste").fill("Coordinateur Carillon");
    await page.getByPlaceholder("Financeur").fill("SNANC");
    await page.getByPlaceholder("Mois (AAAA-MM)").fill("2026-03");
    await page.getByPlaceholder("Montant").fill("1000");
    await page.getByRole("button", { name: "Ajouter" }).click();

    await page.getByPlaceholder("Poste").fill("Coordinateur Carillon");
    await page.getByPlaceholder("Financeur").fill("Fondation de France");
    await page.getByPlaceholder("Mois (AAAA-MM)").fill("2026-03");
    await page.getByPlaceholder("Montant").fill("500");
    await page.getByRole("button", { name: "Ajouter" }).click();

    await expect(page.getByText("double financement")).toHaveCount(2);
  });
});
