$root = $PSScriptRoot
$port = 4010
$prefix = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving $root on $prefix"

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".json" = "application/json; charset=utf-8"
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
  } catch { continue }

  $req = $ctx.Request
  $res = $ctx.Response

  try {
    $localPath = $req.Url.LocalPath -replace "/", "\"
    if ($localPath -eq "\") { $localPath = "\index.html" }
    $filePath = Join-Path $root $localPath.TrimStart("\")

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath)
      $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $res.ContentType = $mime
      $res.ContentLength64 = $bytes.LongLength
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      $res.StatusCode = 404
      $res.ContentLength64 = $msg.LongLength
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
  } catch {
    # ignore per-request errors, keep server running
  } finally {
    try { $res.OutputStream.Close() } catch {}
  }
}
