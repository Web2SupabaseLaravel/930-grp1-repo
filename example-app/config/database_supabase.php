<?php

// This configuration handles both Supabase connection and local SQLite for development
// This dual configuration lets us switch between them easily
return [
    // Default database connection
    'default' => env('DB_CONNECTION', 'sqlite'), // Will use sqlite by default
    
    'connections' => [
        // Local SQLite for development (works without external connections)
        'sqlite' => [
            'driver' => 'sqlite',
            'database' => database_path('database.sqlite'),
            'prefix' => '',
            'foreign_key_constraints' => true,
        ],
        
        // Supabase PostgreSQL connection - adjust credentials as needed
        'pgsql' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'postgres'),
            'username' => env('DB_USERNAME', 'postgres'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'search_path' => 'public',
            'sslmode' => env('DB_SSLMODE', 'prefer'),
        ],
    ],
];
