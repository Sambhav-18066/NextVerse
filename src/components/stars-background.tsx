"use client";

import { useState, useEffect } from 'react';

export function StarsBackground() {
  const [stars, setStars] = useState<JSX.Element[]>([]);
  const numStars = 300;

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: numStars }).map((_, i) => (
        <div
          key={i}
          className="star absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDuration: `${Math.random() * 5 + 3}s`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        ></div>
      ));
    };
    setStars(generateStars());
  }, []);

  return <div className="absolute inset-0 opacity-60">{stars}</div>;
}
