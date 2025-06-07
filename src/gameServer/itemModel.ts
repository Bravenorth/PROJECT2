export const EQUIPMENT_SLOTS = [
  'helmet',
  'armor',
  'gloves',
  'mainhand',
  'offhand',
  'belt',
  'boots',
  'ring1',
  'ring2',
  'amulet'
] as const;

export type EquipmentSlot = typeof EQUIPMENT_SLOTS[number];

export type Item = {
  id: number;
  name: string;
  slot: EquipmentSlot | null;
};

export type CharacterEquipment = {
  [K in EquipmentSlot]: Item | null;
};

export type CharacterInventory = Item[];

export const MAX_INVENTORY_SIZE = 30;

export function createEmptyEquipment(): CharacterEquipment {
  return EQUIPMENT_SLOTS.reduce((acc, slot) => {
    acc[slot] = null;
    return acc;
  }, {} as CharacterEquipment);
}

export function createEmptyInventory(): CharacterInventory {
  return [];
}

export function addItemToInventory(inv: CharacterInventory, item: Item, max = MAX_INVENTORY_SIZE): boolean {
  if (inv.length >= max) return false;
  inv.push(item);
  return true;
}

export function equipItemFromInventory(
  char: { inventory: CharacterInventory; equipment: CharacterEquipment },
  index: number,
  max = MAX_INVENTORY_SIZE
): boolean {
  const item = char.inventory[index];
  if (!item || !item.slot) return false;

  const current = char.equipment[item.slot];
  if (current) {
    if (char.inventory.length >= max) return false;
    char.inventory.push(current);
  }

  char.inventory.splice(index, 1);
  char.equipment[item.slot] = item;
  return true;
}

export function unequipItemToInventory(
  char: { inventory: CharacterInventory; equipment: CharacterEquipment },
  slot: EquipmentSlot,
  max = MAX_INVENTORY_SIZE
): boolean {
  const item = char.equipment[slot];
  if (!item) return false;
  if (char.inventory.length >= max) return false;

  char.inventory.push(item);
  char.equipment[slot] = null;
  return true;
}

