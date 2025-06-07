import React from 'react';
import type { CharacterStats } from '../../models/characterModel';
import { formatStatLabel } from '../../utils/formatStatLabel';

export type CharacterStatsDisplayProps = {
  stats: CharacterStats;
};

export default function CharacterStatsDisplay({ stats }: CharacterStatsDisplayProps) {
  return (
    <div>
      {Object.entries(stats).map(([section, values]) => (
        values ? (
          <div key={section}>
            <strong>{formatStatLabel(section)}</strong>
            <ul>
              {Object.entries(values).map(([k, v]) => (
                <li key={k}>
                  {formatStatLabel(k)}: {v as number}
                </li>
              ))}
            </ul>
          </div>
        ) : null
      ))}
    </div>
  );
}
