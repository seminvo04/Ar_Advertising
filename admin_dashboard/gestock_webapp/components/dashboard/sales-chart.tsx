"use client";

import { TimeFilter } from "@/types/dashboard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
Legend
);

interface SalesChartProps {
  timeFilter: TimeFilter;
}

export function SalesChart({ timeFilter }: SalesChartProps) {
    console.log("Rendering SalesChart with timeFilter:", timeFilter);
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Ventes',
                data: [25, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="h-[400px]">
            <Bar options={options} data={data} />
        </div>
    );
}