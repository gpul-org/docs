import React, {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const events = [
  {
    title: 'HackUDC',
    description: 'O maior hackathon de Galicia, organizado por GPUL cada ano.',
    url: 'https://hackudc.gpul.org',
    date: 'Febreiro 2025',
    status: 'Próximamente',
    logo: {
      light: '/assets/images/logos/logo_hackudc_black.png',
      dark: '/assets/images/logos/logo_hackudc_white.png',
      alt: 'HackUDC Logo',
    },
  },
  {
    title: 'AtlánticaConf',
    description: 'Conferencia de tecnoloxía e innovación do noroeste peninsular.',
    url: 'https://atlanticaconf.com',
    date: '2027',
    status: 'Próximamente',
    logo: {
      light: '/assets/images/logos/logo_atlantica_blue.png',
      dark: '/assets/images/logos/logo_atlantica_white.png',
      alt: 'AtlánticaConf Logo',
    },
  },
  {
    title: 'GPUL Schools',
    description: 'Cursos e talleres sobre tecnoloxías libres e emerxentes.',
    url: 'https://school.gpul.org',
    date: 'Todo o ano',
    status: 'Activo',
    logo: {
      light: '/assets/images/logos/logo_school.png',
      dark: '/assets/images/logos/logo_school.png',
      alt: 'GPUL Schools Logo',
    },
  },
];

export default function Events(): ReactNode {
  return (
    <section className={styles.events}>
      <div className="container">
        <h2 className={styles.title}>Os nosos eventos</h2>
        <div className={styles.grid}>
          {events.map((event, idx) => (
            <div key={idx} className={`card ${styles.card}`}>
              <div className={styles.cardHeader}>
                <img 
                  src={event.logo.light} 
                  alt={event.logo.alt}
                  className={`${styles.logo} ${styles.logoLight}`}
                />
                <img 
                  src={event.logo.dark} 
                  alt={event.logo.alt}
                  className={`${styles.logo} ${styles.logoDark}`}
                />
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <span className={`badge badge--${event.status === 'Activo' ? 'success' : 'secondary'}`}>
                  {event.status}
                </span>
              </div>
              <div className={styles.cardBody}>
                <p>{event.description}</p>
                <p><strong>📅 {event.date}</strong></p>
              </div>
              <div className={styles.cardFooter}>
                <Link
                  className="button button--outline button--primary button--sm"
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  Máis info
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 