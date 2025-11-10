# ⚡ INÍCIO RÁPIDO - FalaQueGasto

## 🚀 5 Minutos para Rodar Localmente

### 1️⃣ Pré-requisitos (1 min)
```powershell
# Verificar Node.js
node --version  # Deve ser v18+
```
Se não tiver Node.js: https://nodejs.org/

---

### 2️⃣ Instalação (2 min)
```powershell
# Entre na pasta
cd c:\dev\falaquegasto

# Instale dependências
npm install
```

---

### 3️⃣ Configuração (2 min)

#### Criar arquivo .env:
```powershell
copy .env.example .env
notepad .env
```

#### Configurar credenciais temporárias:
```env
# Para testar SEM Supabase/Gemini (apenas UI)
VITE_SUPABASE_URL=http://localhost
VITE_SUPABASE_ANON_KEY=test
VITE_GEMINI_API_KEY=test
```

**⚠️ Para funcionar completamente, você precisa das credenciais reais!**

---

### 4️⃣ Rodar (30 seg)
```powershell
npm run dev
```

### 5️⃣ Acessar
Abra: http://localhost:3000

✅ **Pronto! App rodando!**

---

## 🔧 Setup Completo (30 minutos)

### 1. Criar Conta no Supabase (5 min)
1. Acesse https://supabase.com
2. Crie conta (GitHub login)
3. Crie novo projeto (aguarde ~2 min)

### 2. Configurar Banco (5 min)
1. Abra **SQL Editor**
2. Cole o SQL de `database.md`:
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

CREATE POLICY "Enable all operations" ON gastos
  FOR ALL USING (true);
```
3. Clique **RUN**

### 3. Copiar Credenciais Supabase (2 min)
1. **Settings** → **API**
2. Copie:
   - **Project URL**
   - **anon public key**

### 4. Criar API Key do Gemini (5 min)
1. Acesse https://ai.google.dev/
2. Clique **Get API Key**
3. Crie em novo projeto
4. Copie a chave

### 5. Configurar .env (1 min)
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 6. Testar (2 min)
```powershell
npm run dev
```
1. Abra http://localhost:3000
2. Clique no 🎤
3. Permita microfone
4. Fale: "Comprei pão por 5 reais"
5. ✅ Deve aparecer na lista!

### 7. Deploy no Vercel (10 min)

#### Opção A: Via Dashboard
1. Acesse https://vercel.com
2. **Add New Project**
3. Importe do GitHub
4. Configure variáveis de ambiente (mesmas do .env)
5. **Deploy**

#### Opção B: Via CLI
```powershell
npm install -g vercel
vercel login
vercel
# Configure as variáveis quando solicitado
vercel --prod
```

---

## 🎯 Ordem Recomendada de Leitura

1. ✅ **Você está aqui!** (QUICKSTART.md)
2. 📖 **PROJECT.md** - Entender o projeto
3. 🛠️ **SETUP.md** - Setup detalhado
4. 🚀 **DEPLOY.md** - Deploy no Vercel
5. 👨‍💼 **MANUAL.md** - Manual do usuário final
6. 🧪 **TESTING.md** - Como testar

---

## ⚡ Comandos Úteis

```powershell
# Desenvolvimento
npm run dev              # Servidor local (porta 3000)

# Build
npm run build           # Build de produção

# Preview
npm run preview         # Testar build localmente

# Deploy
vercel                  # Deploy staging
vercel --prod           # Deploy produção

# Troubleshooting
npm install             # Reinstalar dependências
npx kill-port 3000      # Matar processo na porta 3000
```

---

## 🐛 Problemas Comuns

### ❌ "Cannot find module"
```powershell
rm -r node_modules
npm install
```

### ❌ "Port 3000 in use"
```powershell
npx kill-port 3000
npm run dev
```

### ❌ "Microfone não funciona"
- Use Chrome ou Edge
- Permita acesso ao microfone
- Em produção, DEVE ter HTTPS

### ❌ "Erro ao conectar Supabase"
- Verifique .env
- Verifique se a tabela foi criada
- Verifique se RLS está configurado

---

## 📚 Recursos

### Documentação:
- **README.md** - Visão geral
- **PROJECT.md** - Resumo técnico
- **SETUP.md** - Setup completo
- **DEPLOY.md** - Deploy passo a passo
- **MANUAL.md** - Manual do usuário
- **TESTING.md** - Como testar
- **ICONS.md** - Gerar ícones PWA
- **database.md** - Scripts SQL

### Scripts Úteis:
- **setup.ps1** - Setup automático
- **generate-icons.ps1** - Instruções de ícones

### Links Importantes:
- Supabase: https://supabase.com
- Gemini: https://ai.google.dev/
- Vercel: https://vercel.com
- Node.js: https://nodejs.org/

---

## ✨ Próximos Passos

### Para Desenvolvimento:
1. ✅ Rodar localmente
2. ✅ Testar funcionalidades
3. ✅ Customizar design
4. ✅ Fazer deploy

### Para Produção:
1. ✅ Configurar credenciais reais
2. ✅ Gerar ícones profissionais (ICONS.md)
3. ✅ Testar em dispositivos móveis
4. ✅ Instalar no celular do usuário

---

## 🎉 Tudo Pronto!

O projeto está **100% funcional** e pronto para uso!

**Dúvidas?** Consulte a documentação completa.

**Problemas?** Verifique TESTING.md e os logs do console.

---

**Desenvolvido com ❤️**  
**Versão**: 1.0.0  
**Data**: 09/11/2025
