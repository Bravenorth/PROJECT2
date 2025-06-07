import React from 'react';
import type { CharacterStats } from '../../gameServer/characterModel';
import { formatStatLabel } from '../../utils/formatStatLabel';

type Props = {
  stats: CharacterStats;
};

export default function CharacterStatsDisplay({ stats }: Props) {
  return (
    <div style={{ marginTop: '1rem', color: '#ccc', fontSize: '0.85rem' }}>
      {Object.entries(stats).map(([sectionKey, sectionValue]) => {
        if (typeof sectionValue !== 'object' || sectionValue === null) return null;

        return (
          <div key={sectionKey} style={{ marginBottom: '1rem' }}>
            <div style={{ fontWeight: 'bold', color: '#4fc3f7', marginBottom: '0.25rem' }}>
              {formatStatLabel(sectionKey)}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '0.25rem'
              }}
            >
              {Object.entries(sectionValue).map(([statKey, statValue]) => (
                <div key={statKey}>
                  {formatStatLabel(statKey)}: {statValue}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
