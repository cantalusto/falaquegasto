# Script para gerar ícones PWA
# Execute este script para criar os ícones necessários

# Este é um arquivo de exemplo. Para gerar os ícones reais, você pode:

# 1. Usar um serviço online como:
#    - https://realfavicongenerator.net/
#    - https://www.pwabuilder.com/imageGenerator

# 2. Ou usar ImageMagick localmente:
#    convert icon.svg -resize 192x192 pwa-192x192.png
#    convert icon.svg -resize 512x512 pwa-512x512.png

# Por enquanto, você pode usar emojis ou criar ícones simples

Write-Host "Para gerar ícones PWA profissionais:"
Write-Host "1. Acesse: https://realfavicongenerator.net/"
Write-Host "2. Faça upload do arquivo 'public/icon.svg'"
Write-Host "3. Baixe os ícones gerados"
Write-Host "4. Coloque-os na pasta 'public/'"
Write-Host ""
Write-Host "Ícones necessários:"
Write-Host "  - pwa-192x192.png"
Write-Host "  - pwa-512x512.png"
Write-Host "  - apple-touch-icon.png (180x180)"
Write-Host "  - favicon.ico"
