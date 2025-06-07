import { createDefaultStats } from './characterModel';
import {
  EQUIPMENT_SLOTS,
  Item,
  createEmptyEquipment,
  createEmptyInventory,
  addItemToInventory,
  equipItemFromInventory,
  unequipItemToInventory
} from './itemModel';
import type { Character } from './characterModel';

describe('inventory and equipment system', () => {
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
});
