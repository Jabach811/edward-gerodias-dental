$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$publish = Join-Path $root 'assets/source/publish-candidate'
$reference = Join-Path $root 'assets/source/reference-only'
$fonts = Join-Path $root 'assets/fonts'
New-Item -ItemType Directory -Force -Path $publish, $reference, $fonts | Out-Null

$assets = @(
  @{
    Url = 'https://smilereminder.com/subfiles/48415/providers/36689d3c-f663-4e47-a300-071753131474.png'
    Out = Join-Path $publish 'dr-edward-gerodias-scheduler.png'
  },
  @{
    Url = 'https://s.yimg.com/bj/4ec1/4ec12c7b6a7535083f854c9b8e2c2e59.jpg'
    Out = Join-Path $reference 'yahoo-practice-banner.jpg'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf'
    Out = Join-Path $fonts 'dm-sans-400.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTg.ttf'
    Out = Join-Path $fonts 'dm-sans-500.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTg.ttf'
    Out = Join-Path $fonts 'dm-sans-600.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADA.ttf'
    Out = Join-Path $fonts 'newsreader-400.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wSo_ADA.ttf'
    Out = Join-Path $fonts 'newsreader-500.ttf'
  },
  @{
    Url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/OFL.txt'
    Out = Join-Path $fonts 'LICENSE-DM-SANS.txt'
  },
  @{
    Url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt'
    Out = Join-Path $fonts 'LICENSE-NEWSREADER.txt'
  }
)

foreach ($asset in $assets) {
  Invoke-WebRequest -UseBasicParsing -Uri $asset.Url -OutFile $asset.Out
  if ((Get-Item -LiteralPath $asset.Out).Length -lt 1024) {
    throw "Downloaded asset is unexpectedly small: $($asset.Out)"
  }
}
