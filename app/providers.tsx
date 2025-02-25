'use client';

import { ThemeProvider } from 'next-themes';
import { KBarWrapper } from '@/components/keyboard-shortcuts/kbar-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <KBarWrapper>
        {children}
      </KBarWrapper>
    </ThemeProvider>
  );
} 