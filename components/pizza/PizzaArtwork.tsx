/* eslint-disable @next/next/no-img-element -- small transparent cut-outs laid out in % of the pizza */
import React, { useMemo } from 'react';
import { TOPPINGS, type ToppingId } from '@/config/pizzaBuilder';
import { placeTopping } from './pizzaLayout';
import styles from './PizzaBuilder.module.css';

/** A finished pizza drawn from its toppings: the same pieces and baked look as in the builder. */
export function PizzaArtwork({ toppings, className }: { toppings: ToppingId[]; className?: string }) {
  const pieces = useMemo(
    () =>
      TOPPINGS.filter((topping) => toppings.includes(topping.id)).flatMap((topping) =>
        placeTopping(topping.id).map((piece) => ({ piece, baked: topping.baked }))
      ),
    [toppings]
  );
  return (
    <div className={`${styles.pizzaBaked} ${className || ''}`} style={{ position: 'relative', aspectRatio: '1' }}>
      <img src="/pizza-builder/base-baked.webp" alt="" className={styles.base} loading="lazy" draggable={false} />
      {pieces.map(({ piece, baked }) => (
        <img
          key={piece.key}
          src={piece.src}
          alt=""
          loading="lazy"
          draggable={false}
          className={styles.piece}
          style={
            {
              left: `${50 + piece.x}%`,
              top: `${50 + piece.y}%`,
              width: `${piece.size}%`,
              '--r': `${piece.rotate}deg`,
              '--sx': piece.flip ? -1 : 1,
              '--baked': baked,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
