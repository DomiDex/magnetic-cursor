'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CursorContextType {
  cursorState: string;
  setCursorState: (state: string) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorState] = useState('default');
  const [cursorText, setCursorText] = useState('');

  return (
    <CursorContext.Provider 
      value={{ 
        cursorState, 
        setCursorState, 
        cursorText, 
        setCursorText 
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider');
  }
  return context;
}