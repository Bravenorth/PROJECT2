import { characterService } from './characterService';
import { createDefaultStats } from '../gameServer/characterModel';

describe('characterService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('createDefaultStats fills missing branches when characters are loaded', async () => {
    const partialCharacter = {
      id: 1,
      name: 'Legacy',
      stats: {
        core: { level: 1, xp: 0, hp: 10 },
        stats: { strength: 5, intelligence: 5, dexterity: 5, vitality: 5 },
        offensive: { hitChance: 90, criticalChance: 10, criticalDamage: 120 }
        // defensive branch intentionally missing
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    localStorage.setItem('characters', JSON.stringify([partialCharacter]));

    const characters = await characterService.getAll();

    expect(characters[0].stats.defensive).toEqual(createDefaultStats().defensive);
  });

  test('creating a character stores and retrieves data correctly', async () => {
    await characterService.clearAll();
    const char = await characterService.create('Hero');
    const all = await characterService.getAll();
    const found = all.find(c => c.id === char.id);

    expect(found).toBeDefined();
    expect(found?.name).toBe('Hero');
    expect(found?.inventory.length).toBeGreaterThan(0);
  });
});
