import { createClient } from "@supabase/supabase-js";

//this is my database has both url (location) and key (access)
const supabase = createClient (
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
)

export default supabase;