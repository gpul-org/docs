import React, {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const activities = [
  {
    title: 'Software libre',
    description:
      'Ver e reutilizar o código é fundamental para aprender, para estar seguros de ter privacidade e para mellorar o software.',
  },
  {
    title: 'Hardware libre',
    description:
      'Igual que no software, no hardware tamén se poden publicar os planos e deseños para democratizar o acceso a tecnoloxía.',
  },
  {
    title: 'Coñecemento libre',
    description:
      'Non nos podemos olvidar da importancia de compartir coñecemento libremente, sen restricións, mellorando a sociedade.',
  },
];

export default function Activities(): ReactNode {
  return (
    <section className={styles.activities}>
      <div className="container">
        <h2 className={styles.title}>A qué nos dedicamos</h2>
        <div className={styles.grid}>
          {activities.map((activity, idx) => (
            <div key={idx} className="card">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
