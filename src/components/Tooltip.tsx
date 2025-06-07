import React, { useState } from 'react';

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
};

export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#333',
            color: '#fff',
            padding: '0.25rem 0.5rem',
            borderRadius: 4,
            whiteSpace: 'nowrap',
            fontSize: '0.75rem',
            zIndex: 10,
            pointerEvents: 'none',
            marginTop: 4
          }}
        >
          {content}
        </div>
      )}
    </span>
  );
}
