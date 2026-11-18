import { calculerTauxCouverture, coutAnnuelParPoste, niveauCouverture } from "./couverture";
import { lignesDemo } from "./financements";
import styles from "./TableauDeBord.module.css";

export function TableauDeBord() {
  return (
    <section className={styles.card}>
      <h1>Couverture des postes</h1>
      <ul className={styles.liste}>
        {Object.entries(coutAnnuelParPoste).map(([poste, coutAnnuel]) => {
          const taux = calculerTauxCouverture(lignesDemo, poste, coutAnnuel);
          const niveau = niveauCouverture(taux);
          return (
            <li key={poste} className={styles.poste}>
              <span className={styles.nom}>{poste}</span>
              <span className={`${styles.taux} ${styles[niveau]}`}>{taux} %</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
