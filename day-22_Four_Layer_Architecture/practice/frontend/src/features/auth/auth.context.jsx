import { createContext, useState } from "react";

// Context
export const AuthContext = createContext();

/**
 * Context Provider
 */
export function AuthProvider({children}) {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    
    return <AuthContext.Provider value={{loading, setLoading, user, setUser}}>
        {children}
    </AuthContext.Provider>
}