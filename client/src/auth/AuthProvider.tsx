import { useEffect, useState } from "react";
import supabase from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { AuthContext, type AuthContextValue } from './authContext';

// component that will wrap the entire app so when Authentication occurs
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        let mounted = true;

        supabase.auth.getSession().then(({ data }) => {
            if(!mounted) return;
            setSession(data.session ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        }
    }, []);

    const value: AuthContextValue = {
        user: session?.user ?? null,
        session,
        loading,
    }

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}


export default AuthProvider;