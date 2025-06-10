@echo off
echo Starting Laravel Backend Server on port 8000...
start cmd /k "cd c:\xampp\htdocs\930-grp1-repo\example-app && php artisan serve"
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting React Frontend Server on port 3003...
start cmd /k "cd c:\xampp\htdocs\930-grp1-repo\example-app\frontend && SET PORT=3003 && npm start"

echo.
echo Servers started:
echo   - Backend: http://localhost:8000
echo   - Frontend: http://localhost:3003
echo.
echo Press any key to open the frontend in your browser...
pause > nul
start http://localhost:3003
