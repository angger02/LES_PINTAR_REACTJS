import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../utils/Auth';
import JadwalLes from '../../components/murid/JadwalLes';
import RiwayatAbsensi from '../../components/murid/RiwayatAbsensi';
import PerformaMurid from '../../components/murid/PerformaMurid';
import StatusPembayaranMurid from '../../components/murid/StatusPembayaranMurid';
import PengumumanMurid from '../../components/murid/PengumumanMurid';
import '../../styles/MuridDashboard.css';

const MuridDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('jadwal');
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || (user.role !== 'murid' && user.role !== 'orangtua')) {
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

  // Untuk demo, kita pakai murid dengan id 1 (Andi Wijaya)
  const muridId = 1; // Nanti bisa disesuaikan dengan data user yang login

  return (
    <div className="murid-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🎓 Les Pintar</h2>
          <p className="user-role">
            Dashboard {currentUser.role === 'orangtua' ? 'Orang Tua' : 'Murid'}
          </p>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {currentUser.nama.charAt(0)}
          </div>
          <h3>{currentUser.nama}</h3>
          {currentUser.role === 'murid' && <p>{currentUser.kelas}</p>}
          {currentUser.role === 'orangtua' && <p>Orang Tua - {currentUser.anakNama}</p>}
        </div>

        <nav className="sidebar-menu">
          <button 
            className={activeMenu === 'jadwal' ? 'active' : ''}
            onClick={() => setActiveMenu('jadwal')}
          >
            📅 Jadwal Les
          </button>
          <button 
            className={activeMenu === 'absensi' ? 'active' : ''}
            onClick={() => setActiveMenu('absensi')}
          >
            ✅ Riwayat Absensi
          </button>
          <button 
            className={activeMenu === 'performa' ? 'active' : ''}
            onClick={() => setActiveMenu('performa')}
          >
            📊 Performa & Laporan
          </button>
          <button 
            className={activeMenu === 'pembayaran' ? 'active' : ''}
            onClick={() => setActiveMenu('pembayaran')}
          >
            💳 Status Pembayaran
          </button>
          <button 
            className={activeMenu === 'pengumuman' ? 'active' : ''}
            onClick={() => setActiveMenu('pengumuman')}
          >
            📢 Pengumuman
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <h1>
            {activeMenu === 'jadwal' && '📅 Jadwal Les'}
            {activeMenu === 'absensi' && '✅ Riwayat Kehadiran'}
            {activeMenu === 'performa' && '📊 Performa & Laporan Bulanan'}
            {activeMenu === 'pembayaran' && '💳 Status Pembayaran'}
            {activeMenu === 'pengumuman' && '📢 Pengumuman'}
          </h1>
        </div>

        <div className="content-body">
          {activeMenu === 'jadwal' && <JadwalLes muridId={muridId} />}
          {activeMenu === 'absensi' && <RiwayatAbsensi muridId={muridId} />}
          {activeMenu === 'performa' && <PerformaMurid muridId={muridId} />}
          {activeMenu === 'pembayaran' && <StatusPembayaranMurid muridId={muridId} />}
          {activeMenu === 'pengumuman' && <PengumumanMurid />}
        </div>
      </main>
    </div>
  );
};

export default MuridDashboard;