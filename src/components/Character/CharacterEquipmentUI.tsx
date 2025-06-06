import React from 'react';

const EQUIPMENT_SLOTS = [
  { key: 'helmet', label: 'Casque' },
  { key: 'armor', label: 'Armure' },
  { key: 'gloves', label: 'Gants' },
  { key: 'mainhand', label: 'Main' },
  { key: 'offhand', label: 'Second' },
  { key: 'belt', label: 'Ceinture' },
  { key: 'boots', label: 'Bottes' },
  { key: 'ring1', label: 'Anneau 1' },
  { key: 'ring2', label: 'Anneau 2' },
  { key: 'amulet', label: 'Amulette' },
];

export default function CharacterEquipmentUI() {
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
        {EQUIPMENT_SLOTS.map(({ key, label }) => (
          <div
            key={key}
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
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
