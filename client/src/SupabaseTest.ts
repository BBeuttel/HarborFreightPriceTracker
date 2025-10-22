import { useEffect } from 'react'
import { supabase } from './lib/supabase'

const TestSupabase: React.FC = () => {
  useEffect(() => {
    async function check() {
      const { data, error } = await supabase.from('item').select('*').limit(1)
      console.log('Data:', data, 'Error:', error)
    }
    check()
  }, [])

  return 
}

export default TestSupabase;