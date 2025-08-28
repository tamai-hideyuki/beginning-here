import React from 'react';

interface TimerTextProps {
  time: string;
  className?: string;
}

export const TimerText: React.FC<TimerTextProps> = ({ time, className = '' }) => {
  return (
    <div className={`font-mono text-4xl tracking-wider ${className}`}>
      {time}
    </div>
  );
};