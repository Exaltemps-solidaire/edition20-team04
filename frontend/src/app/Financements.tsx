"use client";

import { FormEvent, useState } from "react";
import { detecterDoublons, LigneFinancement } from "./financements";
import styles from "./page.module.css";

export function Financements() {
  const [lignes, setLignes] = useState<LigneFinancement[]>([]);
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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Financements</h1>
        <form onSubmit={ajouterLigne}>
          <input name="poste" placeholder="Poste" required />
          <input name="financeur" placeholder="Financeur" required />
          <input name="mois" placeholder="Mois (AAAA-MM)" required />
          <input name="montant" type="number" placeholder="Montant" required />
          <button type="submit">Ajouter</button>
        </form>
        <ul>
          {lignes.map((ligne, index) => (
            <li key={index} data-doublon={doublons.has(index)}>
              {ligne.poste} · {ligne.financeur} · {ligne.mois} · {ligne.montant} €
              {doublons.has(index) && <strong> — double financement</strong>}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
