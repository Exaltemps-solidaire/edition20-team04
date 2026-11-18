"use client";

import { FormEvent, useState } from "react";
import {
  correspondAuxFiltres,
  detecterDoublons,
  FiltresFinancement,
  LigneFinancement,
  valeursDistinctes,
} from "./financements";
import styles from "./page.module.css";

export function Financements() {
  const [lignes, setLignes] = useState<LigneFinancement[]>([]);
  const [filtres, setFiltres] = useState<FiltresFinancement>({});
  const doublons = detecterDoublons(lignes);

  function ajouterLigne(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    const formulaire = new FormData(evenement.currentTarget);
    setLignes([
      ...lignes,
      {
        poste: String(formulaire.get("poste") ?? ""),
        financeur: String(formulaire.get("financeur") ?? ""),
        mois: String(formulaire.get("mois") ?? ""),
        montant: Number(formulaire.get("montant") ?? 0),
      },
    ]);
    evenement.currentTarget.reset();
  }

  function majFiltre(champ: keyof FiltresFinancement, valeur: string) {
    setFiltres({ ...filtres, [champ]: valeur || undefined });
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Financements</h1>
        <form onSubmit={ajouterLigne}>
          <input name="poste" placeholder="Poste" list="postes-connus" required />
          <datalist id="postes-connus">
            {valeursDistinctes(lignes, "poste").map((valeur) => (
              <option key={valeur} value={valeur} />
            ))}
          </datalist>

          <input name="financeur" placeholder="Financeur" list="financeurs-connus" required />
          <datalist id="financeurs-connus">
            {valeursDistinctes(lignes, "financeur").map((valeur) => (
              <option key={valeur} value={valeur} />
            ))}
          </datalist>

          <input name="mois" placeholder="Mois (AAAA-MM)" required />
          <input name="montant" type="number" placeholder="Montant" required />
          <button type="submit">Ajouter</button>
        </form>

        <div role="group" aria-label="Filtres">
          <label>
            Poste
            <select
              aria-label="Filtrer par poste"
              value={filtres.poste ?? ""}
              onChange={(e) => majFiltre("poste", e.target.value)}
            >
              <option value="">Tous</option>
              {valeursDistinctes(lignes, "poste").map((valeur) => (
                <option key={valeur} value={valeur}>
                  {valeur}
                </option>
              ))}
            </select>
          </label>
          <label>
            Financeur
            <select
              aria-label="Filtrer par financeur"
              value={filtres.financeur ?? ""}
              onChange={(e) => majFiltre("financeur", e.target.value)}
            >
              <option value="">Tous</option>
              {valeursDistinctes(lignes, "financeur").map((valeur) => (
                <option key={valeur} value={valeur}>
                  {valeur}
                </option>
              ))}
            </select>
          </label>
          <label>
            Mois
            <select
              aria-label="Filtrer par mois"
              value={filtres.mois ?? ""}
              onChange={(e) => majFiltre("mois", e.target.value)}
            >
              <option value="">Tous</option>
              {valeursDistinctes(lignes, "mois").map((valeur) => (
                <option key={valeur} value={valeur}>
                  {valeur}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul>
          {lignes.map((ligne, index) => {
            if (!correspondAuxFiltres(ligne, filtres)) return null;
            return (
              <li key={index} data-doublon={doublons.has(index)}>
                {ligne.poste} · {ligne.financeur} · {ligne.mois} · {ligne.montant} €
                {doublons.has(index) && <strong> — double financement</strong>}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
