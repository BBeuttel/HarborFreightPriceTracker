import supabase from "./supabase";
import type { User, Session } from '@supabase/supabase-js';

// type here that is defining the user and the session (signed in, signed out)
type AuthData = {user: User | null; session: Session | null}

//asynchronous helper function that returns data part of type AuthData (line 5) using signUp method from supabase.  if email and password do not fit criteria of email or PW (this is not sign in so they cant be incorrect), will throw error
const signUpUser = async (email: string, password: string): Promise<AuthData> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

//asynchorous helper function that returns data of type AuthData (line 5) when a user tries to sign in using the signInWithPassword method built into supabase.  if email and password are incorrect will throw error
const signInUser = async (email: string, password: string): Promise<AuthData> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password});
    if (error) throw error;
    return data
}

//asynchonous helper function that invalites current session (signs out).  AuthProvider will see onAuthStateChange and update context to null for both user and session
const signOutUser = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export { signUpUser, signInUser, signOutUser };