import { useState } from 'react';
import { pembayaranData, getPembayaranByMurid } from '../../data/PembayaranData';
import { muridData } from '../../data/MuridData';

const StatusPembayaranMurid = ({ muridId }) => {
  const [tahunFilter, setTahunFilter] = useState(new Date().getFullYear());
  
  const murid = muridData.find(m => m.id === muridId);
  
  if (!murid) {
    return <div className="empty-state"><p>Data murid tidak ditemukan</p></div>;
  }

  // Ambil data pembayaran murid
  const pembayaranMurid = getPembayaranByMurid(muridId);
  
  // Filter berdasarkan tahun
  const pembayaranFiltered = pembayaranMurid.filter(p => 
    p.bulan.includes(tahunFilter.toString())
  );

  // Hitung statistik
  const totalLunas = pembayaranFiltered.filter(p => p.status === 'Lunas').length;
  const totalBelum = pembayaranFiltered.filter(p => p.status === 'Belum Bayar').length;
  const totalTertunda = pembayaranFiltered.filter(p => p.status === 'Tertunda').length;
  const totalBayar = pembayaranFiltered
    .filter(p => p.status === 'Lunas')
    .reduce((sum, p) => sum + p.jumlah, 0);
  const totalTagihan = pembayaranFiltered
    .filter(p => p.status !== 'Lunas')
    .reduce((sum, p) => sum + p.jumlah, 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Lunas': return 'status-lunas';
      case 'Tertunda': return 'status-tertunda';
      case 'Belum Bayar': return 'status-belum';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Lunas': return '✅';
      case 'Tertunda': return '⏳';
      case 'Belum Bayar': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="status-pembayaran-murid">
      {/* Info Card */}
      <div className="info-card">
        <h3>💳 Status Pembayaran SPP</h3>
        <p><strong>Nama:</strong> {murid.nama}</p>
        <p><strong>Kelas:</strong> {murid.kelas}</p>
        <p><strong>NIS:</strong> {murid.nis}</p>
      </div>

      {/* Statistik Pembayaran */}
      <div className="summary-cards">
        <div className="summary-card success">
          <div className="summary-icon">✅</div>
          <h3>{totalLunas}</h3>
          <p>Bulan Lunas</p>
        </div>
        <div className="summary-card warning">
          <div className="summary-icon">⏳</div>
          <h3>{totalTertunda}</h3>
          <p>Tertunda</p>
        </div>
        <div className="summary-card danger">
          <div className="summary-icon">❌</div>
          <h3>{totalBelum}</h3>
          <p>Belum Bayar</p>
        </div>
        <div className="summary-card primary">
          <div className="summary-icon">💰</div>
          <h3>Rp {(totalBayar / 1000000).toFixed(1)}jt</h3>
          <p>Total Dibayar</p>
        </div>
      </div>

      {/* Total Tagihan */}
      {totalTagihan > 0 && (
        <div className="tagihan-card">
          <h3>⚠️ Total Tagihan Belum Dibayar</h3>
          <div className="tagihan-amount">
            Rp {totalTagihan.toLocaleString('id-ID')}
          </div>
          <p>Harap segera melakukan pembayaran</p>
        </div>
      )}

      {/* Filter Tahun */}
      <div className="filter-section">
        <div className="form-group">
          <label>Tahun</label>
          <select 
            value={tahunFilter}
            onChange={(e) => setTahunFilter(parseInt(e.target.value))}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      {/* Riwayat Pembayaran */}
      <div className="section-card">
        <h3>📋 Riwayat Pembayaran {tahunFilter}</h3>
        {pembayaranFiltered.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bulan</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                  <th>Tanggal Bayar</th>
                  <th>Metode</th>
                </tr>
              </thead>
              <tbody>
                {pembayaranFiltered.map(pembayaran => (
                  <tr key={pembayaran.id}>
                    <td><strong>{pembayaran.bulan}</strong></td>
                    <td>Rp {pembayaran.jumlah.toLocaleString('id-ID')}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(pembayaran.status)}`}>
                        {getStatusIcon(pembayaran.status)} {pembayaran.status}
                      </span>
                    </td>
                    <td>
                      {pembayaran.tanggalBayar 
                        ? new Date(pembayaran.tanggalBayar).toLocaleDateString('id-ID')
                        : '-'
                      }
                    </td>
                    <td>{pembayaran.metodePembayaran || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada data pembayaran</p>
          </div>
        )}
      </div>

      {/* Informasi Pembayaran */}
      <div className="info-box">
        <h4>ℹ️ Informasi Pembayaran</h4>
        <ul>
          <li>Pembayaran SPP dilakukan setiap tanggal 1-10 bulan berjalan</li>
          <li>Dapat melakukan pembayaran melalui Transfer Bank atau Cash</li>
          <li>Simpan bukti pembayaran untuk konfirmasi</li>
          <li>Hubungi admin jika ada kendala pembayaran</li>
        </ul>
      </div>
    </div>
  );
};

export default StatusPembayaranMurid;