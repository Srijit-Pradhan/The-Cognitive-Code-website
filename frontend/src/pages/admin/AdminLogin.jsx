import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`, {
        username,
        password
      });
      
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Try again.');
    }
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/70 p-8 md:p-12 rounded-lg border border-brand-brown/10 shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-brand-brown mb-2">Admin Access</h1>
          <p className="text-brand-brown-sec text-sm">Secure dashboard for managing books.</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full bg-white border border-brand-brown/20 rounded py-2.5 px-3 text-brand-brown focus:outline-none focus:border-brand-brown"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-white border border-brand-brown/20 rounded py-2.5 px-3 text-brand-brown focus:outline-none focus:border-brand-brown"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-brown text-surface font-semibold py-3 rounded hover:bg-brand-brown/90 mt-2"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
