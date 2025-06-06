import React from 'react';
import { Character } from '../../gameServer/characterModel';
import CharacterListItem from './CharacterListItem';

type Props = {
  characters: Character[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CharacterList({ characters, activeId, onSelect, onDelete }: Props) {
  return (
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {characters.map((char) => (
        <li key={char.id} style={{ marginBottom: '1rem' }}>
          <CharacterListItem
            character={char}
            isActive={char.id === activeId}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
