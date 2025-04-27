import React from 'react';
import Layout from '@theme/Layout';
import type {ReactNode} from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Activities from '../components/Activities';
import CallToAction from '../components/CallToAction';
import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Benvido a GPUL"
      description="A vibrant community of technology enthusiasts and professionals">
      <main className={styles.main}>
        <Hero />
        <Intro />
        <Activities />
        <CallToAction />
      </main>
    </Layout>
  );
}
