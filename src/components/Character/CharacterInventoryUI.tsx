// src/components/Character/CharacterInventoryUI.tsx
import React from 'react';
import { type CharacterInventory, MAX_INVENTORY_SIZE } from '../../models/itemModel';
import Tooltip from '../Tooltip';
import ItemTooltipContent from '../ItemTooltipContent';

type Props = {
  inventory: CharacterInventory;
  onEquip: (index: number) => void;
};

export default function CharacterInventoryUI({ inventory, onEquip }: Props) {
  return (
    <section
      style={{
        border: '1px solid #0f0',
        borderRadius: 8,
        padding: '1rem',
        width: 'fit-content',
        background: '#000',
        marginTop: '2rem',
      }}
    >
      <h2>🎒 Inventaire</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 64px)',
          gap: '0.5rem',
        }}
      >
        {Array.from({ length: MAX_INVENTORY_SIZE }).map((_, index) => {
          const item = inventory[index];
          const content = item ? <ItemTooltipContent item={item} /> : null;
          const box = (
            <div
              onClick={() => item && onEquip(index)}
              style={{
                width: 64,
                height: 64,
                background: '#222',
                border: '1px solid #555',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                color: '#888',
                cursor: item ? 'pointer' : 'default'
              }}
            >
              {item ? item.emoji ?? '❓' : `Slot ${index + 1}`}
            </div>
          );
          return item ? (
            <Tooltip key={index} content={content}>
              {box}
            </Tooltip>
          ) : (
            React.cloneElement(box, { key: index })
          );
        })}
      </div>
    </section>
  );
}
