import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../utils/Auth';
import AbsensiForm from '../../components/guru/AbsensiForm';
import LaporanKBMForm from '../../components/guru/LaporanKBMForm';
import JadwalMengajar from '../../components/guru/JadwalMengajar';
import LaporanBulanan from '../../components/guru/LaporanBulanan';
import '../../styles/Dashboard.css';

const GuruDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('jadwal');
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'guru') {
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
    <div className="guru-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2> Les Pintar</h2>
          <p className="user-role">Dashboard Guru</p>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {currentUser.nama.charAt(0)}
          </div>
          <h3>{currentUser.nama}</h3>
          <p>{currentUser.mataPelajaran}</p>
        </div>

        <nav className="sidebar-menu">
          <button 
            className={activeMenu === 'jadwal' ? 'active' : ''}
            onClick={() => setActiveMenu('jadwal')}
          >
             Jadwal Mengajar
          </button>
          <button 
            className={activeMenu === 'absensi' ? 'active' : ''}
            onClick={() => setActiveMenu('absensi')}
          >
             Isi Absensi
          </button>
          <button 
            className={activeMenu === 'laporan' ? 'active' : ''}
            onClick={() => setActiveMenu('laporan')}
          >
             Laporan KBM
          </button>
          <button 
            className={activeMenu === 'bulanan' ? 'active' : ''}
            onClick={() => setActiveMenu('bulanan')}
          >
             Laporan Bulanan
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
            {activeMenu === 'jadwal' && ' Jadwal Mengajar'}
            {activeMenu === 'absensi' && ' Isi Absensi Murid'}
            {activeMenu === 'laporan' && ' Input Laporan KBM'}
            {activeMenu === 'bulanan' && ' Laporan Bulanan'}
          </h1>
        </div>

        <div className="content-body">
          {activeMenu === 'jadwal' && <JadwalMengajar guruId={currentUser.id} />}
          {activeMenu === 'absensi' && <AbsensiForm guruId={currentUser.id} />}
          {activeMenu === 'laporan' && <LaporanKBMForm guruId={currentUser.id} />}
          {activeMenu === 'bulanan' && <LaporanBulanan guruId={currentUser.id} />}
        </div>
      </main>
    </div>
  );
};

export default GuruDashboard;