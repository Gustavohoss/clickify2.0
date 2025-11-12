"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie_consent_given';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consentGiven) {
        setIsVisible(true);
      }
    } catch (error) {
      // localStorage is not available
      setIsVisible(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    } catch (error) {
      // Silently fail if localStorage is not available
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="max-w-sm shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold">Nós usamos cookies</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Este site usa cookies para garantir que você tenha a melhor experiência.
                <Link href="/privacy" className="underline ml-1">Saiba mais</Link>.
              </p>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleAccept} className="w-full">Aceitar</Button>
                <Button onClick={() => setIsVisible(false)} variant="outline" className="w-full">Recusar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
