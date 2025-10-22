import { useEffect } from 'react'
import supabase from './lib/supabase.js';


//a test run to see if supabase is connecting
const TestSupabase = () => {
//when function is triggered wait for a response from supabase selecting all columns in the item table but limit it to 1 row
  useEffect(() => {
    async function check() {
      const { data, error } = await supabase.from('item').select('*').limit(1)
      //log the data to the console
      console.log('Data:', data, 'Error:', error)
    }
    check()
  }, [])

  return 
}

export default TestSupabase;