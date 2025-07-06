@echo off
echo Starting Pulse-Q Services...

REM Start Feedback API
start "Feedback API" cmd /k "cd feedback-api && npm start"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Router Service
start "Router Service" cmd /k "cd router-service && npm start"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Support Service
start "Support Service" cmd /k "cd support-service && npm start"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Product Service
start "Product Service" cmd /k "cd product-service && npm start"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Marketing Service
start "Marketing Service" cmd /k "cd marketing-service && npm start"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Logger Service
start "Logger Service" cmd /k "cd logger-service && npm start"

echo All services started! Check the new command windows.
echo Frontend: http://localhost:3002
echo Feedback API: http://localhost:5000
pause 