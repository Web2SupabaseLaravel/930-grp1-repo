<?php

return [
    'default' => 'pgsql',
    
    'connections' => [
        'pgsql' => [
            'driver' => 'pgsql',
            'host' => 'aws-0-eu-central-1.pooler.supabase.com',
            'port' => '5432',
            'database' => 'postgres',
            'username' => 'postgres.uswrjgtqbbicpsmtchdx',
            'password' => 'xapjsY5KOENtT1Z6',
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'search_path' => 'public',
            'sslmode' => 'prefer',
        ],
        'sqlite' => [
            'driver' => 'sqlite',
            'database' => database_path('database.sqlite'),
            'prefix' => '',
            'foreign_key_constraints' => true,
        ],
    ],
];
