// src/gameServer/characterModel.ts

export type CharacterStats = {
  core: {
    level: number;
    xp: number;
    hp: number;
  };
  stats: {
    strength: number;
    intelligence: number;
    dexterity: number;
    vitality: number;
  };
  offensive: {
    hitChance: number;
    criticalChance: number;
    criticalDamage: number;
  };
  defensive?: {
    defense: number;
    fireRes: number;
    iceRes: number;
    lightningRes: number;
    poisonRes: number;
    dodgeChance: number;
    blockChance: number;
  };
};

export type Character = {
  id: number;
  name: string;
  stats: CharacterStats;
};

export function createDefaultStats(): CharacterStats {
  return {
    core: {
      level: 1,
      xp: 0,
      hp: 50,
    },
    stats: {
      strength: 5,
      intelligence: 5,
      dexterity: 5,
      vitality: 5,
    },
    offensive: {
      hitChance: 95,
      criticalChance: 5,
      criticalDamage: 150,
    },
    defensive: {
      defense: 0,
      fireRes: 0,
      iceRes: 0,
      lightningRes: 0,
      poisonRes: 0,
      dodgeChance: 5,
      blockChance: 5,
    }
  };
}

