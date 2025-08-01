import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register radar chart components
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function RadarChart({ stats }) {
    const labels = stats.map(stat => stat.stat.name.toUpperCase());
    const values = stats.map(stat => stat.base_stat);

    const data = {
        labels,
        datasets: [
            {
                label: 'Base Stats',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            }
        ]
    };

    const options = {
        scales: {
            r: {
                beginAtZero: true,
                suggestedMin: 20,
                suggestedMax: 120,
                ticks: {
                    stepSize: 20,
                    backdropColor: 'transparent',
                    color: '#666',
                },
                pointLabels: {
                    color: '#333',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div style={{ width: '100%', maxWidth: 500, height: 400 }}>
            <Radar data={data} options={options} />
        </div>
    );
}
