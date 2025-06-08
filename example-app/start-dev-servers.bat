@echo off
echo Starting Laravel backend server...
start cmd /k "cd c:\xampp\htdocs\930-grp1-repo\example-app && php artisan serve"

echo Waiting for Laravel server to start...
timeout /t 5 /nobreak > nul

echo Starting React frontend server...
start cmd /k "cd c:\xampp\htdocs\930-grp1-repo\example-app\frontend && npm start"

echo Both servers should now be running.
echo Laravel API: http://localhost:8000
echo React App: http://localhost:3003
