# 🎤 Guia de Troubleshooting - Reconhecimento de Voz

## 🔍 Problemas Comuns e Soluções

### ❌ Problema: "Permissão de microfone negada"

**Solução no Chrome/Edge:**
1. Clique no **ícone de cadeado** 🔒 na barra de endereço
2. Procure por **"Microfone"**
3. Mude para **"Permitir"**
4. Recarregue a página (F5)

**Solução no Firefox:**
1. Clique no **ícone de microfone** na barra de endereço
2. Clique em **"Permitir"**
3. Recarregue a página

---

### ❌ Problema: "Microfone não detectado"

**Verificações:**
1. ✅ Microfone está conectado?
2. ✅ Microfone está funcionando? (teste em outras apps)
3. ✅ Windows reconhece o microfone?
   - Abra **Configurações do Windows**
   - **Sistema** → **Som**
   - Verifique se o microfone aparece e funciona

**Teste rápido do microfone:**
1. Abra o gravador de voz do Windows
2. Grave um áudio de teste
3. Se funcionar lá, o problema é a permissão do navegador

---

### ❌ Problema: "Nenhuma fala detectada"

**Causas comuns:**
- 🔇 Você não falou alto o suficiente
- ⏱️ Demorou muito para começar a falar
- 🎤 Microfone muito longe da boca
- 🔊 Volume do microfone baixo

**Soluções:**
1. Fale **imediatamente** após clicar no botão
2. Fale **mais alto** e **próximo ao microfone**
3. Aumente o volume do microfone no Windows:
   - **Configurações** → **Sistema** → **Som**
   - **Propriedades do dispositivo de entrada**
   - Aumente o volume

---

### ❌ Problema: "Seu navegador não suporta reconhecimento de voz"

**Navegadores compatíveis:**
- ✅ **Google Chrome** (recomendado)
- ✅ **Microsoft Edge** (recomendado)
- ✅ **Opera**
- ❌ **Firefox** (suporte limitado)
- ❌ **Safari** (não suporta)

**Solução:**
Use **Chrome** ou **Edge** para melhor experiência.

---

### ❌ Problema: "Erro de rede"

**Causa:**
O reconhecimento de voz do navegador **precisa de internet** para funcionar.

**Solução:**
- Verifique sua conexão com a internet
- Se estiver offline, use a **entrada manual** (campo de texto)

---

## 🎯 Como Testar se Está Funcionando

### Passo a Passo:

1. **Abra o console do navegador** (F12)
2. **Clique no botão do microfone** 🎤
3. **Observe as mensagens** no console:

✅ **Se aparecer:**
```
🎤 Iniciando gravação...
✅ Reconhecimento iniciado
🎤 Gravação iniciada - FALE AGORA!
```
**→ Está funcionando! Fale agora!**

❌ **Se aparecer erro:**
```
❌ Permissão de microfone negada
```
**→ Siga as instruções acima para permitir o microfone**

---

## 📝 Exemplos de Teste

Após clicar no botão, fale claramente:

### Teste 1:
**Fale:** *"almoço no restaurante trinta e cinco reais"*
**Esperado:** Gasto registrado com descrição "almoço no restaurante", valor 35, categoria "alimentacao"

### Teste 2:
**Fale:** *"uber para casa quinze reais e cinquenta"*
**Esperado:** Gasto registrado com descrição "uber para casa", valor 15.50, categoria "transporte"

### Teste 3:
**Fale:** *"compras no mercado oitenta e sete reais"*
**Esperado:** Gasto registrado com descrição "compras no mercado", valor 87, categoria "mercado"

---

## 🔧 Debug Avançado

### Verificar no Console:

1. Abra o console (F12)
2. Digite e execute:

```javascript
// Verificar suporte
console.log('Suporte:', 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window)

// Verificar permissão
navigator.permissions.query({name:'microphone'}).then(r => console.log('Permissão:', r.state))

// Listar dispositivos de áudio
navigator.mediaDevices.enumerateDevices().then(devices => {
  console.log('Microfones:', devices.filter(d => d.kind === 'audioinput'))
})
```

**Resultados esperados:**
- Suporte: `true`
- Permissão: `"granted"`
- Microfones: Lista com pelo menos 1 dispositivo

---

## 🆘 Ainda Não Funciona?

### Alternativas:

1. **Use a entrada manual** 📝
   - Digite seus gastos no campo de texto na parte inferior
   - Funciona igual, mas sem voz
   
2. **Teste em outro navegador**
   - Baixe o Chrome ou Edge
   - Teste novamente
   
3. **Reinicie o navegador**
   - Feche TODAS as janelas
   - Abra novamente e teste

4. **Reinicie o computador**
   - Às vezes resolve problemas de permissão
   - Teste novamente após reiniciar

---

## ✅ Checklist Final

Antes de testar novamente, verifique:

- [ ] Usando Chrome ou Edge
- [ ] Microfone conectado e funcionando
- [ ] Permissão concedida no navegador
- [ ] Internet funcionando
- [ ] Console aberto (F12) para ver mensagens
- [ ] Falar IMEDIATAMENTE após clicar
- [ ] Falar ALTO e PRÓXIMO ao microfone
- [ ] Volume do microfone alto nas configurações do Windows

---

## 📞 Mensagens de Erro e Significado

| Erro | Significado | Solução |
|------|-------------|---------|
| `no-speech` | Não detectou voz | Fale mais alto |
| `audio-capture` | Microfone não encontrado | Conecte o microfone |
| `not-allowed` | Permissão negada | Permita nas configurações |
| `network` | Sem internet | Conecte-se à internet |
| `aborted` | Cancelado | Tente novamente |

---

**Recarregue a página e teste novamente!** 🚀

O sistema agora tem logs detalhados no console para ajudar a identificar o problema.
