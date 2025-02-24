import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import "./styles/message-themes.scss";
import { Providers } from './providers';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Agent Dashboard',
  description: 'Manage your collection of AI agents',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
