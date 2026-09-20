import { Cormorant_Garamond, Pinyon_Script, Satisfy, Source_Serif_4 } from 'next/font/google';

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pinyon',
  display: 'swap',
});

export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-satisfy',
  display: 'swap',
});

export const fontVariables = `${sourceSerif.variable} ${cormorant.variable} ${pinyon.variable} ${satisfy.variable}`;
