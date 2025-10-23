import supabase from './supabase';
import type { Session } from '@supabase/supabase-js'; 

// Function that takes in a callback function (cb) whose argument is the current session
const onAuthChange = (cb: (session: Session | null) => void): (() => void) => {
    //varible that is the destructured subscription object when OnAuthStateChange is called.
    //if there is a change in the state of the session the onAuthStateChange method runs and triggers the callback function to run again with the updates session state.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => cb(session))
    //return a fucntion that calls the unsubsbribe method telling supabase to stop listening for state chnages
    return () => subscription.unsubscribe()
}

// asynchornous function that gets the current state of the session (signed in, signed out) from Supabase
// supabase stores session locally after user logs in
// if user not signed in data.session will be null
const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    return data.session
}

export default { onAuthChange, getSession }