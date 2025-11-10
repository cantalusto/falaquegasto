# 🚀 Guia Rápido de Deploy - FalaQueGasto

## ✅ Checklist Antes do Deploy

- [ ] Criar conta no Supabase
- [ ] Criar tabela `gastos` no banco de dados
- [ ] Obter chave da API do Gemini
- [ ] Criar conta no Vercel
- [ ] Ter o projeto pronto localmente

---

## 📝 Passo a Passo Completo

### 1️⃣ Configurar Supabase (5 minutos)

#### Criar conta e projeto
1. Acesse https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub
4. Clique em "New project"
5. Preencha:
   - **Name**: falaquegasto
   - **Database Password**: (anote a senha)
   - **Region**: South America (ou mais próximo)
6. Clique em "Create new project" (aguarde ~2 minutos)

#### Criar tabela gastos
1. No menu lateral, clique em **SQL Editor**
2. Cole o seguinte SQL:

```sql
CREATE TABLE gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  data TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_gastos_data ON gastos(data DESC);

ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for all users" ON gastos
  FOR ALL USING (true);
```

3. Clique em **RUN** (canto inferior direito)
4. Você verá "Success. No rows returned"

#### Copiar credenciais
1. No menu lateral, clique em **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xxxxxxxxxxx.supabase.co`)
   - **anon public** key (chave longa começando com `eyJ...`)

---

### 2️⃣ Configurar Google Gemini (2 minutos)

1. Acesse https://ai.google.dev/
2. Clique em **"Get API Key"** (canto superior direito)
3. Clique em **"Create API key in new project"**
4. Copie a chave (começa com `AIza...`)

**⚠️ Importante**: Esta chave tem limite gratuito de 60 requisições por minuto (mais que suficiente para uso pessoal)

---

### 3️⃣ Testar Localmente (Opcional mas Recomendado)

1. Abra o PowerShell na pasta do projeto:
```powershell
cd c:\dev\falaquegasto
```

2. Crie o arquivo `.env`:
```powershell
New-Item -Path .env -ItemType File
notepad .env
```

3. Cole no arquivo:
```env
VITE_SUPABASE_URL=https://seu-projeto-aqui.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

4. Instale as dependências:
```powershell
npm install
```

5. Inicie o servidor:
```powershell
npm run dev
```

6. Abra http://localhost:3000 e teste!

---

### 4️⃣ Deploy no Vercel (3 minutos)

#### Opção A: Via Dashboard (Mais Fácil)

1. Acesse https://vercel.com
2. Clique em **"Sign Up"** (use conta do GitHub)
3. Clique em **"Add New..."** → **"Project"**
4. Se o projeto estiver no GitHub:
   - Clique em **"Import Git Repository"**
   - Selecione o repositório
5. Se o projeto estiver local:
   - Suba para o GitHub primeiro OU
   - Use a Vercel CLI (veja Opção B)

6. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (deixar vazio)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

7. Clique em **"Environment Variables"** e adicione:
   ```
   VITE_SUPABASE_URL = https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY = sua_chave_anon
   VITE_GEMINI_API_KEY = sua_chave_gemini
   ```

8. Clique em **"Deploy"**

9. Aguarde ~2 minutos e pronto! 🎉

#### Opção B: Via CLI

1. Instale a Vercel CLI:
```powershell
npm install -g vercel
```

2. Faça login:
```powershell
vercel login
```

3. Na pasta do projeto, execute:
```powershell
vercel
```

4. Responda as perguntas:
   - Set up and deploy? **Y**
   - Which scope? (sua conta)
   - Link to existing project? **N**
   - Project name? **falaquegasto**
   - In which directory? **./`** (deixe vazio)
   - Want to override settings? **N**

5. Configure as variáveis de ambiente:
```powershell
vercel env add VITE_SUPABASE_URL
# Cole o valor e pressione Enter

vercel env add VITE_SUPABASE_ANON_KEY
# Cole o valor e pressione Enter

vercel env add VITE_GEMINI_API_KEY
# Cole o valor e pressione Enter
```

6. Faça o deploy de produção:
```powershell
vercel --prod
```

---

### 5️⃣ Instalar no Celular

Quando o deploy terminar, você receberá uma URL tipo:
`https://falaquegasto.vercel.app`

#### Android (Chrome)
1. Abra a URL no Chrome
2. Menu (⋮) → **"Adicionar à tela inicial"**
3. Confirme

#### iOS (Safari)
1. Abra a URL no Safari
2. Botão compartilhar → **"Adicionar à Tela de Início"**
3. Confirme

---

## 🎯 Testar o App

1. **Permitir microfone**: O navegador vai pedir permissão
2. **Testar voz**: Clique no botão 🎤 e diga:
   - "Comprei pão por 5 reais"
   - "Gastei 20 reais com Uber"
3. **Ver gasto**: Deve aparecer na lista
4. **Ver relatório**: Clique em "📊 Relatórios"

---

## 🔧 Atualizar o Deploy

### Se fizer mudanças no código:

**Via Vercel Dashboard:**
- O Vercel detecta mudanças no GitHub automaticamente
- Ou clique em "Redeploy" no dashboard

**Via CLI:**
```powershell
vercel --prod
```

---

## 🆘 Problemas Comuns

### ❌ "Erro ao conectar com Supabase"
- Verifique se a URL e chave estão corretas
- Verifique se a tabela `gastos` foi criada
- Verifique se as variáveis de ambiente estão configuradas no Vercel

### ❌ "Erro ao interpretar gasto"
- Verifique se a chave do Gemini está correta
- Verifique se não excedeu o limite de requisições (60/min)
- Tente novamente após alguns segundos

### ❌ "Microfone não funciona"
- Use Chrome ou Edge (Safari tem suporte limitado)
- Permita acesso ao microfone
- Em produção, o site DEVE usar HTTPS (Vercel já faz isso)

### ❌ "PWA não instala"
- Verifique se está acessando via HTTPS
- Limpe o cache do navegador
- Tente em modo anônimo primeiro

---

## 💰 Custos

✅ **TUDO É GRATUITO!**

- **Supabase**: 500 MB de dados grátis
- **Gemini**: 60 requisições/minuto grátis
- **Vercel**: 100 GB de banda grátis/mês

Para uso pessoal, nunca precisará pagar! 🎉

---

## 📧 Suporte

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs no Vercel Dashboard
3. Revise as variáveis de ambiente

---

**🎉 Pronto! Seu app está no ar!**

Compartilhe a URL com seu pai: `https://seu-projeto.vercel.app`
