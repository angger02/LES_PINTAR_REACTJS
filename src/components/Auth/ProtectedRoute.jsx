// src/components/Auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getCurrentUser();

  // Jika belum login, redirect ke login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak sesuai, redirect ke halaman tidak ada akses
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1>🚫 Akses Ditolak</h1>
        <p>Anda tidak memiliki akses ke halaman ini.</p>
        <button 
          onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 20px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;