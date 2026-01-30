<?php

namespace App\Filament\Widgets;

use App\Models\Project;
use App\Models\Service;
use App\Models\TechStack;
use App\Models\Profile;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $profile = Profile::first();

        return [
            Stat::make('Total Projects', Project::count())
                ->description('All featured projects')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('info'),

            Stat::make('Active Services', Service::where('is_active', true)->count())
                ->description('Services offered')
                ->descriptionIcon('heroicon-m-wrench-screwdriver')
                ->color('success'),

            Stat::make('Tech Stack', TechStack::count())
                ->description('Technologies displayed')
                ->descriptionIcon('heroicon-m-cpu-chip')
                ->color('warning'),

            Stat::make('Status', $profile ? ($profile->is_open_to_work ? 'Open to Work' : 'Busy') : 'N/A')
                ->description($profile ? 'Current availability' : 'Profile not set')
                ->descriptionIcon($profile && $profile->is_open_to_work ? 'heroicon-m-check-circle' : 'heroicon-m-x-circle')
                ->color($profile && $profile->is_open_to_work ? 'success' : 'danger'),
        ];
    }
}
