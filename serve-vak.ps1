# Simple HTTP Server for VAK folder
$port = 3998
$folder = "VAK"

# Check if folder exists
if (-not (Test-Path $folder)) {
  Write-Host "Folder '$folder' not found!"
  exit 1
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
  $listener.Start()
  Write-Host "Server started on http://localhost:$port/"
  Write-Host "Serving files from $folder"

  while ($true) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $requestPath = $request.Url.LocalPath
    if ($requestPath -eq "/") {
      $requestPath = "/index.html"
    }

    $filePath = Join-Path $folder $requestPath.TrimStart("/")
    $filePath = $filePath.Replace("/", "\")

    if (Test-Path $filePath -PathType Leaf) {
      $content = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = Get-MimeType $filePath
      $response.ContentLength64 = $content.Length
      $response.OutputStream.Write($content, 0, $content.Length)
      Write-Host "200 GET $requestPath"
    } else {
      $response.StatusCode = 404
      $response.ContentType = "text/plain"
      $message = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $requestPath")
      $response.OutputStream.Write($message, 0, $message.Length)
      Write-Host "404 GET $requestPath"
    }

    $response.Close()
  }
} catch {
  Write-Host "Error: $_"
} finally {
  $listener.Close()
}

function Get-MimeType {
  param([string]$path)

  $ext = [System.IO.Path]::GetExtension($path).ToLower()

  $mimeTypes = @{
    ".html" = "text/html"
    ".htm" = "text/html"
    ".css" = "text/css"
    ".js" = "application/javascript"
    ".json" = "application/json"
    ".png" = "image/png"
    ".jpg" = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif" = "image/gif"
    ".svg" = "image/svg+xml"
    ".ico" = "image/x-icon"
  }

  return $mimeTypes[$ext] -or "text/plain"
}
