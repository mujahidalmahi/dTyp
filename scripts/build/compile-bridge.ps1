$cscPath = "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
$sourcePath = "apps\desktop\windows\dtyp-bridge.cs"
$outputPath = "apps\desktop\windows\dtyp-bridge.exe"

if (!(Test-Path $cscPath)) {
    Write-Warning "csc.exe not found at $cscPath, falling back to 32-bit compiler"
    $cscPath = "C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe"
}

Write-Host "Compiling dTyp Windows Bridge from $sourcePath to $outputPath..."
& $cscPath /target:exe /platform:anycpu /optimize+ "/out:$outputPath" "$sourcePath"

if ($LASTEXITCODE -eq 0) {
    Write-Host "dTyp Windows Bridge compiled successfully!" -ForegroundColor Green
} else {
    Write-Error "Compilation failed with exit code $LASTEXITCODE"
}
