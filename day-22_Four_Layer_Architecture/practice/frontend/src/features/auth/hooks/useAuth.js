import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, register } from "../services/auth.api";


export const useAuth = ()=>{
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async (username, email, password) =>{
        setLoading(true);
        try {
            const response = await register(username, email, password);
            setUser(response.userData);
            // return response;
        } catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleLogin = async (username, password) =>{
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.userData);
            // return response;
        } catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    return { user, loading, handleRegister, handleLogin };
}