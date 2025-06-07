import React from 'react';
import type { Item, ItemBonuses } from '../gameServer/itemModel';
import { formatStatLabel } from '../utils/formatStatLabel';

type Props = { item: Item };

function renderBonuses(bonuses: ItemBonuses | undefined) {
  if (!bonuses) return null;
  const lines: React.ReactNode[] = [];
  for (const [sectionKey, sectionValue] of Object.entries(bonuses)) {
    if (!sectionValue) continue;
    for (const [statKey, value] of Object.entries(sectionValue)) {
      lines.push(
        <div key={sectionKey + statKey}>
          {formatStatLabel(statKey)} +{value}
        </div>
      );
    }
  }
  return lines.length > 0 ? <div style={{ marginTop: 4 }}>{lines}</div> : null;
}

export default function ItemTooltipContent({ item }: Props) {
  return (
    <div>
      <strong>{item.name}</strong>
      {renderBonuses(item.bonuses)}
    </div>
  );
}
