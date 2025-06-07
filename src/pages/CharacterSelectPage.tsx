import React, { useEffect, useState } from 'react';
import { characterService } from '../services/characterService';
import type { Character } from '../models/characterModel';
import CharacterList from '../components/CharacterList/CharacterList';
import { useNavigate } from 'react-router-dom';

export default function CharacterSelectPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [list, active] = await Promise.all([
        characterService.getAll(),
        characterService.getActiveId()
      ]);
      setCharacters(list);
      setActiveId(active);
      setLoading(false);
    }
    loadData();
  }, []);

  const navigate = useNavigate();

  const createCharacter = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed || isCreating) return;

    setIsCreating(true);
    try {
      const newChar = await characterService.create(trimmed);
      setCharacters((prev) => [...prev, newChar]);
      setNameInput('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const selectCharacter = async (id: number) => {
    await characterService.setActive(id);
    setActiveId(id);
  };

  const deleteCharacter = async (id: number) => {
    const character = characters.find((c) => c.id === id);
    const userConfirmed = window.confirm(
      `🗑️ Supprimer le personnage "${character?.name}" ? Cette action est irréversible.`
    );
    if (!userConfirmed) return;

    await characterService.delete(id);
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    if (id === activeId) {
      setActiveId(null);
    }
  };

  const play = () => {
  const selected = characters.find((c) => c.id === activeId);
  if (selected) {
    navigate('/game', { state: { character: selected } });
  }
};

  if (loading) return <p style={{ textAlign: 'center' }}>Chargement...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: 500, margin: '0 auto' }}>
      <h1>🎮 Choisir un personnage</h1>

      <CharacterList
        characters={characters}
        activeId={activeId}
        onSelect={selectCharacter}
        onDelete={deleteCharacter}
      />

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Nom du personnage"
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={createCharacter} disabled={isCreating}>
          {isCreating ? 'Création...' : 'Créer'}
        </button>
      </div>

      {activeId && (
        <div style={{ marginTop: '2rem' }}>
          <button onClick={play} style={{ padding: '0.5rem 1rem' }}>
            Jouer avec {characters.find((c) => c.id === activeId)?.name}
          </button>
        </div>
      )}
    </div>
  );
}
