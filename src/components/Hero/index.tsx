import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Hero(): ReactNode {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroLogo}>
          <img src="/img/logo-old.svg" alt="GPUL old logo" className={styles.logo} />
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/events">
            Eventos
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            Blog
          </Link>
        </div>
      </div>
    </header>
  );
} 