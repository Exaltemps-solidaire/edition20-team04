"use client";

import { useState } from "react";
import { Financements } from "./Financements";
import { personas } from "./personas";
import styles from "./page.module.css";

export default function Home() {
  const [personaId, setPersonaId] = useState<string | null>(null);
  const persona = personas.find((p) => p.id === personaId) ?? null;

  if (persona) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p className={styles.eyebrow}>Vous incarnez</p>
          <h1>{persona.nom}</h1>
          <p className={styles.role}>{persona.role}</p>
          <button
            type="button"
            className={styles.changer}
            onClick={() => setPersonaId(null)}
          >
            Changer de persona
          </button>
        </main>
        {persona.id === "gestion-administrative-financiere" && <Financements />}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Qui êtes-vous ?</h1>
        <ul className={styles.liste}>
          {personas.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={styles.persona}
                onClick={() => setPersonaId(p.id)}
              >
                <span className={styles.nom}>{p.nom}</span>
                <span className={styles.role}>{p.role}</span>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
