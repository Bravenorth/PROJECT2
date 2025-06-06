import React from 'react';
import { useLocation } from 'react-router-dom';
import type { Character } from '../gameServer/characterModel';
import CharacterStatsUI from '../components/Character/CharacterStatsUI';
import CharacterEquipmentUI from '../components/Character/CharacterEquipmentUI';
import CombatZoneSelector from '../components/Combat/CombatZoneSelector';
import CharacterInventoryUI from '../components/Character/CharacterInventoryUI';

export default function GamePage() {
  const location = useLocation();
  const character = location.state?.character as Character | undefined;

  if (!character) {
    return (
      <p style={{ color: '#f66', padding: '1rem' }}>
        ❌ Aucun personnage sélectionné. Retournez à l'accueil.
      </p>
    );
  }

  return (
    <div
      style={{
        height: '100vh',
        padding: '1rem',
        fontFamily: 'monospace',
        color: '#0f0',
        background: '#111',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden'
      }}
    >
      <h1 style={{ color: '#4fc3f7', fontSize: '1.2rem' }}>
        🎮 En jeu avec <span style={{ color: '#0f0' }}>{character.name}</span>
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          flexGrow: 1,
          minHeight: 0,
          overflow: 'hidden'
        }}
      >
        {/* Bloc stats */}
        <div style={{ flexShrink: 0 }}>
          <CharacterStatsUI character={character} />
        </div>

        {/* Bloc équipement */}
        <div style={{ flexShrink: 0 }}>
          <CharacterEquipmentUI />
          <CharacterInventoryUI />
        </div>

        {/* Bloc zone de combat */}
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            minWidth: 0
          }}
        >
          <CombatZoneSelector />
        </div>
      </div>

      <div style={{ fontSize: '0.75rem', color: '#888', flexShrink: 0 }}>
        <strong>Note :</strong> Cette page est une maquette. Les fonctionnalités sont en cours de
        développement.
      </div>
    </div>
  );
}
