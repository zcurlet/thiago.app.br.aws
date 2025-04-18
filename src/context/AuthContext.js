import React, { createContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    checkUser();
  }, []);

  // Função para verificar o usuário atual
  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  }

  // Função para login
  const login = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return {
        success: false,
        message: error.message || 'Erro ao fazer login'
      };
    }
  };

  // Função para registro
  const register = async (username, email, password) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      return { 
        success: true,
        message: 'Registro realizado com sucesso! Verifique seu email para confirmar a conta.'
      };
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return {
        success: false,
        message: error.message || 'Erro ao registrar'
      };
    }
  };

  // Função para confirmar registro
  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
      return { success: true };
    } catch (error) {
      console.error('Erro ao confirmar registro:', error);
      return {
        success: false,
        message: error.message || 'Erro ao confirmar registro'
      };
    }
  };

  // Função para logout
  const logout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        confirmSignUp,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
