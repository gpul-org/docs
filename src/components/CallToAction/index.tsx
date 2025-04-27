import React, { ReactNode } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function CallToAction(): ReactNode {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>Únete á Nosa Comunidade</h2>
          <p className={styles.description}>
            Listo para formar parte de algo maior? Únete á nosa comunidade de
            entusiastas da tecnoloxía e comeza a túa viaxe connosco hoxe.
          </p>
          <div className="margin-top--lg">
            <Link className="button button--secondary button--lg" to="/contact">
              Comeza Agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
