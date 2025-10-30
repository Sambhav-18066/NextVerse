'use client';

import React from 'react';

const StarsBackground = () => {
  const stars = 150; // Number of stars

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden opacity-50">
      <div className="stars">
        {Array.from({ length: stars }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={
              {
                '--star-tail-length': `${Math.random() * 2 + 0.5}em`,
                '--top-offset': `${Math.random() * 100}vh`,
                '--fall-duration': `${Math.random() * 6 + 6}s`,
                '--fall-delay': `${Math.random() * 10}s`,
                // We add a random start position on the X axis to spread the stars
                left: `${Math.random() * 100}vw`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};

export default StarsBackground;
