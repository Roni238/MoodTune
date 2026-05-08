import { supabase } from './supabase'

export const api = {
  async post(functionName: string, body: object) {

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: body,
      method: 'POST',
    })

    if (error) {
      console.error(`Error invoking function ${functionName}:`, error)
      throw new Error(error.message || 'Ошибка при вызове функции')
    }

    return data
  }
}