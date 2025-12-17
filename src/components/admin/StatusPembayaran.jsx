import { useState } from 'react';
import { muridData } from '../../data/MuridData';
import { pembayaranData, getPembayaranByMurid, updatePembayaran } from '../../data/PembayaranData';

const StatusPembayaran = () => {
  const [selectedMurid, setSelectedMurid] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const muridWithPembayaran = muridData.map(murid => {
    const pembayaran = getPembayaranByMurid(murid.id);
    const lunas = pembayaran.filter(p => p.status === 'Lunas').length;
    const total = pembayaran.length;
    const tunggakan = pembayaran.filter(p => p.status !== 'Lunas').length;

    return {
      ...murid,
      totalPembayaran: total,
      lunas,
      tunggakan
    };
  });

  const filteredMurid = muridWithPembayaran.filter(murid => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'lunas') return murid.tunggakan === 0;
    if (filterStatus === 'tunggakan') return murid.tunggakan > 0;
    return true;
  });

  const selectedMuridData = selectedMurid
    ? muridWithPembayaran.find(m => m.id === parseInt(selectedMurid))
    : null;

  const pembayaranMuridSelected = selectedMuridData
    ? getPembayaranByMurid(selectedMuridData.id)
    : [];

  const handleUpdateStatus = (id, status) => {
    const tanggalBayar = status === 'Lunas' ? new Date().toISOString().split('T')[0] : null;
    const metodePembayaran = status === 'Lunas' ? 'Transfer Bank' : null;
    
    updatePembayaran(id, {
      status,
      tanggalBayar,
      metodePembayaran
    });

    // Refresh halaman
    window.location.reload();
  };

  return (
    <div className="status-pembayaran">
      {/* Filter */}
      <div className="filter-section">
        <div className="form-group">
          <label>Filter Status</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="lunas">Lunas Semua</option>
            <option value="tunggakan">Ada Tunggakan</option>
          </select>
        </div>
      </div>

      {/* Daftar Murid & Status Pembayaran */}
      <div className="section-card">
        <h3>👥 Status Pembayaran Murid</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>NIS</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Total Pembayaran</th>
                <th>Lunas</th>
                <th>Tunggakan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMurid.map(murid => (
                <tr key={murid.id}>
                  <td>{murid.nis}</td>
                  <td>{murid.nama}</td>
                  <td><span className="badge">{murid.kelas}</span></td>
                  <td>{murid.totalPembayaran}</td>
                  <td><strong className="text-success">{murid.lunas}</strong></td>
                  <td><strong className="text-danger">{murid.tunggakan}</strong></td>
                  <td>
                    <span className={`status-badge ${
                      murid.tunggakan === 0 ? 'approved' : 'rejected'
                    }`}>
                      {murid.tunggakan === 0 ? '✅ Lancar' : '❌ Ada Tunggakan'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-detail"
                      onClick={() => setSelectedMurid(murid.id.toString())}
                    >
                      👁️ Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Pembayaran Murid */}
      {selectedMuridData && (
        <div className="section-card">
          <h3>💳 Detail Pembayaran - {selectedMuridData.nama}</h3>
          <div className="murid-info">
            <p><strong>NIS:</strong> {selectedMuridData.nis}</p>
            <p><strong>Kelas:</strong> {selectedMuridData.kelas}</p>
            <p><strong>Orang Tua:</strong> {selectedMuridData.orangTua}</p>
            <p><strong>Telepon:</strong> {selectedMuridData.telepon}</p>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bulan</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                  <th>Tanggal Bayar</th>
                  <th>Metode</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pembayaranMuridSelected.map(pembayaran => (
                  <tr key={pembayaran.id}>
                    <td>{pembayaran.bulan}</td>
                    <td><strong>Rp {pembayaran.jumlah.toLocaleString('id-ID')}</strong></td>
                    <td>
                      <span className={`status-badge ${
                        pembayaran.status === 'Lunas' ? 'approved' : 
                        pembayaran.status === 'Tertunda' ? 'pending' : 'rejected'
                      }`}>
                        {pembayaran.status}
                      </span>
                    </td>
                    <td>
                      {pembayaran.tanggalBayar 
                        ? new Date(pembayaran.tanggalBayar).toLocaleDateString('id-ID')
                        : '-'
                      }
                    </td>
                    <td>{pembayaran.metodePembayaran || '-'}</td>
                    <td>
                      {pembayaran.status !== 'Lunas' && (
                        <button 
                          className="btn-approve"
                          onClick={() => handleUpdateStatus(pembayaran.id, 'Lunas')}
                        >
                          ✅ Tandai Lunas
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            className="cancel-btn"
            onClick={() => setSelectedMurid('')}
            style={{ marginTop: '20px' }}
          >
            ⬅️ Kembali
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusPembayaran;