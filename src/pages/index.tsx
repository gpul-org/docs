import React from 'react';
import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';

import styles from './index.module.css';

function ComingSoon() {
  return (
    <section className={styles.comingSoon}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className="text--center">Próximamente</h2>
            <p className="text--center">
              ¡Estamos trabajando en algo emocionante! Mantente atento a las novedades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Grupo de Programadores e Usuarios de Linux. Fomentamos o uso de GNU/Linux, o Software e Hardware Libre e a cultura libre en xeral.">
      <Hero />
      <main>
        <ComingSoon />
      </main>
    </Layout>
  );
}
