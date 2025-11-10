# 🚀 Guia de Deploy - FalaQueGasto

## ✅ Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se de que:

- [x] Todos os arquivos `.md` desnecessários foram removidos
- [x] `.env` está no `.gitignore`
- [x] `.env.example` está presente no repositório
- [x] `README.md` está atualizado
- [x] Projeto compila sem erros (`npm run build`)
- [x] Credenciais do Supabase e Gemini estão funcionando

---

## 📦 Passo 1: Preparar o Repositório GitHub

### 1.1 Inicializar Git (se ainda não estiver)

```bash
git init
git add .
git commit -m "Initial commit - FalaQueGasto v2.0"
```

### 1.2 Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome: `falaquegasto`
3. Descrição: `App conversacional para controle de gastos com IA`
4. Público ou Privado (sua escolha)
5. **NÃO** marque "Add README" (já temos um)
6. Clique em "Create repository"

### 1.3 Conectar e Fazer Push

```bash
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/falaquegasto.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu username do GitHub.

---

## 🌐 Passo 2: Deploy no Vercel

### 2.1 Acessar o Vercel

1. Vá para [vercel.com](https://vercel.com)
2. Faça login com sua conta do GitHub
3. Autorize o Vercel a acessar seus repositórios

### 2.2 Importar Projeto

1. Clique em **"Add New Project"**
2. Selecione o repositório `falaquegasto`
3. Clique em **"Import"**

### 2.3 Configurar Projeto

#### Framework Preset
- Vercel detectará automaticamente: **Vite**
- Deixe as configurações padrão

#### Build & Output Settings
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 2.4 Adicionar Environment Variables

Clique em **"Environment Variables"** e adicione:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://seu-projeto.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `sua_chave_anonima_do_supabase` |
| `VITE_GEMINI_API_KEY` | `sua_chave_da_api_gemini` |

**⚠️ IMPORTANTE:** 
- Copie e cole diretamente do Supabase/Gemini
- Não inclua espaços ou aspas extras
- As variáveis devem começar com `VITE_` para funcionarem no Vite

### 2.5 Deploy

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. Vercel irá:
   - Instalar dependências
   - Fazer build do projeto
   - Otimizar para produção
   - Gerar URL de produção

### 2.6 Verificar Deploy

Quando aparecer "🎉 Congratulations!", seu app está no ar!

Clique em **"Visit"** para abrir o app ou copie a URL:
```
https://falaquegasto.vercel.app
```

---

## 🔄 Passo 3: Atualizações Automáticas

### Como Funciona

A partir de agora, toda vez que você fizer push para o GitHub:

```bash
git add .
git commit -m "Melhoria: adiciona nova funcionalidade"
git push
```

O Vercel automaticamente:
1. Detecta o push
2. Inicia novo build
3. Faz deploy da nova versão
4. Atualiza a URL de produção

### Visualizar Deploys

No dashboard do Vercel:
- Veja histórico de deploys
- Rollback para versões anteriores
- Visualize logs de build
- Monitore performance

---

## 🎨 Passo 4: Domínio Personalizado (Opcional)

### 4.1 Adicionar Domínio

No Vercel Dashboard:
1. Vá para **Settings → Domains**
2. Clique em **"Add"**
3. Digite seu domínio: `meuapp.com.br`
4. Clique em **"Add"**

### 4.2 Configurar DNS

Aponte seu domínio para o Vercel:

**Opção A: CNAME (Recomendado)**
```
CNAME  www    cname.vercel-dns.com
```

**Opção B: A Record**
```
A      @      76.76.21.21
```

### 4.3 Aguardar Propagação

- Tempo: 24-48 horas
- O Vercel gerará certificado SSL automaticamente
- Seu app estará acessível em `https://meuapp.com.br`

---

## 📱 Passo 5: Testar o PWA

### No Celular

#### Android (Chrome)
1. Abra a URL do Vercel no Chrome
2. Toque no menu (⋮)
3. Selecione **"Adicionar à tela inicial"**
4. Confirme
5. O ícone aparecerá na home

#### iOS (Safari)
1. Abra a URL do Vercel no Safari
2. Toque no botão de compartilhar (quadrado com seta)
3. Role e selecione **"Adicionar à Tela de Início"**
4. Confirme
5. O ícone aparecerá na home

### Funcionalidades PWA

Após instalar:
- ✅ Ícone na home screen
- ✅ Splash screen personalizada
- ✅ Funciona offline (cache)
- ✅ Sem barra de endereço
- ✅ Experiência nativa

---

## 🧪 Passo 6: Testes Finais

### Checklist de Testes

- [ ] Página Chat carrega corretamente
- [ ] Adicionar gasto por texto funciona
- [ ] Bot responde e salva no Supabase
- [ ] Excluir gasto funciona
- [ ] Página Hoje mostra gastos do dia
- [ ] Página Relatórios exibe gráficos
- [ ] Filtros funcionam (dia/mês/ano)
- [ ] Exportar PDF funciona
- [ ] PWA instala corretamente
- [ ] Funciona offline (teste modo avião)
- [ ] Reconhecimento de voz (opcional)

### Testar Diferentes Dispositivos

- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)
- [ ] Tablet

---

## 🐛 Troubleshooting

### ❌ Build Falha no Vercel

**Erro:** `Module not found`
- **Solução:** Verifique se todas as importações estão corretas
- Execute `npm install` localmente e teste `npm run build`

**Erro:** `Environment variable missing`
- **Solução:** Adicione todas as variáveis no Vercel Dashboard
- Todas devem começar com `VITE_`

### ❌ App Carrega mas Não Funciona

**Problema:** Tela branca
- **Solução:** Verifique o console do navegador (F12)
- Provavelmente credenciais inválidas

**Problema:** Erro ao salvar gasto
- **Solução:** Verifique credenciais do Supabase
- Confirme que a tabela `gastos` existe
- Verifique políticas RLS no Supabase

### ❌ Voz Não Funciona

**Isso é normal!** O reconhecimento de voz é experimental.
- **Solução:** Use o campo de texto
- É mais rápido, confiável e sempre funciona

---

## 📊 Passo 7: Monitoramento

### Vercel Analytics (Opcional)

No dashboard do Vercel:
1. Vá para **Analytics**
2. Ative o analytics
3. Visualize:
   - Pageviews
   - Visitantes únicos
   - Performance
   - Core Web Vitals

### Supabase Monitoring

No Supabase Dashboard:
1. Vá para **Database → Usage**
2. Monitore:
   - Requisições por minuto
   - Tamanho do banco
   - Conexões ativas

---

## 🎉 Conclusão

Seu app FalaQueGasto agora está:

- ✅ **Online** em produção
- ✅ **Acessível** via URL pública
- ✅ **Instalável** como PWA
- ✅ **Automático** com CI/CD
- ✅ **Escalável** via Vercel
- ✅ **Monitorado** com analytics

### Próximos Passos

1. **Compartilhe** a URL com amigos/família
2. **Instale** como PWA no celular
3. **Use diariamente** para controlar gastos
4. **Melhore** com base no feedback

### URLs Importantes

- **App:** `https://falaquegasto.vercel.app`
- **GitHub:** `https://github.com/SEU-USUARIO/falaquegasto`
- **Vercel Dashboard:** `https://vercel.com/dashboard`
- **Supabase Dashboard:** `https://supabase.com/dashboard`

---

**🚀 Parabéns! Seu app está no ar!**

Se tiver problemas, abra uma issue no GitHub ou revise este guia.
