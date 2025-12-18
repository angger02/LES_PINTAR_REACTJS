import { useState } from 'react';
import { absensiData } from '../../data/AbsensiData';
import { muridData } from '../../data/MuridData';

const RiwayatAbsensi = ({ muridId }) => {
  const [bulanFilter, setBulanFilter] = useState('');
  
  const murid = muridData.find(m => m.id === muridId);
  
  if (!murid) {
    return <div className="empty-state"><p>Data murid tidak ditemukan</p></div>;
  }

  // Filter absensi berdasarkan kelas murid
  const absensiMurid = absensiData
    .filter(abs => abs.kelas === murid.kelas)
    .map(abs => {
      const muridAbsensi = abs.absensi.find(a => a.muridId === muridId);
      return {
        tanggal: abs.tanggal,
        kelas: abs.kelas,
        status: muridAbsensi ? muridAbsensi.status : 'tidak tercatat'
      };
    })
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  // Filter berdasarkan bulan jika dipilih
  const absensiFiltered = bulanFilter
    ? absensiMurid.filter(abs => {
        const bulan = new Date(abs.tanggal).toLocaleString('id-ID', { month: 'long', year: 'numeric' });
        return bulan === bulanFilter;
      })
    : absensiMurid;

  // Hitung statistik
  const totalHadir = absensiMurid.filter(a => a.status === 'hadir').length;
  const totalSakit = absensiMurid.filter(a => a.status === 'sakit').length;
  const totalIzin = absensiMurid.filter(a => a.status === 'izin').length;
  const totalAlpha = absensiMurid.filter(a => a.status === 'alpha').length;
  const totalPertemuan = absensiMurid.length;
  const persentaseKehadiran = totalPertemuan > 0 
    ? ((totalHadir / totalPertemuan) * 100).toFixed(1) 
    : 0;

  // Dapatkan daftar bulan yang tersedia
  const bulanOptions = [...new Set(absensiMurid.map(abs => 
    new Date(abs.tanggal).toLocaleString('id-ID', { month: 'long', year: 'numeric' })
  ))];

  const getStatusColor = (status) => {
    switch(status) {
      case 'hadir': return 'status-hadir';
      case 'sakit': return 'status-sakit';
      case 'izin': return 'status-izin';
      case 'alpha': return 'status-alpha';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'hadir': return '✅';
      case 'sakit': return '🤒';
      case 'izin': return '📝';
      case 'alpha': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="riwayat-absensi">
      {/* Info Card */}
      <div className="info-card">
        <h3>👨‍🎓 Data Kehadiran</h3>
        <p><strong>Nama:</strong> {murid.nama}</p>
        <p><strong>Kelas:</strong> {murid.kelas}</p>
      </div>

      {/* Statistik Kehadiran */}
      <div className="summary-cards">
        <div className="summary-card success">
          <div className="summary-icon">✅</div>
          <h3>{totalHadir}</h3>
          <p>Hadir</p>
        </div>
        <div className="summary-card warning">
          <div className="summary-icon">🤒</div>
          <h3>{totalSakit}</h3>
          <p>Sakit</p>
        </div>
        <div className="summary-card info">
          <div className="summary-icon">📝</div>
          <h3>{totalIzin}</h3>
          <p>Izin</p>
        </div>
        <div className="summary-card danger">
          <div className="summary-icon">❌</div>
          <h3>{totalAlpha}</h3>
          <p>Alpha</p>
        </div>
      </div>

      {/* Persentase Kehadiran */}
      <div className="percentage-card">
        <h3>📈 Persentase Kehadiran</h3>
        <div className="percentage-bar">
          <div 
            className="percentage-fill" 
            style={{ width: `${persentaseKehadiran}%` }}
          >
            <span>{persentaseKehadiran}%</span>
          </div>
        </div>
        <p>{totalHadir} dari {totalPertemuan} pertemuan</p>
      </div>

      {/* Filter Bulan */}
      <div className="filter-section">
        <div className="form-group">
          <label>Filter Bulan</label>
          <select 
            value={bulanFilter}
            onChange={(e) => setBulanFilter(e.target.value)}
          >
            <option value="">Semua Bulan</option>
            {bulanOptions.map(bulan => (
              <option key={bulan} value={bulan}>{bulan}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel Riwayat */}
      <div className="section-card">
        <h3>📋 Riwayat Kehadiran</h3>
        {absensiFiltered.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Kelas</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {absensiFiltered.map((abs, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(abs.tanggal).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td><span className="badge">{abs.kelas}</span></td>
                    <td>
                      <span className={`status-badge ${getStatusColor(abs.status)}`}>
                        {getStatusIcon(abs.status)} {abs.status.charAt(0).toUpperCase() + abs.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada data absensi</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatAbsensi;