<?php


return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ensure 'api/*' is present

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5174',
        'http://127.0.0.1:5174'
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*', 'Authorization'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
