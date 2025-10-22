import { useContext } from 'react';
import { AuthContext } from './authContext';

//react hook that defines the context provided from AuthProvider
const useAuth = () => {
    //defining the context using useContextHook
    const context = useContext(AuthContext);
    //if no context throw error
    if(!context) throw new Error('useAuth must be used within <AuthProvider>');
    return context;
}

export default useAuth;