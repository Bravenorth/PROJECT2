import React from 'react';
import type { Item } from '../models/itemModel';
import { formatStatLabel } from '../utils/formatStatLabel';

export type ItemTooltipContentProps = {
  item: Item;
};

export default function ItemTooltipContent({ item }: ItemTooltipContentProps) {
  return (
    <div>
      <strong>{item.name}</strong>
      {item.bonuses && (
        <ul>
          {Object.entries(item.bonuses).map(([section, values]) => (
            <li key={section}>
              {formatStatLabel(section)}
              <ul>
                {Object.entries(values || {}).map(([k, v]) => (
                  <li key={k}>
                    {formatStatLabel(k)}: {v as number}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
