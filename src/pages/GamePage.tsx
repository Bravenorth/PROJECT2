import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Character } from '../models/characterModel';
import { cloneCharacter } from '../models/characterModel';
import CharacterStatsUI from '../components/Character/CharacterStatsUI';
import CharacterEquipmentUI from '../components/Character/CharacterEquipmentUI';
import CombatZoneSelector from '../components/Combat/CombatZoneSelector';
import CharacterInventoryUI from '../components/Character/CharacterInventoryUI';
import { characterService } from '../services/characterService';
import {
  equipItemFromInventory,
  unequipItemToInventory,
  type EquipmentSlot
} from '../models/itemModel';

export default function GamePage() {
  const location = useLocation();
  const initialChar = location.state?.character as Character | undefined;

  const [charData, setCharData] = useState<Character | undefined>(initialChar);

  // 🚚 Always fetch the latest character from the service so that refreshing the
  // page keeps any equipment/inventory changes persisted in localStorage.
  useEffect(() => {
    async function loadCharacter() {
      const id = await characterService.getActiveId();
      if (id === null) return;
      const all = await characterService.getAll();
      const latest = all.find((c) => c.id === id);
      if (latest) setCharData(latest);
    }

    loadCharacter();
  }, []);

  if (!charData) {
    return (
      <p style={{ color: '#f66', padding: '1rem' }}>
        ❌ Aucun personnage sélectionné. Retournez à l&apos;accueil.
      </p>
    );
  }

  const equipFromInventory = (index: number) => {
    if (!charData) return;
    const clone = cloneCharacter(charData);
    if (equipItemFromInventory(clone, index)) {
      setCharData(clone);
      characterService.update(clone);
    }
  };

  const unequipToInventory = (slot: EquipmentSlot) => {
    if (!charData) return;
    const clone = cloneCharacter(charData);
    if (unequipItemToInventory(clone, slot)) {
      setCharData(clone);
      characterService.update(clone);
    }
  };

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
        🎮 En jeu avec <span style={{ color: '#0f0' }}>{charData.name}</span>
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
          <CharacterStatsUI character={charData} />
        </div>

        {/* Bloc équipement */}
        <div style={{ flexShrink: 0 }}>
          <CharacterEquipmentUI equipment={charData.equipment} onUnequip={unequipToInventory} />
          <CharacterInventoryUI inventory={charData.inventory} onEquip={equipFromInventory} />
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
