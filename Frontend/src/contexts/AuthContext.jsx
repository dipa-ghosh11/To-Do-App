import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Check authentication status on mount and when user changes
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                
                if (storedUser) {
                    // Verify token with backend
                    const response = await axios.get("http://localhost:4000/api/user/verify", {
                        withCredentials: true
                    });

                    if (response.data.success) {
                        // If verification successful, update user state with stored user data
                        setUser(JSON.parse(storedUser));
                    } else {
                        // If verification fails, clear storage and user state
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
            // Store user data in localStorage
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