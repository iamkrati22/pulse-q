@echo off
echo Starting Pulse-Q Microservices...
echo.

REM Start Feedback API
echo Starting Feedback API...
start "Feedback API" cmd /k "cd feedback-api && node index.js"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Router Service
echo Starting Router Service...
start "Router Service" cmd /k "cd router-service && node index.js"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Support Service
echo Starting Support Service...
start "Support Service" cmd /k "cd support-service && node index.js"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Product Service
echo Starting Product Service...
start "Product Service" cmd /k "cd product-service && node index.js"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Marketing Service
echo Starting Marketing Service...
start "Marketing Service" cmd /k "cd marketing-service && node index.js"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Logger Service
echo Starting Logger Service...
start "Logger Service" cmd /k "cd logger-service && node index.js"

echo.
echo All microservices started! Check the new command windows.
echo.
echo Services:
echo - Frontend: http://localhost:3002
echo - Feedback API: http://localhost:5000
echo - Logger WebSocket: ws://localhost:8080
echo.
pause 