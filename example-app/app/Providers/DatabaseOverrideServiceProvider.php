<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class DatabaseOverrideServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Merge the database_override configuration
        $overrideConfig = require config_path('database_override.php');
        $this->app['config']->set('database', $overrideConfig);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
