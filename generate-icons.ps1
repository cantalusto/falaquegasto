# Script para gerar ícones PWA do emoji 💸
# Este script cria ícones PNG a partir do emoji usando HTML Canvas

$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gerador de Ícones</title>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        function generateIcon(size, filename) {
            const canvas = document.getElementById('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            // Fundo gradiente
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
            
            // Emoji
            ctx.font = (size * 0.6) + 'px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('💸', size/2, size/2);
            
            // Download
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                URL.revokeObjectURL(url);
            });
        }
        
        // Gerar ícones
        setTimeout(() => generateIcon(192, 'icon-192.png'), 100);
        setTimeout(() => generateIcon(512, 'icon-512.png'), 500);
        setTimeout(() => alert('Ícones gerados! Salve na pasta public/'), 1000);
    </script>
</body>
</html>
"@

# Criar arquivo HTML temporário
$tempFile = "$PSScriptRoot\temp-icon-generator.html"
$html | Out-File -FilePath $tempFile -Encoding UTF8

Write-Host "🎨 Abrindo gerador de ícones no navegador..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Instruções:" -ForegroundColor Yellow
Write-Host "1. Dois arquivos serão baixados: icon-192.png e icon-512.png"
Write-Host "2. Mova os arquivos para a pasta 'public/'"
Write-Host "3. Feche o navegador quando terminar"
Write-Host ""

# Abrir no navegador
Start-Process $tempFile

# Aguardar usuário
Write-Host "Pressione qualquer tecla após salvar os ícones para limpar o arquivo temporário..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Limpar
Remove-Item $tempFile -ErrorAction SilentlyContinue
Write-Host "✅ Concluído!" -ForegroundColor Green
