'use client';

import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, myList: string[]) => void;
  setLikedListItem: (myList: string[]) => void;
  logout: () => void;
  userName: string | null;
  likedList: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('token') ? true : false
  );
  const [userName, setUserName] = useState<string | null>(null);
  const [likedList, setLikedList] = useState<string[]>(
    JSON.parse(localStorage.getItem('likedList') || '[]')
  );

  const login = (token: string, myList: string[]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('likedList', JSON.stringify(myList));
    try {
      const decoded: { name: string } = jwtDecode(token);
      setUserName(decoded.name);
      setLikedList(myList);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token decoding failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserName(null);
    setLikedList([]);
    localStorage.removeItem('likedList');
    setIsAuthenticated(false);
  };

  const setLikedListItem = (myList: string[]) => {
    localStorage.setItem('likedList', JSON.stringify(myList));
    setLikedList(myList);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userName,
        likedList,
        setLikedListItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
