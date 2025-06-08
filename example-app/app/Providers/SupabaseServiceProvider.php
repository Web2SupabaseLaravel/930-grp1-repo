<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class SupabaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Merge the Supabase database configuration
        $supabaseConfig = require config_path('database_supabase.php');
        $this->app['config']->set('database', $supabaseConfig);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
