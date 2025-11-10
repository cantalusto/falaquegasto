# Changelog - FalaQueGasto

## [1.0.0] - 2025-11-09

### ✨ Funcionalidades Iniciais

#### 🎤 Reconhecimento de Voz
- Gravação de gastos por voz usando Web Speech API
- Suporte para português brasileiro
- Indicador visual durante gravação
- Feedback de sucesso/erro

#### 🤖 Integração com IA
- Processamento de texto com Google Gemini
- Interpretação automática de:
  - Descrição do gasto
  - Valor em reais
  - Categoria (alimentacao, transporte, saude, lazer, mercado, contas, outros)

#### 💾 Banco de Dados
- Integração com Supabase (PostgreSQL)
- CRUD completo de gastos
- Sincronização automática

#### 📱 PWA (Progressive Web App)
- Instalável em Android e iOS
- Funciona offline
- Cache local com localStorage
- Sincronização automática quando voltar online
- Service Worker para cache de recursos

#### 📊 Relatórios
- Total gasto no dia
- Total gasto no mês
- Gráfico de pizza por categoria
- Gráfico de barras comparativo
- Lista detalhada por categoria

#### 🎨 Interface
- Design minimalista
- Cores: azul claro (#87CEEB) e branco
- Responsivo para mobile
- Botão flutuante para gravação
- Notificações de feedback
- Indicador de status offline

#### 🔧 Funcionalidades Técnicas
- React 18 com Hooks
- React Router para navegação
- Chart.js para gráficos
- Vite para build rápido
- PWA com vite-plugin-pwa
- Cache offline inteligente
- Fila de sincronização para operações offline

### 🚀 Deploy
- Configurado para Vercel
- Build otimizado
- Suporte a variáveis de ambiente
- SPA routing configurado

### 📝 Documentação
- README completo
- Guia de deploy passo a passo
- Scripts SQL para configuração do banco
- Exemplos de uso

---

## Próximas Versões (Planejadas)

### [1.1.0] - Futuro
- [ ] Edição de gastos
- [ ] Filtros por período personalizado
- [ ] Exportação de relatórios em PDF/Excel
- [ ] Backup automático
- [ ] Modo escuro
- [ ] Múltiplas contas/categorias personalizadas

### [1.2.0] - Futuro
- [ ] Lembretes de gastos recorrentes
- [ ] Orçamento mensal por categoria
- [ ] Notificações push
- [ ] Compartilhamento de gastos
- [ ] Autenticação de usuário

---

**Versão atual**: 1.0.0
**Última atualização**: 09/11/2025
