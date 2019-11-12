import React from 'react';
import { Header } from '../../components/Header/Header';
import './UnitEditor.scss';
import { UnitInfo } from './UnitInfo';
import { StatsAndAttributes } from './StatsAndAttributes';

export const UnitEditor = () => {
  return (
    <>
      <Header title="Anti-Materiel" subtitle="Unit Editor" />
      <main>
        <UnitInfo />
        <StatsAndAttributes />
      </main>
    </>
  );
};
