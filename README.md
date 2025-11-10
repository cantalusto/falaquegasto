# FalaQueGasto 💸

> Um PWA simples e intuitivo para registrar gastos por voz usando React, Vite, Supabase e Google Gemini.

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📚 Documentação Completa

### 🎯 Comece Aqui
- 🚀 **[QUICKSTART.md](QUICKSTART.md)** - Início rápido em 5 minutos ⭐
- 📂 **[STRUCTURE.md](STRUCTURE.md)** - Estrutura completa do projeto

### 📖 Guias Técnicos
- 📖 **[PROJECT.md](PROJECT.md)** - Visão geral completa do projeto
- 🛠️ **[SETUP.md](SETUP.md)** - Guia de configuração detalhado
- 🌐 **[DEPLOY.md](DEPLOY.md)** - Deploy no Vercel passo a passo
- 🧪 **[TESTING.md](TESTING.md)** - Guia de testes e QA

### 👨‍💼 Para o Usuário Final
- 👨‍💼 **[MANUAL.md](MANUAL.md)** - Manual do usuário final
- 💬 **[EXAMPLES.md](EXAMPLES.md)** - Exemplos de uso e frases

### 🔧 Recursos Adicionais
- 🎨 **[ICONS.md](ICONS.md)** - Geração de ícones PWA
- 💾 **[database.md](database.md)** - Scripts SQL do Supabase
- ✅ **[CHECKLIST.md](CHECKLIST.md)** - Checklist de implementação
- 📝 **[CHANGELOG.md](CHANGELOG.md)** - Histórico de versões

---

## ⚡ Início Rápido

```powershell
# 1. Instalar dependências
npm install

# 2. Configurar .env (copie de .env.example)
copy .env.example .env
notepad .env

# 3. Rodar localmente
npm run dev

# 4. Acessar
# http://localhost:3000
```

**📖 Para setup completo, leia: [QUICKSTART.md](QUICKSTART.md)**

---

## 🚀 Características

- ✅ **PWA** - Instalável no celular como aplicativo
- 🎤 **Reconhecimento de voz** - Registre gastos falando
- 🤖 **IA do Gemini** - Interpreta automaticamente descrição, valor e categoria
- 💾 **Offline First** - Funciona sem internet e sincroniza quando voltar online
- 📊 **Relatórios visuais** - Gráficos de pizza e barras por categoria
- 🎨 **Design limpo** - Interface minimalista em azul claro e branco

## 📋 Pré-requisitos

1. **Conta no Supabase** (gratuita)
2. **Chave da API do Google Gemini** (gratuita)
3. **Conta no Vercel** (gratuita)

## 🗄️ Configuração do Banco de Dados (Supabase)

### 1. Criar conta no Supabase
- Acesse [supabase.com](https://supabase.com)
- Crie uma conta gratuita
- Crie um novo projeto

### 2. Criar a tabela `gastos`

No SQL Editor do Supabase, execute:

```sql
CREATE TABLE gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  data TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhorar performance
CREATE INDEX idx_gastos_data ON gastos(data DESC);

-- Habilitar RLS (Row Level Security) - opcional para uso pessoal
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas as operações (uso pessoal)
CREATE POLICY "Enable all operations for all users" ON gastos
  FOR ALL USING (true);
```

### 3. Obter as credenciais

No Supabase, vá em **Settings → API** e copie:
- `Project URL` (será o `VITE_SUPABASE_URL`)
- `anon/public` key (será o `VITE_SUPABASE_ANON_KEY`)

## 🤖 Configuração da API do Google Gemini

### 1. Obter a chave da API
- Acesse [ai.google.dev](https://ai.google.dev/)
- Clique em "Get API key"
- Crie uma nova chave de API
- Copie a chave (será o `VITE_GEMINI_API_KEY`)

## 🛠️ Instalação Local

### 1. Clone ou baixe o projeto

```powershell
cd c:\dev\falaquegasto
```

### 2. Instale as dependências

```powershell
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### 4. Execute o projeto localmente

```powershell
npm run dev
```

Acesse `http://localhost:3000` no navegador.

## 🌐 Deploy no Vercel

### 1. Instalar Vercel CLI (opcional)

```powershell
npm install -g vercel
```

### 2. Deploy via CLI

```powershell
vercel
```

Siga as instruções interativas.

### 3. Deploy via Dashboard (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Crie uma conta (pode usar sua conta do GitHub)
3. Clique em "Add New Project"
4. Importe o repositório do GitHub ou faça upload do projeto
5. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
6. Clique em "Deploy"

### 4. Configurar domínio personalizado (opcional)

No Vercel Dashboard:
- Vá em Settings → Domains
- Adicione um domínio personalizado

## 📱 Instalação no Celular

### Android (Chrome)
1. Abra o site no Chrome
2. Toque no menu (⋮)
3. Selecione "Adicionar à tela inicial"
4. Confirme

### iOS (Safari)
1. Abra o site no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"
4. Confirme

## 🎤 Como Usar

### Registrar um gasto por voz:
1. Clique no botão do microfone (🎤) no canto inferior direito
2. Fale o gasto, por exemplo:
   - "Comprei uma coca cola no mercado por 5 reais"
   - "Gastei 10 reais com passagem de ônibus"
   - "Pizza 40 reais"
3. O app vai interpretar automaticamente e salvar

### Ver relatórios:
1. Clique no botão "📊 Relatórios"
2. Veja o total do dia e do mês
3. Visualize gráficos por categoria

## 🏗️ Estrutura do Projeto

```
falaquegasto/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── MicButton.jsx
│   │   ├── MicButton.css
│   │   ├── GastosList.jsx
│   │   └── GastosList.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Relatorios.jsx
│   │   └── Relatorios.css
│   ├── services/
│   │   ├── supabase.js
│   │   ├── gemini.js
│   │   ├── storage.js
│   │   └── voice.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
├── package.json
├── vercel.json
└── README.md
```

## 🔧 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para UI
- **Vite** - Build tool ultrarrápido
- **React Router** - Roteamento
- **Supabase** - Banco de dados PostgreSQL
- **Google Gemini** - IA para interpretação de texto
- **Chart.js** - Gráficos interativos
- **Web Speech API** - Reconhecimento de voz
- **Service Worker** - Cache offline
- **LocalStorage** - Armazenamento local

## 📝 Categorias Suportadas

- 🍔 Alimentação
- 🚌 Transporte
- 💊 Saúde
- 🎮 Lazer
- 🛒 Mercado
- 📄 Contas
- 📦 Outros

## 🐛 Solução de Problemas

### Reconhecimento de voz não funciona
- Use Chrome ou Edge (Safari tem suporte limitado)
- Permita o acesso ao microfone quando solicitado
- Verifique se o microfone está funcionando

### Dados não sincronizam
- Verifique sua conexão com a internet
- Verifique se as credenciais do Supabase estão corretas
- Veja o console do navegador (F12) para erros

### Gemini não interpreta corretamente
- Fale de forma clara e pausada
- Tente incluir o valor em reais
- Exemplo: "Comprei pão por 10 reais"

## 📄 Licença

Este projeto é de uso pessoal e educacional.

## 🙏 Créditos

Desenvolvido para facilitar o controle de gastos do dia a dia.

---

**Feito com ❤️ usando React + Vite + Supabase + Gemini**
