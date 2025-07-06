import React, {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const years = new Date(Date.now() - new Date(1998, 5, 22)).getUTCFullYear() - 1970

export default function Intro(): ReactNode {
  return (
    <section className={styles.intro}>
      <div className="container">
        <h2 className={styles.title}>{yearsSince} anos promovendo a cultura libre</h2>
        <div className={styles.content}>
          <p>
            Toda unha vida apoiando a tecnoloxía libre, facendo activismo e
            mostrándolle cada día a máis xente o importante que é para a
            sociedade.
          </p>
          <div className="margin-top--lg">
            <Link
              className="button button--outline button--primary button--lg"
              to="/docs/about/estatutos">
              Estatutos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
