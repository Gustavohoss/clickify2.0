'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Instagram, Facebook, MessageSquare, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export type Ad = {
  id: string;
  ad_creative_body: string;
  ad_creative_link_caption: string;
  ad_creative_link_title: string;
  ad_creative_link_description: string;
  ad_delivery_start_time: string;
  page_name: string;
  publisher_platforms: string[];
  ad_snapshot_url: string;
  impressions?: { lower_bound: string; upper_bound: string };
  spend?: { lower_bound: string; upper_bound: string };
};

type AdCardProps = {
  ad: Ad;
};

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'messenger':
        return <MessageSquare className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

export function AdCard({ ad }: AdCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
    };

    const adCreativeBody = ad.ad_creative_body?.length > 150 ? ad.ad_creative_body.substring(0, 150) + '...' : ad.ad_creative_body;

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold truncate">{ad.page_name}</CardTitle>
            <div className="flex items-center gap-2">
            {ad.publisher_platforms?.map((platform) => (
                <Badge key={platform} variant="secondary" className="gap-1 capitalize">
                <PlatformIcon platform={platform} />
                </Badge>
            ))}
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow space-y-4">
        <div className="aspect-square w-full rounded-md bg-muted flex items-center justify-center">
            <p className="text-xs text-muted-foreground text-center p-4">A imagem/vídeo do anúncio é visível no link do snapshot.</p>
        </div>
        <div className='space-y-2'>
            <h3 className="font-semibold text-sm leading-tight">{ad.ad_creative_link_title || 'Título não disponível'}</h3>
            <p className="text-sm text-muted-foreground leading-snug">
                {adCreativeBody || 'Descrição não disponível.'}
            </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex-col items-start gap-3">
        <p className="text-xs text-muted-foreground">
          Início da veiculação: {formatDate(ad.ad_delivery_start_time)}
        </p>
        <Button asChild size="sm" className="w-full">
            <a href={ad.ad_snapshot_url} target="_blank" rel="noopener noreferrer">
                Ver Anúncio no Facebook
                <ExternalLink className="ml-2 h-4 w-4" />
            </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
