import React from 'react';
import { Character } from '../../gameServer/characterModel';
import CharacterStatsDisplay from './CharacterStatsDisplay';

type Props = {
  character: Character;
  isActive: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CharacterListItem({ character, isActive, onSelect, onDelete }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        onClick={() => onSelect(character.id)}
        style={{
          flexGrow: 1,
          padding: '0.5rem 1rem',
          background: isActive ? '#4caf50' : '#333',
          color: 'white',
          border: '1px solid #555',
          borderRadius: 4,
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <strong>{character.name}</strong>
        <CharacterStatsDisplay stats={character.stats} />
      </button>
      <button
        onClick={() => onDelete(character.id)}
        title="Supprimer"
        style={{
          marginLeft: '0.5rem',
          background: '#900',
          color: 'white',
          border: 'none',
          padding: '0.5rem',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        🗑️
      </button>
    </div>
  );
}
