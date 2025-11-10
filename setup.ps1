# 🚀 Script de Inicialização Rápida

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   FalaQueGasto - Setup Rápido" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o Node.js está instalado
Write-Host "🔍 Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "   Instale em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Verificar se as dependências estão instaladas
Write-Host "🔍 Verificando dependências..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ Dependências já instaladas" -ForegroundColor Green
} else {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Verificar arquivo .env
Write-Host "🔍 Verificando configuração..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ Arquivo .env encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Arquivo .env não encontrado!" -ForegroundColor Yellow
    Write-Host "   Criando .env a partir do .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "   📝 IMPORTANTE: Edite o arquivo .env com suas credenciais!" -ForegroundColor Red
    Write-Host "   1. Abra o arquivo .env" -ForegroundColor Yellow
    Write-Host "   2. Configure as variáveis do Supabase e Gemini" -ForegroundColor Yellow
    Write-Host "   3. Salve o arquivo" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "   Deseja abrir o .env agora? (s/n)"
    if ($continue -eq "s" -or $continue -eq "S") {
        notepad .env
    }
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   ✅ Setup Completo!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Próximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Configure o .env (se ainda não fez)" -ForegroundColor White
Write-Host "   - VITE_SUPABASE_URL" -ForegroundColor Gray
Write-Host "   - VITE_SUPABASE_ANON_KEY" -ForegroundColor Gray
Write-Host "   - VITE_GEMINI_API_KEY" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Inicie o servidor de desenvolvimento:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "3️⃣  Acesse no navegador:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Documentação completa:" -ForegroundColor Yellow
Write-Host "   - README.md - Visão geral do projeto" -ForegroundColor Gray
Write-Host "   - DEPLOY.md - Guia de deploy no Vercel" -ForegroundColor Gray
Write-Host "   - MANUAL.md - Manual do usuário" -ForegroundColor Gray
Write-Host "   - database.md - Scripts SQL" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Boa sorte com seu projeto!" -ForegroundColor Green
Write-Host ""
