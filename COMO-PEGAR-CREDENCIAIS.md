# 🔑 Como Obter as Credenciais do Supabase

## Passo a Passo:

### 1. Acesse seu projeto no Supabase
- Vá em: https://supabase.com/dashboard
- Entre no projeto: **namamthmlxeicrdjylfy**

### 2. Pegue a URL e a Chave Anon
1. No menu lateral, clique em **Settings** (⚙️)
2. Clique em **API**
3. Você verá duas informações importantes:

#### Project URL:
```
https://namamthmlxeicrdjylfy.supabase.co
```
✅ Já configurei esta!

#### anon/public key:
Copie a chave que está em **"anon" "public"**
Ela começa com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**⚠️ IMPORTANTE**: 
- NÃO use a senha do banco (32280882)
- Use a chave "anon" que aparece no dashboard

### 3. Criar a Tabela no Banco

No Supabase, vá em **SQL Editor** e execute:

```sql
-- Criar tabela gastos
CREATE TABLE gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  data TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice
CREATE INDEX idx_gastos_data ON gastos(data DESC);

-- Habilitar RLS
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

-- Permitir acesso
CREATE POLICY "Enable all operations for all users" ON gastos
  FOR ALL USING (true);
```

Clique em **RUN** para executar.

### 4. Atualizar o .env

Depois de pegar a anon key, me envie e eu atualizo o arquivo .env para você!

---

## ✅ Já Configurado:
- ✅ Gemini API Key: AIzaSyAPYXDimi4qxZDSF_HXHgGi9FJRu8Fdh58
- ✅ Supabase URL: https://namamthmlxeicrdjylfy.supabase.co
- ⏳ Falta: Supabase Anon Key (copiar do dashboard)

---

## 🚀 Quando Tiver Tudo:

```powershell
# Instalar dependências
npm install

# Rodar o projeto
npm run dev

# Acessar
# http://localhost:3000
```

---

**Me envie a anon key do Supabase que eu finalizo a configuração!** 🔑
