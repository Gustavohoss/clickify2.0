
'use client';

import { useState, useEffect } from 'react';
import { BarChart, BookUser, BrainCircuit, DollarSign, Milestone, Settings, ShoppingBag, Users, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart as RechartsAreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useCollection, useFirestore, useUser, useMemoFirebase, useDoc, doc } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const initialChartData = [
    { date: '19 out', revenue: 0 },
    { date: '22 out', revenue: 0 },
    { date: '25 out', revenue: 0 },
    { date: '28 out', revenue: 0 },
    { date: '31 out', revenue: 0 },
    { date: '03 nov', revenue: 0 },
    { date: '06 nov', revenue: 0 },
    { date: '09 nov', revenue: 0 },
    { date: '12 nov', revenue: 0 },
    { date: '15 nov', revenue: 0 },
    { date: '18 nov', revenue: 0 },
];

const chartConfig = {
  revenue: {
    label: 'Receita',
    color: 'hsl(var(--primary))',
  },
};

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [chartData, setChartData] = useState(initialChartData);

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userData } = useDoc(userDocRef);

  const salesQuery = useMemoFirebase(
    () => (user && firestore ? query(collection(firestore, 'users', user.uid, 'sales')) : null),
    [firestore, user]
  );
  const { data: sales } = useCollection(salesQuery);

  const pendingSales = sales?.filter(s => s.status === 'pending') || [];
  const pendingRevenue = pendingSales.reduce((sum, sale) => sum + sale.price, 0);


  useEffect(() => {
    if (userData && userData.simulateRevenue && userData.balance > 0) {
      const balance = userData.balance;
      const days = initialChartData.length;
      
      let randomFactors = Array.from({ length: days }, () => Math.random());
      const totalFactor = randomFactors.reduce((sum, factor) => sum + factor, 0);
      
      const newChartData = initialChartData.map((dataPoint, index) => {
        const share = (randomFactors[index] / totalFactor) * balance;
        return {
          ...dataPoint,
          revenue: parseFloat(share.toFixed(2)),
        };
      });
      
      setChartData(newChartData);
    } else {
      setChartData(initialChartData.map(d => ({...d, revenue: 0})));
    }
  }, [userData]);


  const funnelsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'funnels'), where('userId', '==', user.uid))
        : null,
    [firestore, user]
  );

  const { data: funnels } = useCollection(funnelsQuery);
  const funnelCount = funnels?.length || 0;

  const memberAreasQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'memberAreas'), where('userId', '==', user.uid))
        : null,
    [firestore, user]
  );

  const { data: memberAreas } = useCollection(memberAreasQuery);
  const memberAreasCount = memberAreas?.length || 0;

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(balance);
  }

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Seu progresso no Clickify 🚀
        </h1>
        <p className="mt-2 text-muted-foreground">
          Continue avançando — cada clique te aproxima do seu lançamento!
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Ganhos</CardTitle>
            <CardDescription>
              Faturamento dos últimos 30 dias.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <RechartsAreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 5)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(value) =>
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(value as number)
                      }
                    />
                  }
                />
                <Area
                  dataKey="revenue"
                  type="natural"
                  fill="var(--color-revenue)"
                  fillOpacity={0.4}
                  stroke="var(--color-revenue)"
                  stackId="a"
                />
              </RechartsAreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faturamento total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{userData ? formatBalance(userData.balance) : 'R$0,00'}</div>
                <p className="text-xs text-muted-foreground">{userData ? 'Faturamento total da sua conta.' : 'Conecte sua plataforma para ver seus ganhos.'}</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatBalance(pendingRevenue)}</div>
                <p className="text-xs text-muted-foreground">{pendingSales.length} PIX gerados aguardando pagamento.</p>
            </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Criados</CardTitle>
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Nenhum produto criado ainda.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Funis Ativos</CardTitle>
              <Milestone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{funnelCount}</div>
              <p className="text-xs text-muted-foreground">
                {funnelCount === 0 ? 'Nenhum funil ativo no momento.' : `${funnelCount} funis criados.`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Áreas de Membros</CardTitle>
              <BookUser className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{memberAreasCount}</div>
              <p className="text-xs text-muted-foreground">
                {memberAreasCount === 0 ? 'Nenhuma área de membros criada.' : `${memberAreasCount} áreas criadas.`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
