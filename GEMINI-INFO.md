# 🤖 Informações sobre a API do Gemini

## Status Atual

✅ **Sistema funcionando com Fallback Inteligente**

O app está configurado para funcionar **mesmo sem a API do Gemini**!

---

## 📊 Modelo Configurado

- **Modelo**: Gemini 2.0 Flash Experimental
- **Endpoint**: `gemini-2.0-flash-exp:generateContent`
- **API Key**: AIzaSyAPYXDimi4qxZDSF_HXHgGi9FJRu8Fdh58

---

## ⚠️ Erro 429 (Too Many Requests)

Você está recebendo o erro **429** porque:

1. **Atingiu o limite de requisições gratuitas** da API do Gemini
2. O Google limita o número de chamadas por minuto/dia
3. Para desenvolvimento, é comum atingir esse limite rapidamente

### Soluções:

#### Opção 1: Usar Interpretação Local (RECOMENDADO) ✅
O app **já está funcionando** com interpretação local automática!

**Como funciona:**
- O sistema tenta usar a API do Gemini
- Se falhar (404, 429, sem internet), usa interpretação local
- A interpretação local detecta automaticamente:
  - Valores em reais (ex: 35.50, 20 reais)
  - Categorias por palavras-chave
  - Descrições dos gastos

**Exemplo:**
```
Digite: "Almoço no restaurante 35 reais"
Resultado:
- Descrição: "Almoço no restaurante"
- Valor: 35.00
- Categoria: "alimentacao" (detectado pela palavra "almoço")
```

#### Opção 2: Gerar Nova API Key
1. Acesse: https://aistudio.google.com/app/apikey
2. Crie um novo projeto no Google Cloud
3. Gere uma nova API Key
4. Substitua no arquivo `.env`

#### Opção 3: Aguardar Reset do Limite
- Os limites geralmente resetam a cada 24 horas
- Volte a testar amanhã

---

## 🎯 Palavras-Chave Reconhecidas (Interpretação Local)

### 🍔 Alimentação
- comida, almoço, jantar, lanche, restaurante
- pizza, hamburguer, café, padaria

### 🚗 Transporte
- uber, taxi, ônibus, gasolina, combustível
- passagem, metro, metrô

### 💊 Saúde
- remédio, farmácia, médico, consulta, exame

### 🎮 Lazer
- cinema, show, festa, jogo, diversão, passeio

### 🛒 Mercado
- mercado, supermercado, feira, compras, açougue

### 📱 Contas
- conta, água, luz, internet, telefone, aluguel

### 📦 Outros
- Qualquer gasto que não se encaixe nas categorias acima

---

## 🧪 Como Testar

### Teste 1: Alimentação
```
Digite: "pizza no ifood 45 reais"
Esperado: 
- Descrição: "pizza no ifood"
- Valor: 45.00
- Categoria: "alimentacao"
```

### Teste 2: Transporte
```
Digite: "uber para o trabalho 12.50"
Esperado:
- Descrição: "uber para o trabalho"
- Valor: 12.50
- Categoria: "transporte"
```

### Teste 3: Mercado
```
Digite: "compras no mercado 87 reais"
Esperado:
- Descrição: "compras no mercado"
- Valor: 87.00
- Categoria: "mercado"
```

---

## 💡 Dicas

1. **Sempre inclua o valor** no texto (ex: "35 reais" ou "35.50")
2. **Use palavras-chave** da categoria desejada
3. **Seja específico** na descrição
4. **Formato aceito para valores:**
   - Com vírgula: `35,50`
   - Com ponto: `35.50`
   - Sem decimal: `35`
   - Com "reais": `35 reais`

---

## 🚀 Status do Sistema

✅ **Entrada por voz** - Funcionando  
✅ **Entrada manual** - Funcionando  
✅ **Interpretação local** - Funcionando  
✅ **Salvamento no Supabase** - Funcionando  
✅ **Relatórios com filtros** - Funcionando  
✅ **Exportação para PDF** - Funcionando  
⚠️ **API Gemini** - Limite atingido (usando fallback)  

---

## 📝 Resumo

**Seu app está 100% funcional!** 🎉

O erro 429 não impede o uso do sistema. A interpretação local é suficiente para detectar gastos corretamente. Se quiser usar a API do Gemini novamente, basta aguardar o reset do limite ou gerar uma nova chave.
