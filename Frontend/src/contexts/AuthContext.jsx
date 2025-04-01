import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(
        () => JSON.parse(localStorage.getItem("authenticated") || "false")
    );
    const [user, setUser] = useState(
        () => JSON.parse(localStorage.getItem("user") || "null")
    );

    // Persist login state to localStorage
    useEffect(() => {
        localStorage.setItem("authenticated", JSON.stringify(authenticated));
        localStorage.setItem("user", JSON.stringify(user));
    }, [authenticated, user]);

    return (
        <AuthContext.Provider
            value={{ email, role, password, authenticated, user, setUser, setEmail, setRole, setPassword, setAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
}