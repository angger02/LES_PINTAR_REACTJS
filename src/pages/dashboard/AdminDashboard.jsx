import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../utils/Auth';
import KelolaJadwal from '../../components/admin/KelolaJadwal';
import ValidasiLaporan from '../../components/admin/ValidasiLaporan';
import AnalisisPerforma from '../../components/admin/AnalisisPerforma';
import KelolaDataTambahan from '../../components/admin/KelolaDataTambahan';
import KelolaPengumuman from '../../components/admin/KelolaPengumuman';
import RekapKeuangan from '../../components/admin/RekapKeuangan';
import StatusPembayaran from '../../components/admin/StatusPembayaran';
import '../../styles/Dashboard.css';

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('jadwal');
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
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2> Les Pintar</h2>
          <p className="user-role">Dashboard Admin</p>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {currentUser.nama.charAt(0)}
          </div>
          <h3>{currentUser.nama}</h3>
          <p>Administrator</p>
        </div>

        <nav className="sidebar-menu">
          <button 
            className={activeMenu === 'jadwal' ? 'active' : ''}
            onClick={() => setActiveMenu('jadwal')}
          >
             Kelola Jadwal
          </button>
          <button 
            className={activeMenu === 'validasi' ? 'active' : ''}
            onClick={() => setActiveMenu('validasi')}
          >
             Validasi Laporan
          </button>
          <button 
            className={activeMenu === 'performa' ? 'active' : ''}
            onClick={() => setActiveMenu('performa')}
          >
             Analisis Performa
          </button>
          <button 
            className={activeMenu === 'data' ? 'active' : ''}
            onClick={() => setActiveMenu('data')}
          >
             Data Tambahan
          </button>
          <button 
            className={activeMenu === 'pengumuman' ? 'active' : ''}
            onClick={() => setActiveMenu('pengumuman')}
          >
             Pengumuman
          </button>
          <button 
            className={activeMenu === 'rekap' ? 'active' : ''}
            onClick={() => setActiveMenu('rekap')}
          >
             Rekap Keuangan
          </button>
          <button 
            className={activeMenu === 'pembayaran' ? 'active' : ''}
            onClick={() => setActiveMenu('pembayaran')}
          >
             Status Pembayaran
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
           Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <h1>
            {activeMenu === 'jadwal' && ' Kelola Jadwal Murid'}
            {activeMenu === 'validasi' && ' Validasi Laporan KBM'}
            {activeMenu === 'performa' && ' Analisis Performa Murid'}
            {activeMenu === 'data' && ' Kelola Data Tambahan'}
            {activeMenu === 'pengumuman' && ' Kelola Pengumuman'}
            {activeMenu === 'rekap' && ' Rekap Keuangan'}
            {activeMenu === 'pembayaran' && ' Status Pembayaran Murid'}
          </h1>
        </div>

        <div className="content-body">
          {activeMenu === 'jadwal' && <KelolaJadwal />}
          {activeMenu === 'validasi' && <ValidasiLaporan />}
          {activeMenu === 'performa' && <AnalisisPerforma />}
          {activeMenu === 'data' && <KelolaDataTambahan />}
          {activeMenu === 'pengumuman' && <KelolaPengumuman />}
          {activeMenu === 'rekap' && <RekapKeuangan />}
          {activeMenu === 'pembayaran' && <StatusPembayaran />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;