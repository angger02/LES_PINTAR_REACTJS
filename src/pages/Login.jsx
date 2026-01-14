// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/Auth';
import { user } from '../data/User';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulasi delay loading
    setTimeout(() => {
      const result = loginUser(username, password, user);
      
      if (result.success) {
        // Redirect berdasarkan role
        switch (result.user.role) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'guru':
            navigate('/dashboard/guru');
            break;
          case 'murid':
          case 'orangtua':
            navigate('/dashboard/murid');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(result.message);
        setLoading(false);
      }
    }, 1000);
  };

  const handleBack = () => {
    navigate('/'); // Kembali ke halaman home
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button onClick={handleBack} className="back-button" disabled={loading}>
          ← Kembali
        </button>

        <div className="login-header">
          <h1>🎓 Les Pintar</h1>
          <p>Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>


      </div>
    </div>
  );
};

export default Login;   