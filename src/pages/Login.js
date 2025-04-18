import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [confirmSignUp, setConfirmSignUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  
  const { login, confirmSignUp: confirmSignUpFn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { username, password } = formData;
    
    if (!username || !password) {
      toast.error('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }
    
    try {
      const result = await login(username, password);
      
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        // Verificar se o erro é de usuário não confirmado
        if (result.message && result.message.includes('not confirmed')) {
          toast.info('Sua conta precisa ser confirmada. Por favor, insira o código de confirmação enviado por email.');
          setConfirmSignUp(true);
        } else {
          toast.error(result.message || 'Erro ao fazer login');
        }
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    }
    
    setLoading(false);
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await confirmSignUpFn(formData.username, confirmationCode);
      
      if (result.success) {
        toast.success('Conta confirmada com sucesso! Agora você pode fazer login.');
        setConfirmSignUp(false);
        // Tentar fazer login automaticamente
        const loginResult = await login(formData.username, formData.password);
        if (loginResult.success) {
          navigate('/dashboard');
        }
      } else {
        toast.error(result.message || 'Erro ao confirmar conta');
      }
    } catch (error) {
      toast.error('Erro ao confirmar conta');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>
      
      {!confirmSignUp ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleConfirmation}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmationCode">
              Código de Confirmação
            </label>
            <input
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Confirmando...' : 'Confirmar Conta'}
          </button>
          
          <button
            type="button"
            onClick={() => setConfirmSignUp(false)}
            className="w-full mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Voltar
          </button>
        </form>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Nota: Para usar o sistema, você precisa criar uma conta através da página de registro.</p>
      </div>
    </div>
  );
};

export default Login;
