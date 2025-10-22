import { useEffect, useState } from "react";
import supabase from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { AuthContext, type AuthContextValue } from './authContext';

// component that will wrap the entire app so when Authentication occurs it will persist throughtout the whole app.  It is taking in children as argument which is all child components (so everything).
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    //state of the session will be null if signed out.  sttart null due to no one being signed in
    const [session, setSession] = useState<Session | null>(null);
    //when fetching initial session (trying to sign in) loading will be true.  will later be reassigned to false when signed in as there  will be no loading
    const [loading, setLoading] = useState(true);

    //useEffect runs at page load will also run if any changes happen to auth
    useEffect (() => {
        let mounted = true;

        //going to supabase authetication, starting a session, and grabbing the data needed for authentication
        supabase.auth.getSession().then(({ data }) => {
            //if component unmounts before supabase returns our data this will stop the session from starting
            if(!mounted) return;
            //update state to the new session that contains the data
            setSession(data.session ?? null);
            //since we have started the session and the promise has been fulfilled we can set loading to false
            setLoading(false);
        });

        //creating a listener variable that will update state of the session (Session) if there is a change to the state of auth which is represented by the argument _event (sign in, sign out, token refresh) 
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        // return a fucntion the maked mounted false which will stop any calls to supabase (line 20) unsubsbribe method tells supabase to stop listening for state chnages (line 28)
        return () => {
            mounted = false;
            subscription.unsubscribe();
        }
    }, []);

    //creating the type for the entire app (mremember Auth Provider will wrap the entire app)
    const value: AuthContextValue = {
        user: session?.user ?? null,
        session,
        loading,
    }

    // returning out the component that has the value of user, session and loading and exposes those values to all of the child components (entire app)
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}


export default AuthProvider;