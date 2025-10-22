import supabase from './supabase';
import type { Session } from '@supabase/supabase-js'; 


const onAuthChange = (cb: (session: Session | null) => void): (() => void) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => cb(session))
    return () => subscription.unsubscribe()
}

const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    return data.session
}

export default { onAuthChange, getSession }