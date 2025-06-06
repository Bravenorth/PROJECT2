import React, { useState } from 'react';

type Zone = {
  id: string;
  name: string;
  description?: string;
};

type Act = {
  id: string;
  label: string;
  zones: Zone[];
};

const ACTS: Act[] = [
  {
    id: 'act1',
    label: 'Acte I',
    zones: [
      { id: 'zone1', name: 'Forêt Sombre', description: 'Une forêt lugubre remplie de créatures nocturnes.' },
      { id: 'zone2', name: 'Ruines Oubliées', description: 'Les restes d’une ancienne civilisation oubliée.' },
      { id: 'zone3', name: 'Crypte Maudite', description: 'Des esprits errants hantent cette crypte profonde.' },
      { id: 'zone4', name: 'Village Déchu', description: 'Un village abandonné où le mal rôde encore.' },
      { id: 'zone5', name: 'Clairière du Sang', description: 'Une clairière marquée par des rituels impies.' },
    ],
  },
  {
    id: 'act2',
    label: 'Acte II',
    zones: [
      { id: 'zone6', name: 'Désert Ancien', description: 'Un désert balayé par des vents maudits.' },
      { id: 'zone7', name: 'Temple Enfoui', description: 'Un sanctuaire oublié sous les sables.' },
      { id: 'zone8', name: 'Oasis Rouge', description: 'Une oasis étrange aux eaux teintées de rouge.' },
      { id: 'zone9', name: 'Mines Maudites', description: 'Des tunnels infestés d’abominations souterraines.' },
    ],
  },
  // Acte III, IV, V à venir
];

export default function CombatZoneSelector() {
  const [selectedActId, setSelectedActId] = useState('act1');
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const selectedAct = ACTS.find((act) => act.id === selectedActId);

  return (
    <section
      style={{
        border: '1px solid #0f0',
        borderRadius: 6,
        padding: '1rem',
        background: '#000',
        flexShrink: 0,
      }}
    >
      <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>🌍 Zones de Combat</h2>

      {/* Onglets d'actes */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        {ACTS.map((act) => (
          <button
            key={act.id}
            onClick={() => {
              setSelectedActId(act.id);
              setSelectedZone(null);
            }}
            style={{
              background: selectedActId === act.id ? '#0f0' : '#111',
              color: selectedActId === act.id ? '#000' : '#ccc',
              padding: '0.4rem 0.75rem',
              border: '1px solid #0f0',
              borderRadius: 4,
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            {act.label}
          </button>
        ))}
      </div>

      {/* Liste des zones */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {selectedAct?.zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZone(zone)}
            style={{
              background: selectedZone?.id === zone.id ? '#0f0' : '#111',
              color: selectedZone?.id === zone.id ? '#000' : '#0f0',
              border: '1px solid #0f0',
              borderRadius: 4,
              padding: '0.4rem 0.75rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              minWidth: 120,
            }}
          >
            {zone.name}
          </button>
        ))}
      </div>

      {/* Détails de la zone sélectionnée */}
      {selectedZone && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            border: '1px dashed #0f0',
            borderRadius: 4,
            background: '#111',
            fontSize: '0.85rem',
          }}
        >
          <strong>📌 Zone sélectionnée : {selectedZone.name}</strong>
          <p style={{ marginTop: '0.25rem', color: '#ccc' }}>{selectedZone.description}</p>
        </div>
      )}
    </section>
  );
}
