import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../utils/Auth';

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>👨‍💼 Dashboard Admin</h1>
      <p>Selamat datang, {currentUser.nama}!</p>
      <p style={{ color: '#999', marginTop: '20px' }}>
        Dashboard ini sedang dalam pengembangan...
      </p>
      <button 
        onClick={handleLogout}
        style={{
          marginTop: '30px',
          padding: '12px 30px',
          background: '#fc5185',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
         Logout
      </button>
    </div>
  );
};

export default AdminDashboard;