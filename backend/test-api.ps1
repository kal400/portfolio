# Test API Script for PowerShell

Write-Host "Testing Portfolio API..." -ForegroundColor Green

# 1. Register Admin
Write-Host "`n1. Creating admin account..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
    Write-Host "✓ Admin created successfully" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

# 2. Login
Write-Host "`n2. Logging in..." -ForegroundColor Yellow
try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
    Write-Host "✓ Login successful" -ForegroundColor Green
    $token = $loginResponse.token
    Write-Host "Token: $token" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

# 3. Create a project
Write-Host "`n3. Creating a project..." -ForegroundColor Yellow
try {
    $projectData = @{
        title = "My Awesome Project"
        description = "This is a test project created via API"
        tech = @("React", "Node.js", "MongoDB")
        github = "https://github.com/yourusername/project"
        live = "https://project.com"
        image = "https://placehold.co/400x250/1e40af/ffffff?text=Test+Project"
    } | ConvertTo-Json

    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }

    $projectResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method Post -Headers $headers -Body $projectData
    Write-Host "✓ Project created successfully" -ForegroundColor Green
    $projectResponse | ConvertTo-Json
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

# 4. Get all projects
Write-Host "`n4. Fetching all projects..." -ForegroundColor Yellow
try {
    $projects = Invoke-RestMethod -Uri "http://localhost:5000/api/projects" -Method Get
    Write-Host "✓ Projects fetched successfully" -ForegroundColor Green
    $projects | ConvertTo-Json
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

Write-Host "`nAPI testing complete!" -ForegroundColor Green
