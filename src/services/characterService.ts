// src/services/characterService.ts
import {
  Character,
  CharacterStats,
  createDefaultStats
} from '../gameServer/characterModel';
import {
  createEmptyEquipment,
  createEmptyInventory,
  createDefaultInventory
} from '../gameServer/itemModel';

const STORAGE_KEY = 'characters';
const ACTIVE_KEY = 'activeCharacterId';

function simulateDelay<T>(data: T, ms = 50): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

// 🔁 Fonction utilitaire récursive pour migrer une branche de stats
function migrateBranch<T extends object>(branch: T, fallback: T): T {
  const migrated: any = {};
  for (const key in fallback) {
    const fallbackValue = fallback[key];
    const legacyValue = (branch as any)?.[key];

    // Si c’est un objet (branche profonde), on migre récursivement
    if (typeof fallbackValue === 'object' && fallbackValue !== null && !Array.isArray(fallbackValue)) {
      migrated[key] = migrateBranch(legacyValue || {}, fallbackValue);
    } else {
      migrated[key] = legacyValue ?? fallbackValue;
    }
  }
  return migrated;
}

// 🔁 Migration complète des stats avec fallback intelligent
function migrateCharacter(char: Character): Character {
  const defaultStats = createDefaultStats();
  const legacyStats = char.stats as any;

  const migratedStats: CharacterStats = migrateBranch(legacyStats, defaultStats);

  // Logging optionnel si des branches manquent
  const missingBranches = ['core', 'offensive', 'defensive'].filter(
    (key) => !legacyStats?.[key]
  );
  if (missingBranches.length > 0) {
    console.log(`🔁 Migration "${char.name}" → ajout de ${missingBranches.join(', ')}`);
  }

  return {
    ...char,
    stats: migratedStats,
    equipment: char.equipment ?? createEmptyEquipment(),
    inventory: char.inventory ?? createEmptyInventory()
  };
}

export const characterService = {
  async getAll(): Promise<Character[]> {
    const stored = localStorage.getItem(STORAGE_KEY);
    const list: Character[] = stored ? JSON.parse(stored) : [];

    const migratedList = list.map(migrateCharacter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedList));

    return simulateDelay(migratedList);
  },

  async create(name: string): Promise<Character> {
    const trimmed = name.trim();
    if (!trimmed) throw new Error('Nom invalide');

    const newChar: Character = {
      id: Date.now(),
      name: trimmed,
      stats: createDefaultStats(),
      equipment: createEmptyEquipment(),
      inventory: createDefaultInventory()
    };

    const current = await characterService.getAll();
    const updated = [...current, newChar];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return simulateDelay(newChar);
  },

  async setActive(id: number): Promise<void> {
    localStorage.setItem(ACTIVE_KEY, id.toString());
    return simulateDelay(undefined);
  },

  async getActiveId(): Promise<number | null> {
    const raw = localStorage.getItem(ACTIVE_KEY);
    return simulateDelay(raw ? parseInt(raw) : null);
  },

  async delete(id: number): Promise<void> {
    const all = await characterService.getAll();
    const updated = all.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const active = await characterService.getActiveId();
    if (active === id) {
      localStorage.removeItem(ACTIVE_KEY);
    }

    return simulateDelay(undefined);
  },

  async clearAll(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_KEY);
    return simulateDelay(undefined);
  }
};
