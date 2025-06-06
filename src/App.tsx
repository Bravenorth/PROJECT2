import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    location.reload(); // Recharge pour tout réinitialiser proprement
  };

  const goToCharacterSelect = () => {
    navigate('/character-select');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <button
        onClick={handleReset}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: '#f44336',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Reset LocalStorage
      </button>

      <h1>Bienvenue dans le jeu ⚔️</h1>
      <p>Commencez en sélectionnant ou créant un personnage.</p>
      <button
        onClick={goToCharacterSelect}
        style={{
          marginTop: '1rem',
          background: '#4caf50',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Jouer
      </button>
    </div>
  );
}