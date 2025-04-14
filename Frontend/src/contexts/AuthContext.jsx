import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                
                if (storedUser) {
                    
                    const response = await axios.get("http://localhost:4000/api/user/verify", {
                        withCredentials: true
                    });

                    if (response.data.success) {
                       
                        setUser(JSON.parse(storedUser));
                    } else {
                        
                        localStorage.removeItem("user");
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    const login = async (userData) => {
        try {
            
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:4000/api/user/logout", {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};