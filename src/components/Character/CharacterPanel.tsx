// src/components/Character/CharacterPanel.tsx
import { useState, useEffect } from 'react';
import { characterService } from '../../services/characterService';
import { equipItemFromInventory, unequipItemToInventory } from '../../gameServer/itemModel';
import CharacterInventoryUI from './CharacterInventoryUI';
import CharacterEquipmentUI from './CharacterEquipmentUI';

export default function CharacterPanel() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    characterService.getAll().then((chars) => {
      setCharacter(chars[0]); // charge le premier perso existant
    });
  }, []);

  const handleEquip = (index: number) => {
    if (!character) return;
    const clone = structuredClone(character);
    if (equipItemFromInventory(clone, index)) {
      setCharacter(clone);
    }
  };

  const handleUnequip = (slot) => {
    if (!character) return;
    const clone = structuredClone(character);
    if (unequipItemToInventory(clone, slot)) {
      setCharacter(clone);
    }
  };

  if (!character) return <p>Chargement...</p>;

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', background: '#111', color: '#0f0' }}>
      <CharacterEquipmentUI equipment={character.equipment} onUnequip={handleUnequip} />
      <CharacterInventoryUI inventory={character.inventory} onEquip={handleEquip} />
    </div>
  );
}
