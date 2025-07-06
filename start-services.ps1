# Start all Pulse-Q backend services
Write-Host "🚀 Starting Pulse-Q Backend Services..." -ForegroundColor Green

# Start Feedback API
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd feedback-api; npm start" -WindowStyle Normal

# Start Router Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd router-service; npm start" -WindowStyle Normal

# Start Support Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd support-service; npm start" -WindowStyle Normal

# Start Product Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd product-service; npm start" -WindowStyle Normal

# Start Marketing Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd marketing-service; npm start" -WindowStyle Normal

# Start Logger Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd logger-service; npm start" -WindowStyle Normal

Write-Host "✅ All services started! Check the new PowerShell windows." -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 Feedback API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🔌 Logger WebSocket: ws://localhost:8080" -ForegroundColor Cyan 