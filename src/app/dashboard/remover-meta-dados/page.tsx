'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileX, Upload } from 'lucide-react';

export default function RemoverMetadadosPage() {

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Process the file
      console.log('Arquivo selecionado:', file.name);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Remover Metadados de Arquivos
        </h1>
        <p className="mt-2 text-muted-foreground">
          Faça o upload de um arquivo para remover seus metadados e garantir sua privacidade.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileX className="h-6 w-6" />
            Limpeza de Metadados
          </CardTitle>
          <CardDescription>
            Selecione um arquivo (imagem, PDF, etc.) para limpar as informações ocultas.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 py-12 border-2 border-dashed border-gray-700 rounded-lg">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-center text-muted-foreground">
              Arraste e solte um arquivo aqui ou clique para selecionar.
            </p>
          </div>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button asChild>
            <Label htmlFor="file-upload" className="cursor-pointer">
              Selecionar Arquivo
            </Label>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
