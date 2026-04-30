param(
  [string]$Message = "Update website"
)

$ErrorActionPreference = "Stop"

$git = Get-Command git -ErrorAction SilentlyContinue
if ($git) {
  $gitExe = $git.Source
} elseif (Test-Path "C:\Program Files\Git\cmd\git.exe") {
  $gitExe = "C:\Program Files\Git\cmd\git.exe"
} else {
  throw "Git nerastas. Įdiek Git for Windows arba pridėk git į PATH."
}

& $gitExe status --short
& $gitExe add -A

$changes = & $gitExe status --short
if (-not $changes) {
  Write-Host "Nėra pakeitimų commitinimui."
  exit 0
}

& $gitExe commit -m $Message
& $gitExe push origin main
& $gitExe status --short
