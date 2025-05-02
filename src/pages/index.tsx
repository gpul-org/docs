import React from 'react';
import Layout from '@theme/Layout';
import type {ReactNode} from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Activities from '../components/Activities';
import Board from '../components/Board';
import CallToAction from '../components/CallToAction';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Benvido a GPUL"
      description="Organización sen ánimo de lucro promovendo o software libre, o hardware libre e o coñecemento aberto desde 1998.">
      <main>
        <Hero />
        <Intro />
        <Activities />
        <Board />
        <CallToAction />
      </main>
    </Layout>
  );
}
