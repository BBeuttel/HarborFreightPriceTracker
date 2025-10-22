import supabase from "./supabase";
import type { User, Session } from '@supabase/supabase-js';

type AuthData = {user: User | null; session: Session | null}

const signUpUser = async (email: string, password: string): Promise<AuthData> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

const signInUser = async (email: string, password: string): Promise<AuthData> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password});
    if (error) throw error;
    return data
}

const signOutUser = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export default { signUpUser, signInUser, signOutUser };