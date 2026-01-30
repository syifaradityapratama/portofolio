<?php

namespace App\Filament\Widgets;

use App\Models\Project;
use App\Models\Service;
use App\Models\TechStack;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class PortfolioChart extends ChartWidget
{
    protected static ?string $heading = 'Portfolio Activity';
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 'full';
    public ?string $filter = 'year';

    protected function getFilters(): ?array
    {
        return [
            'week' => 'Last Week',
            'month' => 'Last Month',
            '6months' => 'Last 6 Months',
            'year' => 'This Year',
        ];
    }

    protected function getData(): array
    {
        $activeFilter = $this->filter;
        
        // Tentukan Range Tanggal & Format Grouping
        switch ($activeFilter) {
            case 'week':
                $start = Carbon::now()->subWeek();
                $end = Carbon::now();
                $format = '%Y-%m-%d'; // Group per hari
                $labelFormat = 'd M';
                break;
            case 'month':
                $start = Carbon::now()->subMonth();
                $end = Carbon::now();
                $format = '%Y-%m-%d';
                $labelFormat = 'd M';
                break;
            case '6months':
                $start = Carbon::now()->subMonths(6);
                $end = Carbon::now();
                $format = '%Y-%m'; // Group per bulan
                $labelFormat = 'M Y';
                break;
            case 'year':
            default:
                $start = Carbon::now()->startOfYear();
                $end = Carbon::now();
                $format = '%Y-%m';
                $labelFormat = 'M Y';
                break;
        }

        // Helper function buat query
        $getCounts = function ($model) use ($start, $end, $format) {
            return $model::selectRaw("DATE_FORMAT(created_at, '$format') as date, count(*) as count")
                ->whereBetween('created_at', [$start, $end])
                ->groupBy('date')
                ->orderBy('date')
                ->pluck('count', 'date')
                ->toArray();
        };

        $projects = $getCounts(Project::class);
        $services = $getCounts(Service::class);
        $techStacks = $getCounts(TechStack::class);

        // Gabungkan semua tanggal unik dari ketiga data
        $allDates = array_unique(array_merge(array_keys($projects), array_keys($services), array_keys($techStacks)));
        sort($allDates);

        // Siapkan data final (isi 0 kalau tanggal gak ada di dataset)
        $labels = [];
        $projectData = [];
        $serviceData = [];
        $techData = [];

        foreach ($allDates as $date) {
            $labels[] = Carbon::createFromFormat($activeFilter === '6months' || $activeFilter === 'year' ? 'Y-m' : 'Y-m-d', $date)->format($labelFormat);
            $projectData[] = $projects[$date] ?? 0;
            $serviceData[] = $services[$date] ?? 0;
            $techData[] = $techStacks[$date] ?? 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Projects',
                    'data' => $projectData,
                    'borderColor' => '#3b82f6', // Blue
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'fill' => true,
                ],
                [
                    'label' => 'Services',
                    'data' => $serviceData,
                    'borderColor' => '#10b981', // Emerald
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'fill' => true,
                ],
                [
                    'label' => 'Tech Stack',
                    'data' => $techData,
                    'borderColor' => '#f59e0b', // Amber
                    'backgroundColor' => 'rgba(245, 158, 11, 0.1)',
                    'fill' => true,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
