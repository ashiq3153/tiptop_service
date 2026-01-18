# GitHub Remote Setup Script
# Run this script after creating your GitHub repository

Write-Host "GitHub Repository Setup" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Get repository name (default: tiptop_service)
$repoName = Read-Host "Enter repository name [tiptop_service]"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "tiptop_service"
}

# Construct URL
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "Adding remote: $repoUrl" -ForegroundColor Yellow

# Add remote
git remote add origin $repoUrl

# Check if successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote added successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Rename branch to main
    git branch -M main
    
    # Show push command
    Write-Host "Ready to push! Run the following command:" -ForegroundColor Green
    Write-Host "git push -u origin main" -ForegroundColor Cyan
} else {
    Write-Host "Error: Remote might already exist. Check with: git remote -v" -ForegroundColor Red
    Write-Host ""
    Write-Host "To update existing remote, run:" -ForegroundColor Yellow
    Write-Host "git remote set-url origin $repoUrl" -ForegroundColor Cyan
}
