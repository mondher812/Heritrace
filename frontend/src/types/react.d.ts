import 'react';

declare module 'react' {
  export const useState: typeof import('react').useState;
  export const useEffect: typeof import('react').useEffect;
  export const useRef: typeof import('react').useRef;
} 