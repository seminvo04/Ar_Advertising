// app/dashboard/page.jsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/store";

import { TimeFilter } from "@/types/dashboard";
import { useEffect } from "react";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('monthly');
  const router = useRouter()
// Exemple basique de protection
useEffect(() => {
  const token = localStorage.getItem('access')
  if (!token) {
    router.push('/login')
  }
}, [])



  return (
    <div className="flex mt-5 flex-col bg-background p-4 md:p-8">
      <div className="flex-1 overflow-hidden bg-background space-y-4  md:space-y-6">

        {/* En-tête avec filtres */}
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <div className="flex flex-wrap gap-2">
            {(['daily', 'weekly', 'monthly', 'yearly'] as TimeFilter[]).map((filter) => (
              <Button
                key={filter}
                variant={timeFilter === filter ? "default" : "outline"}
                onClick={() => setTimeFilter(filter)}
                className="capitalize text-sm md:text-base"
              >
                {filter === 'daily' ? 'Jour' :
                  filter === 'weekly' ? 'Semaine' :
                    filter === 'monthly' ? 'Mois' : 'Année'}
              </Button>
            ))}
          </div>
        </div>

        {/* Métriques principales */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
        </div>

        {/* Graphiques */}
        <div className="w-full grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Évolution des ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] md:h-[400px]">
                <SalesChart timeFilter={timeFilter} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Produits et Performance des Serveurs */}
        <div className="w-full grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Meilleurs Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {[
                  { name: "Produit A", sales: 1200 },
                  { name: "Produit B", sales: 950 },
                  { name: "Produit C", sales: 870 },
                  { name: "Produit D", sales: 720 },
                  { name: "Produit E", sales: 650 },
                ].map((product, index) => (
                  <div key={index} className="flex justify-between items-center text-sm md:text-base">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-muted-foreground">{product.sales} ventes</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Performance des Serveurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {/* Liste des performances des serveurs */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des événements */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Événements Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
            
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}