# 🏷️ Lista Completa de Palavras-Chave

## Categorias Automáticas

O sistema detecta a categoria automaticamente baseado em palavras-chave:

---

### 🍔 ALIMENTAÇÃO

**Palavras detectadas:**
- comida, almoço, jantar, **janta**, lanche, refeição
- restaurante, pizza, hambúrguer
- café, padaria
- comeu, comi

**Exemplos:**
```
"Janta 50 reais" → alimentacao
"Almoço no restaurante 35 reais" → alimentacao
"Pizza 45 reais" → alimentacao
"Café da manhã 12 reais" → alimentacao
"Lanche da tarde 10 reais" → alimentacao
```

---

### 🚗 TRANSPORTE

**Palavras detectadas:**
- uber, taxi, ônibus, bus
- gasolina, combustível
- passagem, metro, metrô
- transporte

**Exemplos:**
```
"Uber 15 reais" → transporte
"Gasolina 200 reais" → transporte
"Passagem de ônibus 4 reais e 50" → transporte
"Taxi 25 reais" → transporte
```

---

### 💊 SAÚDE

**Palavras detectadas:**
- remédio, farmácia
- médico, consulta, exame
- saúde

**Exemplos:**
```
"Remédio 35 reais" → saude
"Consulta médico 150 reais" → saude
"Exame 80 reais" → saude
"Farmácia 25 reais" → saude
```

---

### 🎮 LAZER

**Palavras detectadas:**
- cinema, show, festa
- jogo, diversão, passeio
- lazer

**Exemplos:**
```
"Cinema 40 reais" → lazer
"Show 80 reais" → lazer
"Festa 60 reais" → lazer
"Jogo 100 reais" → lazer
```

---

### 🛒 MERCADO

**Palavras detectadas:**
- mercado, supermercado, feira
- compras, açougue
- verdura, legume, fruta

**Exemplos:**
```
"Compras no mercado 150 reais" → mercado
"Feira 50 reais" → mercado
"Supermercado 200 reais" → mercado
"Açougue 80 reais" → mercado
```

---

### 📱 CONTAS

**Palavras detectadas:**
- conta, fatura
- água, luz, energia, internet
- telefone, aluguel

**Exemplos:**
```
"Conta de luz 150 reais" → contas
"Internet 100 reais" → contas
"Aluguel 800 reais" → contas
"Telefone 50 reais" → contas
```

---

### 📦 OUTROS

Qualquer gasto que não se encaixe nas categorias acima será classificado como "outros".

---

## 🎯 Frases de Teste

### Alimentação:
```
"Janta 50 reais"
"Almoço no restaurante 35 reais"
"Pizza no delivery 45 reais"
"Café da manhã 12 reais"
"Lanche 8 reais"
```

### Transporte:
```
"Uber para casa 15 reais"
"Gasolina 200 reais"
"Passagem de ônibus 4 reais e 50"
"Taxi 25 reais"
```

### Mercado:
```
"Compras no mercado 150 reais"
"Feira 50 reais"
"Supermercado 200 reais"
```

### Saúde:
```
"Remédio 35 reais"
"Consulta 150 reais"
"Farmácia 25 reais"
```

### Lazer:
```
"Cinema 40 reais"
"Show 80 reais"
"Festa 60 reais"
```

### Contas:
```
"Conta de luz 150 reais"
"Internet 100 reais"
"Aluguel 800 reais"
```

---

## ✅ Melhorias Implementadas

### 1. **Adicionado "janta" à categoria alimentação**
Agora reconhece tanto "jantar" quanto "janta".

### 2. **Limpeza automática de descrição**
Remove automaticamente:
- ✅ Valores numéricos
- ✅ "BRL", "R$", "reais" no final
- ✅ Vírgulas e ponto-vírgula no final
- ✅ Preposições no início
- ✅ Espaços extras

### 3. **Log de categoria detectada**
Veja no console qual categoria foi detectada:
```
🏷️ Categoria detectada: alimentacao
```

---

## 🎤 Teste Novamente!

**Recarregue a página:** `Ctrl + Shift + R`

**Teste estas frases:**
1. "Janta 50 reais" → deve detectar **alimentacao**
2. "Almoço 35 reais" → deve detectar **alimentacao**
3. "Uber 15 reais" → deve detectar **transporte**

---

## 📊 O Que Você Vai Ver no Console:

```
🔍 Interpretando localmente: Janta 50 reais
💰 Valor encontrado: 50
🏷️ Categoria detectada: alimentacao
✅ Interpretação: {descricao: "Janta", valor: 50, categoria: "alimentacao"}
```

---

**Teste agora com "Janta 50 reais" e veja a mágica acontecer!** 🎉
