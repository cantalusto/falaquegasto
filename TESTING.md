# 🎯 Como Testar o FalaQueGasto

## ✅ Checklist de Testes

### 1. Testes Locais (Desenvolvimento)

#### Setup Inicial
- [ ] `npm install` executa sem erros
- [ ] `npm run dev` inicia o servidor
- [ ] http://localhost:3000 carrega corretamente
- [ ] Console não mostra erros críticos

#### Interface
- [ ] Header aparece com título "FalaQueGasto 💸"
- [ ] Card azul mostra "Total gasto hoje"
- [ ] Botão "📊 Relatórios" está visível
- [ ] Botão do microfone (🎤) aparece no canto inferior direito
- [ ] Design é responsivo no mobile (DevTools → Toggle Device)

#### Funcionalidade de Voz
- [ ] Navegador pede permissão ao clicar no microfone
- [ ] Botão muda de cor durante gravação (vermelho)
- [ ] Reconhecimento de voz funciona em PT-BR
- [ ] Notificação aparece após processar

#### Integração com Gemini
- [ ] Texto é enviado para a API
- [ ] Resposta é parseada corretamente
- [ ] Gasto é interpretado com descrição, valor e categoria

#### Integração com Supabase
- [ ] Gasto é salvo no banco de dados
- [ ] Lista de gastos é carregada
- [ ] Exclusão de gasto funciona
- [ ] Dados persistem após reload

#### Cache Offline
- [ ] Gasto é salvo no localStorage
- [ ] Badge "Modo Offline" aparece quando desconectado
- [ ] Sincronização ocorre ao voltar online

#### Relatórios
- [ ] Página de relatórios carrega
- [ ] Total do dia está correto
- [ ] Total do mês está correto
- [ ] Gráfico de pizza renderiza
- [ ] Gráfico de barras renderiza
- [ ] Lista por categoria está correta

---

### 2. Testes no Vercel (Staging)

#### Deploy
- [ ] Build completa sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Site carrega na URL do Vercel
- [ ] HTTPS está ativo

#### Funcionalidades
- [ ] Todos os testes locais repetidos em produção
- [ ] PWA é instalável (ícone aparece na barra)
- [ ] Service Worker registra corretamente
- [ ] Cache funciona (teste Network Offline no DevTools)

---

### 3. Testes em Dispositivos Móveis

#### Android (Chrome)
- [ ] Site carrega corretamente
- [ ] Opção "Adicionar à tela inicial" aparece
- [ ] App instala como PWA
- [ ] Ícone aparece na tela inicial
- [ ] App abre em fullscreen (sem barra do navegador)
- [ ] Microfone funciona
- [ ] Touch funciona bem
- [ ] Scrolling é suave

#### iOS (Safari)
- [ ] Site carrega corretamente
- [ ] Opção "Adicionar à Tela de Início" funciona
- [ ] App instala como PWA
- [ ] Ícone aparece correto
- [ ] App abre sem barra do Safari
- [ ] Microfone funciona (Safari tem limitações)
- [ ] Touch responsivo

---

## 🧪 Cenários de Teste

### Cenário 1: Primeiro Acesso
1. Abrir o app pela primeira vez
2. Permitir microfone
3. Clicar no botão do microfone
4. Falar: "Comprei pão por 5 reais"
5. ✅ Verificar se o gasto aparece na lista

### Cenário 2: Múltiplos Gastos
1. Adicionar 3-5 gastos diferentes
2. ✅ Verificar se todos aparecem na lista
3. ✅ Verificar se o total está correto
4. Ir para Relatórios
5. ✅ Verificar se os gráficos estão corretos

### Cenário 3: Offline
1. Abrir DevTools → Network → Offline
2. Adicionar um gasto
3. ✅ Verificar se aparece "Modo Offline"
4. ✅ Verificar se gasto foi salvo localmente (⚠️ ícone)
5. Voltar online
6. ✅ Verificar se sincroniza automaticamente

### Cenário 4: Exclusão
1. Clicar no ícone de lixeira
2. Confirmar exclusão
3. ✅ Verificar se gasto foi removido
4. Recarregar página
5. ✅ Verificar se continua excluído

### Cenário 5: Diferentes Categorias
Testar frases que devem gerar diferentes categorias:
- "Almoço no restaurante 30 reais" → alimentacao
- "Comprei arroz no mercado 10 reais" → mercado
- "Uber até o centro 15 reais" → transporte
- "Remédio na farmácia 25 reais" → saude
- "Cinema 40 reais" → lazer
- "Conta de luz 120 reais" → contas

---

## 🐛 Problemas Conhecidos

### Limitações do Safari (iOS)
- Web Speech API tem suporte limitado
- Pode não funcionar em todas as versões
- **Solução**: Usar Chrome no iOS quando possível

### Limites da API Gemini
- 60 requisições por minuto (gratuito)
- **Solução**: Implementar rate limiting se necessário

### Cache Agressivo
- Às vezes o SW faz cache demais
- **Solução**: Limpar cache: DevTools → Application → Clear storage

---

## 📊 Métricas de Performance

### Lighthouse Scores Esperados:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+
- **PWA**: 100

### Como Testar:
1. Abrir DevTools (F12)
2. Aba Lighthouse
3. Selecionar "Mobile" e "PWA"
4. Clicar "Analyze page load"

---

## 🔍 Logs e Debug

### Console do Navegador (F12)
Verificar por:
- ❌ Erros em vermelho
- ⚠️ Warnings em amarelo
- ℹ️ Mensagens de sucesso

### Logs Importantes:
```
✅ "Service Worker registrado com sucesso"
✅ "Gasto registrado com sucesso!"
⚠️ "Você está offline. Gasto salvo localmente."
❌ "Erro ao conectar com Supabase"
```

### Vercel Logs:
1. Acessar dashboard do Vercel
2. Selecionar o projeto
3. Ver logs de build e runtime

---

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas:
- [ ] Edição de gastos
- [ ] Filtro por data personalizada
- [ ] Exportar relatórios (PDF/Excel)
- [ ] Autenticação de usuário
- [ ] Categorias personalizadas
- [ ] Modo escuro
- [ ] Orçamento mensal
- [ ] Lembretes de gastos recorrentes
- [ ] Backup automático
- [ ] Múltiplos idiomas

### Melhorias Técnicas:
- [ ] Testes automatizados (Jest, Vitest)
- [ ] CI/CD com GitHub Actions
- [ ] Monitoramento de erros (Sentry)
- [ ] Analytics (Google Analytics, Plausible)
- [ ] Otimização de bundle size
- [ ] Lazy loading de componentes
- [ ] Virtualization para listas grandes

---

## ✨ Dicas de Teste

### Use Dados Reais:
Registre gastos reais por alguns dias para testar o comportamento real.

### Teste em Diferentes Horários:
Verifique se os relatórios funcionam corretamente em diferentes momentos do dia.

### Teste com Diferentes Vozes:
Peça para outras pessoas testarem o reconhecimento de voz.

### Teste a Performance:
Use o Lighthouse regularmente para monitorar performance.

---

**Happy Testing! 🎉**
