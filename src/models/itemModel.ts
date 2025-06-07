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
import type { CharacterStats, Character } from './characterModel';

export type ItemBonuses = Partial<{
  core: Partial<CharacterStats['core']>;
  stats: Partial<CharacterStats['stats']>;
  offensive: Partial<CharacterStats['offensive']>;
  defensive: Partial<CharacterStats['defensive']>;
}>;

export type Item = {
  id: number;
  name: string;
  slot: EquipmentSlot | null;
  emoji?: string; // optionnel pour affichage
  bonuses?: ItemBonuses;
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
    {
      id: 1,
      name: 'Épée rouillée',
      slot: 'mainhand',
      emoji: '🗡️',
      bonuses: { stats: { strength: 2 } }
    },
    {
      id: 2,
      name: 'Bouclier en bois',
      slot: 'offhand',
      emoji: '🛡️',
      bonuses: { defensive: { defense: 1 } }
    },
    {
      id: 3,
      name: 'Armure en tissu',
      slot: 'armor',
      emoji: '🧥',
      bonuses: { defensive: { defense: 1 }, core: { hp: 5 } }
    }
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

function applyItemBonuses(stats: CharacterStats, item: Item, factor: 1 | -1) {
  if (!item.bonuses) return;
  for (const sectionKey of Object.keys(item.bonuses) as (keyof ItemBonuses)[]) {
    const bonusSection = item.bonuses[sectionKey];
    const targetSection = stats[sectionKey as keyof CharacterStats] as Record<string, number>;
    if (!bonusSection || !targetSection) continue;
    for (const statKey of Object.keys(bonusSection) as string[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (bonusSection as any)[statKey];
      if (typeof value === 'number') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (targetSection as any)[statKey] += factor * value;
      }
    }
  }
}

export function equipItemFromInventory(
  char: Character,
  index: number,
  max = MAX_INVENTORY_SIZE
): boolean {
  const item = char.inventory[index];
  if (!item?.slot) return false;

  const current = char.equipment[item.slot];
  if (current && char.inventory.length >= max) return false;

  if (current) {
    char.inventory.push(current);
    applyItemBonuses(char.stats, current, -1);
  }

  char.inventory.splice(index, 1);
  char.equipment[item.slot] = item;
  applyItemBonuses(char.stats, item, 1);
  return true;
}

// 🧤 Retire un équipement et le met dans l’inventaire
export function unequipItemToInventory(
  char: Character,
  slot: EquipmentSlot,
  max = MAX_INVENTORY_SIZE
): boolean {
  const item = char.equipment[slot];
  if (!item || char.inventory.length >= max) return false;

  char.inventory.push(item);
  char.equipment[slot] = null;
  applyItemBonuses(char.stats, item, -1);
  return true;
}
