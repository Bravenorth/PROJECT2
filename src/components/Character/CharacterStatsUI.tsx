import React from 'react';
import type { Character } from '../../models/characterModel';
import CharacterStatsDisplay from '../CharacterList/CharacterStatsDisplay';

type Props = {
  character: Character;
};

export default function CharacterStatsUI({ character }: Props) {
  return (
    <section
      style={{
        border: '1px solid #0f0',
        borderRadius: 6,
        padding: '0.75rem',
        background: '#000',
        fontSize: '0.75rem',
        flexShrink: 0,
      }}
    >
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>🧍 {character.name}</h2>
      <CharacterStatsDisplay stats={character.stats} />
    </section>
  );
}
