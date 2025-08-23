// src/components/SimpleStars.tsx
"use client";

import { useMemo } from 'react';
import styles from './SimpleStars.module.css';

// Function to generate the box-shadow string
const generateStars = (count: number, width: number, height: number) => {
  let boxShadow = '';
  for (let i = 0; i < count; i++) {
    boxShadow += `${Math.random() * width}px ${Math.random() * height}px #FFF${i < count - 1 ? ',' : ''}`;
  }
  return boxShadow;
};

const SimpleStars = () => {
  // We use useMemo to ensure the star positions are only calculated once.
  // Tripled the number of stars for each layer
  const starShadows1 = useMemo(() => generateStars(3000, 2000, 2000), []); // Was 700
  const starShadows2 = useMemo(() => generateStars(1000, 2000, 2000), []);  // Was 200
  const starShadows3 = useMemo(() => generateStars(500, 2000, 2000), []);  // Was 100

  return (
    <div className={styles.starsContainer}>
      <div className={styles.stars1} style={{ boxShadow: starShadows1 }} />
      <div className={styles.stars2} style={{ boxShadow: starShadows2 }} />
      <div className={styles.stars3} style={{ boxShadow: starShadows3 }} />
    </div>
  );
};

export default SimpleStars;