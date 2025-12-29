import { useState } from 'react';
import { laporanKBMData } from '../../data/LaporanKBMData';
import { user } from '../../data/User';

const ValidasiLaporan = () => {
  const [filter, setFilter] = useState('pending');

  // Tambahkan status validasi ke laporan (simulasi)
  const laporanWithStatus = laporanKBMData.map(lap => ({
    ...lap,
    status: lap.status || 'pending',
    validator: lap.validator || null
  }));

  const laporanFiltered = laporanWithStatus.filter(lap => {
    if (filter === 'all') return true;
    return lap.status === filter;
  });

  const handleValidasi = (id, status) => {
    alert(`Laporan ${id} ${status === 'approved' ? 'disetujui' : 'ditolak'}`);
    // Di implementasi real, update ke database
  };

  const getGuruName = (guruId) => {
    const guru = user.find(u => u.id === guruId);
    return guru ? guru.nama : 'Unknown';
  };

  return (
    <div className="validasi-laporan">
      <div className="filter-section">
        <div className="form-group">
          <label>Filter Status</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Semua</option>
            <option value="pending">Pending</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>

      <div className="laporan-list">
        {laporanFiltered.length > 0 ? (
          laporanFiltered.map(lap => (
            <div key={lap.id} className="laporan-card">
              <div className="laporan-header">
                <div>
                  <h4>{getGuruName(lap.guruId)}</h4>
                  <p className="laporan-meta">
                    {new Date(lap.tanggal).toLocaleDateString('id-ID')} • {lap.kelas}
                  </p>
                </div>
                <span className={`status-badge ${lap.status}`}>
                  {lap.status === 'pending' && ' Pending'}
                  {lap.status === 'approved' && ' Disetujui'}
                  {lap.status === 'rejected' && ' Ditolak'}
                </span>
              </div>
              <div className="laporan-content">
                <p><strong>Materi:</strong> {lap.materi}</p>
                <p><strong>Metode:</strong> {lap.metode}</p>
                {lap.hambatan && <p><strong>Hambatan:</strong> {lap.hambatan}</p>}
                {lap.solusi && <p><strong>Solusi:</strong> {lap.solusi}</p>}
                {lap.catatan && <p><strong>Catatan:</strong> {lap.catatan}</p>}
              </div>
              {lap.status === 'pending' && (
                <div className="laporan-actions">
                  <button 
                    className="btn-approve"
                    onClick={() => handleValidasi(lap.id, 'approved')}
                  >
                     Setujui
                  </button>
                  <button 
                    className="btn-reject"
                    onClick={() => handleValidasi(lap.id, 'rejected')}
                  >
                     Tolak
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Tidak ada laporan dengan status {filter}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidasiLaporan;