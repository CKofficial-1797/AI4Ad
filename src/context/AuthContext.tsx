import { toast } from '@/hooks/use-toast';
import apiClient from '@/lib/api';
import type { AxiosResponse, AxiosError } from 'axios';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    token: string;
    wallet_id?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        const checkAuth = async () => {
            if (token) {
                try {
                    const response: AxiosResponse = await apiClient.get("/auth/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser({ id: response.data.id, name: response.data.name, email: response.data.email, token: token, wallet_id: response.data.wallet_id });

                } catch {
                    localStorage.removeItem('authToken');
                    setUser(null);

                }
            }
            setLoading(false);
        };

        checkAuth();

    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {

            const response: AxiosResponse = await apiClient.post('/auth/login', {
                email: email,
                password: password,
            });

            localStorage.setItem('authToken', response.data.authToken);
            setUser({ id: response.data.user.id, name: response.data.user.name, email: response.data.user.email, token: response.data.authToken, wallet_id: response.data.user.wallet_id });
            toast({
                title: "Login Successful",
                description: "Welcome to Adious AI Dashboard",
            });
            return true;

        } catch (error: AxiosError | any) {
            console.error("Login error:", error);
            const message = error.status == 400 ? 'Invalid credentials' : 'Internal server error';

            toast({
                title: "Login Failed",
                description: message,
                variant: "destructive",
            });
            return false;
        }

    };

    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        try {

            await apiClient.post('/auth/signup', {
                name: name,
                email: email,
                password: password,
            });

            toast({
                title: "Register Successful",
                description: "Great Job!",
            });
            return true;

        } catch (error: AxiosError | any) {
            const message = error.status == 403 ? 'Account already in use' : 'Internal server error';

            toast({
                title: "Registration Failed",
                description: message,
                variant: "destructive",
            });
            return false;
        }

    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
