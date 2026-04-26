$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 3000
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
$listener.Start()
Write-Host "MB Plieno kodas svetainė veikia: http://localhost:$port/"

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".mp4"  = "video/mp4"
}

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
    $requestLine = $reader.ReadLine()

    while ($reader.ReadLine()) {}

    if (-not $requestLine) {
      continue
    }

    $parts = $requestLine.Split(" ")
    $method = $parts[0]
    $rawPath = $parts[1]

    if ($method -ne "GET" -and $method -ne "HEAD") {
      $body = [System.Text.Encoding]::UTF8.GetBytes("Method not allowed")
      $header = "HTTP/1.1 405 Method Not Allowed`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      $stream.Write([System.Text.Encoding]::ASCII.GetBytes($header), 0, $header.Length)
      if ($method -ne "HEAD") { $stream.Write($body, 0, $body.Length) }
      continue
    }

    $path = [System.Uri]::UnescapeDataString(($rawPath.Split("?")[0]))
    if ($path -eq "/") { $path = "/index.html" }
    $relativePath = $path.TrimStart("/") -replace "/", [System.IO.Path]::DirectorySeparatorChar
    $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $relativePath))
    $rootPath = [System.IO.Path]::GetFullPath($root)

    if ([System.IO.Directory]::Exists($filePath)) {
      $filePath = [System.IO.Path]::Combine($filePath, "index.html")
    }

    if (-not $filePath.StartsWith($rootPath) -or -not [System.IO.File]::Exists($filePath)) {
      $body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      $stream.Write([System.Text.Encoding]::ASCII.GetBytes($header), 0, $header.Length)
      if ($method -ne "HEAD") { $stream.Write($body, 0, $body.Length) }
      continue
    }

    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
    $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }
    $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"

    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    if ($method -ne "HEAD") {
      $stream.Write($bytes, 0, $bytes.Length)
    }
  }
  finally {
    $client.Close()
  }
}
