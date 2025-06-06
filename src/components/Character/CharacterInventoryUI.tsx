import React from 'react';

const INVENTORY_SIZE = 30;

export default function CharacterInventoryUI() {
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
        {Array.from({ length: INVENTORY_SIZE }).map((_, index) => (
          <div
            key={index}
            style={{
              width: 64,
              height: 64,
              background: '#222',
              border: '1px solid #555',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.65rem',
              color: '#888',
            }}
          >
            Slot {index + 1}
          </div>
        ))}
      </div>
    </section>
  );
}
