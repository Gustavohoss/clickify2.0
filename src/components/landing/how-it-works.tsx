import { Target, Bot, Milestone, Clapperboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const steps = [
  {
    icon: <Target className="h-8 w-8" />,
    title: "Escolha seu nicho",
    description: "Perguntas guiadas para definir público e oferta.",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "Crie seu produto com IA",
    description: "Geração automática de produto, estrutura e assets.",
  },
  {
    icon: <Milestone className="h-8 w-8" />,
    title: "Monte seu funil completo",
    description: "Página de captura, emails, página de vendas e checkout.",
  },
  {
    icon: <Clapperboard className="h-8 w-8" />,
    title: "Crie seu perfil TikTok",
    description: "Bio, 10 ideias de vídeo, roteiro e calendário de postagem.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Como funciona
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Lance seu produto digital em 4 passos simples.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-card/50 backdrop-blur-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
