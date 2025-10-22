import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

//this type definess the data we will get from context, user  is the type imported from supabase, session has tokens, and loading is for UI
export type AuthContextValue = {
    user: User | null;
    session: Session | null;
    loading: boolean;
}

//helper function that creates our instance of context with the above type
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);