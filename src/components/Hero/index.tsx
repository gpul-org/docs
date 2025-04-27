import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';
import type {ReactNode} from 'react';

export default function Hero(): ReactNode {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img className={styles.logo} src="/img/logo.svg" alt="GPUL Logo" />
        <h1 className={clsx('hero__title', styles.title)}>
          Grupo de Programadores e <br /> Usuarios de Linux
        </h1>
        <p className={clsx('hero__subtitle', styles.subtitle)}>
          Defendendo o software libre dende 1998
        </p>
        <div className="margin-top--lg">
          <Link
            className="button button--secondary button--lg margin-right--md"
            to="/docs/about/intro">
            Wiki
          </Link>
          <Link className="button button--secondary button--lg" to="/blog">
            Blog
          </Link>
        </div>
      </div>
    </header>
  );
}
