# 💬 FalaQueGasto

> App conversacional moderno para controle de gastos com chat inteligente, reconhecimento de voz e análise por IA.

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-orange)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ Funcionalidades

- � **Interface Conversacional** - Chat intuitivo para registrar gastos
- 🎤 **Reconhecimento de Voz** (experimental) - Fale seus gastos naturalmente
- 🤖 **IA Inteligente** - Google Gemini interpreta suas mensagens
- � **Relatórios Visuais** - Gráficos e análises detalhadas
- 📅 **Visão Diária** - Acompanhe seus gastos de hoje
- 🗑️ **Excluir Gastos** - Remova registros facilmente
- 🌙 **Dark Theme** - Design moderno e agradável
- � **PWA** - Instale como app nativo
- � **Offline First** - Funciona sem internet

---

## � Tecnologias

- **Frontend:** React 18 + Vite 5
- **UI:** CSS Variables + Gradientes modernos
- **Banco de Dados:** Supabase (PostgreSQL)
- **IA:** Google Gemini 2.0 Flash
- **Voz:** Web Speech API
- **Gráficos:** Chart.js + react-chartjs-2
- **PWA:** vite-plugin-pwa

---

## ⚡ Início Rápido

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/falaquegasto.git
cd falaquegasto

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 4. Execute em desenvolvimento
npm run dev

# 5. Acesse
# http://localhost:5173
```

---

## � Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### � Como Obter as Credenciais

#### Supabase
1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em **Settings → API**
4. Copie `Project URL` e `anon/public key`

#### Google Gemini
1. Acesse [ai.google.dev](https://ai.google.dev/)
2. Clique em "Get API key"
3. Crie uma chave de API
4. Copie a chave gerada

---

## 🗄️ Banco de Dados (Supabase)

Execute este SQL no **SQL Editor** do Supabase:

```sql
CREATE TABLE gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  data TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para performance
CREATE INDEX idx_gastos_data ON gastos(data DESC);

-- Habilitar RLS (opcional para uso pessoal)
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

-- Permitir todas as operações
CREATE POLICY "Enable all operations" ON gastos FOR ALL USING (true);
```

---

## 🌐 Deploy no Vercel

### 📦 Preparar o Projeto

```bash
# 1. Certifique-se de que o projeto está no GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/falaquegasto.git
git push -u origin main
```

### 🚀 Deploy

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Importe o repositório do GitHub
4. Configure as **Environment Variables**:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima
   VITE_GEMINI_API_KEY=sua_chave_gemini
   ```
5. Clique em **"Deploy"**
6. Aguarde alguns minutos
7. Seu app estará online! 🎉

### 🔄 Atualizações Automáticas

Após o deploy inicial, toda vez que você fizer push para o GitHub, o Vercel fará deploy automaticamente!

## 🎯 Como Usar

### 💬 Página Chat
1. Digite ou fale seu gasto naturalmente
2. Exemplos:
   - "almoço 35 reais"
   - "comprei pão no mercado 8 reais"
   - "uber 25 reais"
3. O bot confirma e salva automaticamente
4. Para excluir: passe o mouse sobre a confirmação e clique em 🗑️

### 📅 Página Hoje
- Veja todos os gastos do dia atual
- Total do dia em destaque
- Estatísticas (média, maior gasto)
- Reseta automaticamente à meia-noite
- Exclua gastos clicando em 🗑️

### 📊 Página Relatórios
- Filtre por dia, mês ou ano
- Gráficos de pizza e barras
- Detalhamento por categoria
- Lista completa de gastos com opção de excluir
- Exporte para PDF

---

## 📱 Instalar como App (PWA)

### Android
1. Abra no Chrome
2. Menu (⋮) → **"Adicionar à tela inicial"**

### iOS
1. Abra no Safari
2. Compartilhar → **"Adicionar à Tela de Início"**

---

## 🏗️ Estrutura do Projeto

```
falaquegasto/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx       # Navegação principal
│   │   └── ...
│   ├── pages/               # Páginas da aplicação
│   │   ├── Chat.jsx         # Interface conversacional
│   │   ├── Hoje.jsx         # Gastos do dia
│   │   └── Relatorios.jsx   # Análises e gráficos
│   ├── services/            # Integrações externas
│   │   ├── supabase.js      # CRUD do banco
│   │   ├── gemini.js        # IA para interpretação
│   │   ├── voice.js         # Reconhecimento de voz
│   │   └── storage.js       # Cache local
│   ├── styles/              # Design system
│   │   └── theme.css        # Variáveis CSS globais
│   ├── App.jsx              # Rotas principais
│   └── main.jsx             # Entry point
├── public/
│   └── icon.svg             # Ícone do PWA
├── index.html
├── vite.config.js
├── vercel.json              # Config do Vercel
└── package.json
```

---

## � Categorias de Gastos

- 🍽️ **Alimentação** - Restaurantes, lanches, delivery
- 🚗 **Transporte** - Uber, ônibus, gasolina
- 🏥 **Saúde** - Remédios, consultas
- 🎮 **Lazer** - Cinema, jogos, diversão
- 📚 **Educação** - Cursos, livros
- 🏠 **Moradia** - Aluguel, contas
- � **Outros** - Diversos

---

## ⚠️ Observações Importantes

### 🎤 Reconhecimento de Voz
- **Status:** Experimental
- **Funciona melhor em:** Chrome/Edge (desktop e mobile)
- **Limitação:** Depende do Google Speech API (pode falhar)
- **Alternativa:** Use sempre o campo de texto (mais rápido e confiável!)

### 💡 Dica: Texto é Melhor que Voz!
| Método | Velocidade | Confiabilidade | Privacidade |
|--------|-----------|----------------|-------------|
| 💬 Texto | ⚡ 3s | ✅ 100% | ✅ Alta |
| 🎤 Voz | 🐌 15s | ⚠️ ~20% | ⚠️ Média |

---

## 🐛 Problemas Comuns

### ❌ Voz não funciona
**Solução:** Use o campo de texto! É mais rápido, preciso e sempre funciona.

### ❌ Credenciais inválidas
1. Verifique o `.env` ou variáveis no Vercel
2. Confirme URLs do Supabase e chaves da API
3. Teste as credenciais no console do Supabase

### ❌ Build falha no Vercel
1. Verifique se todas as dependências estão no `package.json`
2. Confirme que as variáveis de ambiente estão configuradas
3. Veja os logs de build no Vercel

---

## 📄 Licença

MIT License - Livre para uso pessoal e educacional.

---

## 🤝 Contribuindo

Pull requests são bem-vindos! Para mudanças importantes:
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📞 Suporte

Encontrou um bug ou tem uma sugestão? 
[Abra uma issue](https://github.com/seu-usuario/falaquegasto/issues)

---

<div align="center">

**💬 FalaQueGasto** 

Feito com ❤️ usando React + Vite + Supabase + Gemini AI

⭐ Se este projeto te ajudou, deixe uma estrela!

</div>
