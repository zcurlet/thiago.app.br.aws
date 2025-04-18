import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  
  const { register, confirmSignUp } = useContext(AuthContext);
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
    
    const { username, email, password, confirmPassword } = formData;
    
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      setLoading(false);
      return;
    }
    
    if (password.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres');
      setLoading(false);
      return;
    }
    
    try {
      const result = await register(username, email, password);
      
      if (result.success) {
        toast.success(result.message || 'Registro realizado com sucesso!');
        setShowConfirmation(true);
      } else {
        toast.error(result.message || 'Erro ao registrar');
      }
    } catch (error) {
      toast.error('Erro ao registrar');
    }
    
    setLoading(false);
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await confirmSignUp(formData.username, confirmationCode);
      
      if (result.success) {
        toast.success('Conta confirmada com sucesso! Agora você pode fazer login.');
        navigate('/login');
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
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Registro</h2>
      
      {!showConfirmation ? (
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
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
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
              minLength={8}
            />
            <p className="text-xs text-gray-500 mt-1">A senha deve ter pelo menos 8 caracteres</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleConfirmation}>
          <div className="mb-4">
            <p className="text-gray-700 mb-4">
              Enviamos um código de confirmação para o seu email. Por favor, insira o código abaixo para confirmar sua conta.
            </p>
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
        </form>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
