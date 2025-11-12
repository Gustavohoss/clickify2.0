import { BrainCircuit, LayoutTemplate, Copy, BarChart, Film } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: "Criador de Produtos Automático",
    description: "Da ideia à primeira oferta em 1 hora.",
  },
  {
    icon: <Film className="h-8 w-8" />,
    title: "Geração de Perfis Sociais",
    description: "Conteúdo pronto para postar no TikTok/Instagram.",
  },
  {
    icon: <LayoutTemplate className="h-8 w-8" />,
    title: "Funil Inteligente e Personalizável",
    description: "Automação que converte.",
  },
  {
    icon: <Copy className="h-8 w-8" />,
    title: "Gerador de Copy e Páginas de Vendas",
    description: "Copy pronta, testada e otimizada.",
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: "Painel de Progresso",
    description: "Acompanhe seus resultados e otimize.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Recursos Principais
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Tudo que você precisa para lançar seu negócio digital, do zero ao sucesso.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                </div>
                <CardDescription className="pt-4">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
