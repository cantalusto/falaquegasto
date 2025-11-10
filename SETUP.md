# FalaQueGasto - Configuração Inicial

## ⚡ Início Rápido (5 minutos)

### Windows PowerShell:

```powershell
# 1. Entre na pasta do projeto
cd c:\dev\falaquegasto

# 2. Execute o script de setup
.\setup.ps1

# 3. Configure o arquivo .env com suas credenciais

# 4. Inicie o servidor
npm run dev

# 5. Abra http://localhost:3000
```

## 📋 Checklist de Configuração

### Antes de começar, você precisa de:

- [ ] Node.js instalado (v18 ou superior)
- [ ] Conta no Supabase (gratuita)
- [ ] Chave da API do Google Gemini (gratuita)
- [ ] Conta no Vercel (gratuita, opcional)

### Passo a passo:

1. **Instalar dependências**
   ```powershell
   npm install
   ```

2. **Configurar Supabase**
   - Criar projeto no https://supabase.com
   - Executar SQL em `database.md`
   - Copiar URL e chave anon

3. **Configurar Gemini**
   - Obter chave em https://ai.google.dev/
   - Copiar API key

4. **Configurar .env**
   ```env
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_aqui
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```

5. **Testar localmente**
   ```powershell
   npm run dev
   ```

6. **Deploy no Vercel**
   - Seguir instruções em `DEPLOY.md`

## 🛠️ Comandos Úteis

```powershell
# Desenvolvimento
npm run dev          # Inicia servidor local (porta 3000)

# Build
npm run build        # Cria build de produção

# Preview
npm run preview      # Testa build de produção localmente

# Deploy
vercel               # Deploy no Vercel (staging)
vercel --prod        # Deploy em produção
```

## 📁 Estrutura de Arquivos

```
falaquegasto/
├── public/              # Arquivos públicos (ícones, etc)
├── src/
│   ├── components/      # Componentes React
│   │   ├── Header.jsx
│   │   ├── MicButton.jsx
│   │   └── GastosList.jsx
│   ├── pages/           # Páginas
│   │   ├── Home.jsx
│   │   └── Relatorios.jsx
│   ├── services/        # Serviços (API, storage)
│   │   ├── supabase.js
│   │   ├── gemini.js
│   │   ├── storage.js
│   │   └── voice.js
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Entry point
├── .env                 # Variáveis de ambiente (NÃO comitar!)
├── .env.example         # Exemplo de variáveis
├── package.json         # Dependências
├── vite.config.js       # Configuração do Vite
├── vercel.json          # Configuração do Vercel
├── README.md            # Este arquivo
├── DEPLOY.md            # Guia de deploy
├── MANUAL.md            # Manual do usuário
└── database.md          # Scripts SQL
```

## 🔑 Variáveis de Ambiente

### Desenvolvimento (.env):
```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=sua_chave_local
VITE_GEMINI_API_KEY=sua_chave_dev
```

### Produção (Vercel):
Configure as mesmas variáveis no dashboard do Vercel.

## 🐛 Troubleshooting

### "Cannot find module"
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### "Port 3000 already in use"
```powershell
# Matar processo na porta 3000
npx kill-port 3000

# Ou usar outra porta
npm run dev -- --port 3001
```

### "Vite: command not found"
```powershell
npm install
```

### Erro no build
```powershell
# Limpar cache e rebuildar
npm run build -- --force
```

## 📖 Documentação Adicional

- **README.md** - Visão geral e features
- **DEPLOY.md** - Guia completo de deploy
- **MANUAL.md** - Manual para o usuário final
- **database.md** - Scripts e consultas SQL
- **CHANGELOG.md** - Histórico de versões

## 🆘 Precisa de Ajuda?

1. Verifique os arquivos de documentação
2. Veja os exemplos em `database.md`
3. Verifique o console do navegador (F12)
4. Verifique os logs do Vercel

## ✅ Tudo Pronto?

Quando tudo estiver configurado:

1. ✅ Dependências instaladas
2. ✅ .env configurado
3. ✅ Banco de dados criado
4. ✅ Servidor local funcionando
5. ✅ Testado no navegador

**Próximo passo**: Faça o deploy no Vercel seguindo `DEPLOY.md`!

---

**Versão**: 1.0.0  
**Última atualização**: 09/11/2025
