# check-releases.ps1
# Checks that GitHub Releases (itmir-attachments) and content post references are in sync.
# Usage: pwsh scripts/check-releases.ps1
# Requires: gh CLI with auth

$REPO = "itmir913/archive"
$TAG  = "itmir-attachments"

Write-Host "Fetching release assets from GitHub..." -ForegroundColor Cyan
$assets = gh release view $TAG --repo $REPO --json assets --jq '.assets[] | .name' 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "gh CLI failed. Run 'gh auth login' first."
    exit 1
}
$releaseSet = [System.Collections.Generic.HashSet[string]]($assets -split "`n" | Where-Object { $_ -ne "" })

$pattern    = [regex]'itmir-attachments/([^\s\)\]"'']+)'
$contentSet = [System.Collections.Generic.HashSet[string]]::new()
$refMap     = @{}

Get-ChildItem -Path "src\content" -Recurse -Filter "*.md" | ForEach-Object {
    $text = Get-Content $_.FullName -Raw -Encoding UTF8
    foreach ($m in $pattern.Matches($text)) {
        $fname = $m.Groups[1].Value
        [void]$contentSet.Add($fname)
        if (-not $refMap.ContainsKey($fname)) {
            $refMap[$fname] = $_.FullName -replace [regex]::Escape((Get-Location).Path + "\"), ""
        }
    }
}

Write-Host ""
Write-Host "Releases : $($releaseSet.Count) files" -ForegroundColor White
Write-Host "Content  : $($contentSet.Count) references" -ForegroundColor White
Write-Host ""

# Orphans: in Releases but not referenced in any post
$orphans = $releaseSet | Where-Object { -not $contentSet.Contains($_) } | Sort-Object
if ($orphans) {
    Write-Host "[ORPHAN] In Releases but not referenced in content ($($orphans.Count)):" -ForegroundColor Yellow
    $orphans | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "[OK] No orphan files" -ForegroundColor Green
}

Write-Host ""

# Broken links: referenced in content but not in Releases
$broken = $contentSet | Where-Object { -not $releaseSet.Contains($_) } | Sort-Object
if ($broken) {
    Write-Host "[BROKEN] Referenced in content but missing from Releases ($($broken.Count)):" -ForegroundColor Red
    $broken | ForEach-Object { Write-Host "  $($refMap[$_]) | $_" }
} else {
    Write-Host "[OK] No broken links" -ForegroundColor Green
}
