# Scripts SQL para o Supabase

## Criar tabela de gastos

```sql
-- Criar tabela gastos
CREATE TABLE gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  data TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhorar performance nas consultas por data
CREATE INDEX idx_gastos_data ON gastos(data DESC);

-- Habilitar Row Level Security
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas as operações (uso pessoal)
CREATE POLICY "Enable all operations for all users" ON gastos
  FOR ALL USING (true);
```

## Consultas úteis

### Ver todos os gastos
```sql
SELECT * FROM gastos ORDER BY data DESC;
```

### Ver total por categoria
```sql
SELECT 
  categoria,
  COUNT(*) as quantidade,
  SUM(valor) as total
FROM gastos
GROUP BY categoria
ORDER BY total DESC;
```

### Ver gastos do mês atual
```sql
SELECT 
  DATE_TRUNC('day', data) as dia,
  SUM(valor) as total_dia
FROM gastos
WHERE 
  EXTRACT(MONTH FROM data) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM data) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY dia
ORDER BY dia DESC;
```

### Limpar todos os gastos (cuidado!)
```sql
DELETE FROM gastos;
```

### Inserir gasto de teste
```sql
INSERT INTO gastos (descricao, valor, categoria, data)
VALUES ('Teste - Café no mercado', 5.50, 'alimentacao', NOW());
```

## Backup e Restore

### Exportar dados (via Dashboard)
1. Vá em Database → Tables
2. Selecione a tabela `gastos`
3. Clique em "Export" → "CSV"

### Importar dados (via Dashboard)
1. Vá em Database → Tables
2. Selecione a tabela `gastos`
3. Clique em "Import" → Selecione o arquivo CSV
