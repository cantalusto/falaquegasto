import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funções para manipular gastos
export const gastosService = {
  // Buscar todos os gastos
  async getAll() {
    const { data, error } = await supabase
      .from('gastos')
      .select('*')
      .order('data', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar gastos de um dia específico
  async getByDate(date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const { data, error } = await supabase
      .from('gastos')
      .select('*')
      .gte('data', startOfDay.toISOString())
      .lte('data', endOfDay.toISOString())
      .order('data', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar gastos do mês atual
  async getByMonth(year, month) {
    const startOfMonth = new Date(year, month, 1)
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999)

    const { data, error } = await supabase
      .from('gastos')
      .select('*')
      .gte('data', startOfMonth.toISOString())
      .lte('data', endOfMonth.toISOString())
      .order('data', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Criar novo gasto
  async create(gasto) {
    const { data, error } = await supabase
      .from('gastos')
      .insert([{
        descricao: gasto.descricao,
        valor: parseFloat(gasto.valor),
        categoria: gasto.categoria,
        data: gasto.data || new Date().toISOString()
      }])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Deletar gasto
  async delete(id) {
    const { error } = await supabase
      .from('gastos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Atualizar gasto
  async update(id, gasto) {
    const { data, error } = await supabase
      .from('gastos')
      .update(gasto)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}
