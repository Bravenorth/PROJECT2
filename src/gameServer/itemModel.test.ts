import { createDefaultStats } from './characterModel';
import {
  Item,
  createEmptyEquipment,
  createEmptyInventory,
  createDefaultInventory,
  addItemToInventory,
  equipItemFromInventory,
  unequipItemToInventory
} from './itemModel';
import type { Character } from './characterModel';

describe('inventory and equipment system', () => {
  test('createDefaultInventory returns starter items', () => {
    const inv = createDefaultInventory();
    expect(inv.length).toBeGreaterThan(0);
    expect(inv[0].name).toBe('Épée rouillée');
  });
  test('equipping moves item from inventory and unequipping returns it', () => {
    const char: Character = {
      id: 1,
      name: 'Hero',
      stats: createDefaultStats(),
      equipment: createEmptyEquipment(),
      inventory: createEmptyInventory()
    };

    const sword: Item = { id: 101, name: 'Sword', slot: 'mainhand' };
    const added = addItemToInventory(char.inventory, sword);
    expect(added).toBe(true);
    const equipped = equipItemFromInventory(char, 0);
    expect(equipped).toBe(true);
    expect(char.inventory.length).toBe(0);
    expect(char.equipment.mainhand).toEqual(sword);

    const unequipped = unequipItemToInventory(char, 'mainhand');
    expect(unequipped).toBe(true);
    expect(char.inventory.length).toBe(1);
    expect(char.inventory[0]).toEqual(sword);
    expect(char.equipment.mainhand).toBeNull();
  });

  test('item stat bonuses are applied when equipped and removed when unequipped', () => {
    const char: Character = {
      id: 1,
      name: 'Hero',
      stats: createDefaultStats(),
      equipment: createEmptyEquipment(),
      inventory: createEmptyInventory()
    };

    const sword: Item = {
      id: 102,
      name: 'Sword of Power',
      slot: 'mainhand',
      bonuses: { stats: { strength: 3 } }
    };

    addItemToInventory(char.inventory, sword);
    const base = char.stats.stats.strength;
    equipItemFromInventory(char, 0);
    expect(char.stats.stats.strength).toBe(base + 3);

    unequipItemToInventory(char, 'mainhand');
    expect(char.stats.stats.strength).toBe(base);
  });
});
