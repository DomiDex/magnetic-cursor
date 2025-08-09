'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import GSAPProvider from '@/providers/GSAPProvider';
import { CursorProvider } from '@/contexts/CursorContext';

// Dynamic import for magnetic cursor (client-side only)
const MagneticCursor = dynamic(
  () => import('@/components/cursor/MagneticCursor'),
  { 
    ssr: false,
    loading: () => null // No loading state to avoid hydration issues
  }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <GSAPProvider>
      <CursorProvider>
        <MagneticCursor />
        {children}
      </CursorProvider>
    </GSAPProvider>
  );
}