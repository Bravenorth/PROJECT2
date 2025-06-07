import React from 'react';
import type { Character } from '../../models/characterModel';

export type CharacterListProps = {
  characters: Character[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CharacterList({ characters, activeId, onSelect, onDelete }: CharacterListProps) {
  return (
    <div>
      {characters.map((char) => (
        <div
          key={char.id}
          style={{
            border: char.id === activeId ? '2px solid #4caf50' : '1px solid #ccc',
            padding: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <strong>{char.name}</strong>
          <div style={{ float: 'right' }}>
            <button onClick={() => onSelect(char.id)} style={{ marginRight: '0.5rem' }}>
              Sélectionner
            </button>
            <button onClick={() => onDelete(char.id)}>Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
}
