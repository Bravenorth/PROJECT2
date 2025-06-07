// src/gameServer/itemModel.ts

// 🧩 Slots d'équipement disponibles
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

export type EquipmentSlot = (typeof EQUIPMENT_SLOTS)[number];

// 📦 Représentation d'un objet
export type Item = {
  id: number;
  name: string;
  slot: EquipmentSlot | null;
  emoji?: string; // optionnel pour affichage
};

// 🧍‍♂️ Inventaire et équipement du personnage
export type CharacterInventory = Item[];
export type CharacterEquipment = Record<EquipmentSlot, Item | null>;

export const MAX_INVENTORY_SIZE = 30;

// 🔧 Création d’un équipement vide
export function createEmptyEquipment(): CharacterEquipment {
  return Object.fromEntries(EQUIPMENT_SLOTS.map((slot) => [slot, null])) as CharacterEquipment;
}

// 🔧 Création d’un inventaire vide
export function createEmptyInventory(): CharacterInventory {
  return [];
}

// 🎒 Inventaire initial du joueur
export function createDefaultInventory(): CharacterInventory {
  return [
    { id: 1, name: 'Épée rouillée', slot: 'mainhand', emoji: '🗡️' },
    { id: 2, name: 'Bouclier en bois', slot: 'offhand', emoji: '🛡️' },
    { id: 3, name: 'Armure en tissu', slot: 'armor', emoji: '🧥' }
  ];
}

// ➕ Ajout dans l’inventaire
export function addItemToInventory(
  inv: CharacterInventory,
  item: Item,
  max = MAX_INVENTORY_SIZE
): boolean {
  if (inv.length >= max) return false;
  inv.push(item);
  return true;
}

// 🪖 Équipe un objet depuis l’inventaire
export function equipItemFromInventory(
  char: { inventory: CharacterInventory; equipment: CharacterEquipment },
  index: number,
  max = MAX_INVENTORY_SIZE
): boolean {
  const item = char.inventory[index];
  if (!item?.slot) return false;

  const current = char.equipment[item.slot];
  if (current && char.inventory.length >= max) return false;

  // Remet l'objet actuel dans l'inventaire si nécessaire
  if (current) char.inventory.push(current);

  char.inventory.splice(index, 1);
  char.equipment[item.slot] = item;
  return true;
}

// 🧤 Retire un équipement et le met dans l’inventaire
export function unequipItemToInventory(
  char: { inventory: CharacterInventory; equipment: CharacterEquipment },
  slot: EquipmentSlot,
  max = MAX_INVENTORY_SIZE
): boolean {
  const item = char.equipment[slot];
  if (!item || char.inventory.length >= max) return false;

  char.inventory.push(item);
  char.equipment[slot] = null;
  return true;
}
