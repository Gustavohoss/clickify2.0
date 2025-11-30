import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/providers/theme-provider';
import CookieConsent from '@/components/cookie-consent';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Clickify',
  description: 'Monte seu funil e construa sua presença online em minutos com a ajuda da Clickify.',
  openGraph: {
    title: 'Clickify',
    description: 'Crie seu produto, monte seu funil e construa sua presença online em minutos com a ajuda da IA.',
    images: [
      {
        url: 'https://s3.typebot.io/public/workspaces/cmid1t4zs0000ic0473zbqapx/typebots/cmid1tdnt0004l804cklj945q/blocks/poqi4kahp3t4knz7kheug2ps?v=1763985732213',
        width: 1200,
        height: 630,
        alt: 'Clickify Mockup',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Sora:wght@700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/ayjzhz2ks1igerhd87qkgstr?v=1763468776521" type="image/png" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <CookieConsent />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
