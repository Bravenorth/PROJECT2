import React from 'react';
import {
  type CharacterEquipment,
  type EquipmentSlot,
  EQUIPMENT_SLOTS
} from '../../gameServer/itemModel';

const SLOT_LABELS: Record<EquipmentSlot, string> = {
  helmet: 'Casque',
  armor: 'Armure',
  gloves: 'Gants',
  mainhand: 'Main',
  offhand: 'Second',
  belt: 'Ceinture',
  boots: 'Bottes',
  ring1: 'Anneau 1',
  ring2: 'Anneau 2',
  amulet: 'Amulette'
};

type Props = {
  equipment: CharacterEquipment;
  onUnequip: (slot: EquipmentSlot) => void;
};
export default function CharacterEquipmentUI({ equipment, onUnequip }: Props) {
  return (
    <section
      style={{
        border: '1px solid #0f0',
        borderRadius: 6,
        padding: '0.75rem',
        background: '#000',
        fontSize: '0.75rem',
        flexShrink: 0,
      }}
    >
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>🧰 Équipement</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 48px)',
          gap: '0.4rem',
        }}
      >
        {EQUIPMENT_SLOTS.map((slot) => {
          const item = equipment[slot];
          return (
            <div
              key={slot}
              onClick={() => item && onUnequip(slot)}
              style={{
                width: 48,
                height: 48,
                background: '#222',
                border: '1px solid #555',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                textAlign: 'center',
                color: '#888',
                padding: '2px',
                cursor: item ? 'pointer' : 'default'
              }}
              title={item?.name ?? SLOT_LABELS[slot]}
            >
              {item ? (
                <img
                  src="https://via.placeholder.com/48"
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                SLOT_LABELS[slot]
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
