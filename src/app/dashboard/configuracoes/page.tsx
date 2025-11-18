'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Webhook, PlusCircle } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type Gateway = {
  name: string;
  webhookUrl: string;
};

export default function ConfiguracoesPage() {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGatewayName, setNewGatewayName] = useState('');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');

  const handleAddGateway = () => {
    if (newGatewayName.trim() && newWebhookUrl.trim()) {
      setGateways([...gateways, { name: newGatewayName.trim(), webhookUrl: newWebhookUrl.trim() }]);
      setIsDialogOpen(false);
      setNewGatewayName('');
      setNewWebhookUrl('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Configurações
        </h1>
        <p className="mt-2 text-muted-foreground">
          Gerencie as integrações e configurações da sua conta.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-6 w-6" />
                Webhooks de Pagamento
              </CardTitle>
              <CardDescription>
                Conecte seus gateways de pagamento para automatizar o fluxo de dados.
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Webhook</DialogTitle>
                  <DialogDescription>
                    Insira o nome e a URL do webhook do seu gateway de pagamento.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="gateway-name">Nome do Gateway</Label>
                    <Input
                      id="gateway-name"
                      placeholder="Ex: Hotmart"
                      value={newGatewayName}
                      onChange={(e) => setNewGatewayName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">URL do Webhook</Label>
                    <Input
                      id="webhook-url"
                      placeholder="Cole a URL do seu webhook aqui"
                      value={newWebhookUrl}
                      onChange={(e) => setNewWebhookUrl(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  <Button onClick={handleAddGateway}>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {gateways.length > 0 ? (
            gateways.map((gateway, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{gateway.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mt-4">
                    <Label htmlFor={`${gateway.name}-webhook`} className="text-xs">URL do Webhook</Label>
                    <Input id={`${gateway.name}-webhook`} value={gateway.webhookUrl} readOnly className="mt-1"/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Editar</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
                <Webhook className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-center text-muted-foreground">Nenhum webhook configurado ainda.</p>
                <p className="text-sm text-center text-muted-foreground">Adicione um para começar a sincronizar suas vendas.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
