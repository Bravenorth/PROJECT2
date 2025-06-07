import React from 'react';

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
};

export default function Tooltip({ content, children }: TooltipProps) {
  const title = typeof content === 'string' ? content : undefined;
  return (
    <span title={title} style={{ position: 'relative' }}>
      {children}
    </span>
  );
}
