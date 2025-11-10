# 💬 Exemplos de Uso - FalaQueGasto

## 🎤 Frases que Funcionam Bem

### ✅ Alimentação
```
"Comprei um lanche por 15 reais"
"Almoço no restaurante 35 reais"
"Pizza 50 reais"
"Café da manhã 12 reais"
"Jantar com a família 80 reais"
"Sorvete 8 reais"
"Suco natural 7 reais"
```

**Resultado esperado**: categoria `alimentacao`

---

### ✅ Mercado
```
"Comprei arroz no mercado 10 reais"
"Feijão e macarrão no supermercado 25 reais"
"Frutas e verduras 30 reais"
"Pão na padaria 8 reais"
"Leite e ovos 15 reais"
"Carne no açougue 45 reais"
```

**Resultado esperado**: categoria `mercado`

---

### ✅ Transporte
```
"Gastei 15 reais com Uber"
"Passagem de ônibus 4 reais e 50"
"Gasolina 100 reais"
"Estacionamento 10 reais"
"Táxi até o centro 25 reais"
"Recarga do bilhete único 50 reais"
```

**Resultado esperado**: categoria `transporte`

---

### ✅ Saúde
```
"Comprei remédio na farmácia 25 reais"
"Consulta médica 150 reais"
"Exame de sangue 80 reais"
"Vitaminas 45 reais"
"Dentista 200 reais"
"Óculos novos 350 reais"
```

**Resultado esperado**: categoria `saude`

---

### ✅ Lazer
```
"Cinema com pipoca 45 reais"
"Ingresso do jogo 60 reais"
"Academia do mês 80 reais"
"Show de música 100 reais"
"Parque de diversões 70 reais"
"Streaming do mês 30 reais"
```

**Resultado esperado**: categoria `lazer`

---

### ✅ Contas
```
"Conta de luz 120 reais"
"Internet 100 reais"
"Água 50 reais"
"Telefone celular 70 reais"
"Condomínio 250 reais"
"IPTU 400 reais"
```

**Resultado esperado**: categoria `contas`

---

### ✅ Outros
```
"Presente para aniversário 80 reais"
"Material de limpeza 35 reais"
"Roupa nova 120 reais"
"Corte de cabelo 30 reais"
"Conserto do fogão 150 reais"
```

**Resultado esperado**: categoria `outros`

---

## 🎯 Dicas para Melhor Reconhecimento

### ✅ DO's (Faça):
- Fale pausadamente e claramente
- Mencione o valor em reais
- Use frases simples e diretas
- Mencione onde comprou (mercado, farmácia, etc)
- Diga "reais" ou "R$" após o valor

### ❌ DON'Ts (Não faça):
- Não fale muito rápido
- Não use frases muito longas
- Não sussurre ou grite
- Não deixe muito ruído de fundo
- Não use gírias complicadas

---

## 📊 Cenários de Uso Real

### Cenário 1: Dia Comum
```
Manhã:
🎤 "Pão na padaria 5 reais"
🎤 "Passagem de ônibus 4 reais e 50"

Tarde:
🎤 "Almoço no restaurante 25 reais"
🎤 "Café 6 reais"

Noite:
🎤 "Compras no mercado 85 reais"
🎤 "Uber para casa 18 reais"

📊 Total do dia: R$ 143,50
```

---

### Cenário 2: Final de Semana
```
Sábado:
🎤 "Cinema 45 reais"
🎤 "Jantar 80 reais"
🎤 "Sorvete 12 reais"

Domingo:
🎤 "Churrasco 120 reais"
🎤 "Bebidas 35 reais"

📊 Total do fim de semana: R$ 292,00
```

---

### Cenário 3: Mês Completo
```
Contas Fixas:
🎤 "Aluguel 1000 reais"
🎤 "Conta de luz 120 reais"
🎤 "Internet 100 reais"
🎤 "Condomínio 250 reais"

Alimentação Diária: ~R$ 40/dia
Transporte Diário: ~R$ 15/dia
Lazer Mensal: ~R$ 200

📊 Total do mês: R$ 3.120,00

💡 Categoria que mais gasta: Contas (R$ 1.470)
```

---

## 🔍 Testes de Precisão

### Teste 1: Valores Decimais
```
Entrada: "Comprei refrigerante por 4 reais e 50"
✅ Esperado: valor = 4.50

Entrada: "Passagem de ônibus 4 e 50"
✅ Esperado: valor = 4.50

Entrada: "Café 3 reais e setenta e cinco"
⚠️ Pode falhar: use "3.75" ou "3 e 75"
```

---

### Teste 2: Descrições Complexas
```
Entrada: "Comprei arroz feijão e macarrão no mercado por 25 reais"
✅ Esperado: 
   descricao = "arroz feijão e macarrão no mercado"
   categoria = "mercado"
   valor = 25.00

Entrada: "Almoço de domingo com churrasco e cerveja 150 reais"
✅ Esperado:
   descricao = "almoço de domingo com churrasco e cerveja"
   categoria = "alimentacao"
   valor = 150.00
```

---

### Teste 3: Categorias Ambíguas
```
Entrada: "Remédio 20 reais"
✅ Categoria: saude

Entrada: "Vitaminas no mercado 15 reais"
⚠️ Pode ser: saude OU mercado
💡 Gemini decide baseado no contexto

Entrada: "Gasolina do carro 100 reais"
✅ Categoria: transporte
```

---

## 🎓 Treinamento do Usuário

### Passo 1: Frases Simples (Iniciante)
Pratique com frases básicas:
```
"Pão 5 reais"
"Almoço 25 reais"
"Ônibus 4 reais e 50"
```

### Passo 2: Frases Completas (Intermediário)
Adicione mais detalhes:
```
"Comprei pão na padaria 5 reais"
"Almoço no restaurante 25 reais"
"Passagem de ônibus 4 reais e 50"
```

### Passo 3: Frases Naturais (Avançado)
Fale naturalmente:
```
"Fui na padaria e gastei 5 reais com pão"
"Almocei no restaurante e saiu 25 reais"
"Peguei o ônibus e paguei 4 e 50"
```

---

## 💡 Truques e Atalhos

### Valores Redondos:
```
✅ "Almoço 30 reais" → mais fácil
❌ "Almoço 29 reais e 87" → mais difícil
```

### Mencione o Local:
```
✅ "Comprei remédio na farmácia 25 reais"
   → categoria correta garantida

⚠️ "Comprei remédio 25 reais"
   → pode categorizar errado
```

### Use Palavras-Chave:
```
"mercado" → categoria mercado
"farmácia/remédio" → categoria saude
"ônibus/uber/gasolina" → categoria transporte
"restaurante/lanche" → categoria alimentacao
"cinema/jogo/show" → categoria lazer
"conta de luz/água" → categoria contas
```

---

## 🚨 O Que Fazer Quando Falha

### Problema 1: Valor Errado
```
❌ Falou: "Almoço 25 reais"
   Interpretou: valor = 52.00

💡 Solução:
1. Clique no ícone 🗑️ para excluir
2. Tente novamente falando mais devagar
3. Diga: "Almoço... vinte e cinco reais"
```

### Problema 2: Categoria Errada
```
❌ Falou: "Comprei vitaminas 15 reais"
   Interpretou: categoria = mercado (esperava saude)

💡 Solução:
1. Exclua e tente: "Vitaminas na farmácia 15 reais"
2. Ou: "Remédio vitaminas 15 reais"
```

### Problema 3: Não Entendeu
```
❌ Erro: "Não foi possível interpretar o gasto"

💡 Solução:
1. Verifique sua internet
2. Fale mais devagar
3. Use frases mais simples
4. Exemplo: "Pão 5 reais" ao invés de frases longas
```

---

## 📈 Estatísticas de Uso

### Frases Mais Usadas:
1. "Almoço [valor] reais" (categoria: alimentacao)
2. "Compras no mercado [valor] reais" (categoria: mercado)
3. "Uber [valor] reais" (categoria: transporte)
4. "Lanche [valor] reais" (categoria: alimentacao)
5. "Passagem [valor] reais" (categoria: transporte)

### Taxa de Sucesso Esperada:
- ✅ Frases simples: 95%+
- ✅ Frases médias: 85%+
- ⚠️ Frases complexas: 70%+

---

**💡 Dica Final**: 
Quanto mais você usar, melhor ficará em formular frases que o app entende!

**Versão**: 1.0.0
