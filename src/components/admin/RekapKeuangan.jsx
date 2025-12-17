import { useState } from 'react';
import { pembayaranData, getRekapPembayaran } from '../../data/PembayaranData';

const RekapKeuangan = () => {
  const [selectedBulan, setSelectedBulan] = useState('');
  const [selectedTahun, setSelectedTahun] = useState(new Date().getFullYear());

  const bulanOptions = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const bulanFilter = selectedBulan ? `${selectedBulan} ${selectedTahun}` : null;
  const rekap = getRekapPembayaran(bulanFilter);

  const handleDownloadRekap = () => {
    const rekapText = `
REKAP KEUANGAN LES PINTAR
${bulanFilter || 'Semua Periode'}
================================

Total Pembayaran: ${rekap.total}
Status Lunas: ${rekap.lunas}
Belum Bayar: ${rekap.belumBayar}
Tertunda: ${rekap.tertunda}

Total Pemasukan: Rp ${rekap.totalPemasukan.toLocaleString('id-ID')}

Detail:
${pembayaranData
  .filter(p => !bulanFilter || p.bulan === bulanFilter)
  .map(p => `- ${p.bulan}: Rp ${p.jumlah.toLocaleString('id-ID')} (${p.status})`)
  .join('\n')}
    `;

    const blob = new Blob([rekapText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rekap_Keuangan_${bulanFilter || 'Semua'}.txt`;
    a.click();
  };

  return (
    <div className="rekap-keuangan">
      {/* Filter */}
      <div className="filter-section">
        <div className="form-group">
          <label>Bulan</label>
          <select 
            value={selectedBulan}
            onChange={(e) => setSelectedBulan(e.target.value)}
          >
            <option value="">Semua Bulan</option>
            {bulanOptions.map(bulan => (
              <option key={bulan} value={bulan}>{bulan}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tahun</label>
          <select 
            value={selectedTahun}
            onChange={(e) => setSelectedTahun(parseInt(e.target.value))}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        <button onClick={handleDownloadRekap} className="download-btn">
          📥 Download Rekap
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card success">
          <div className="summary-icon">✅</div>
          <h3>{rekap.lunas}</h3>
          <p>Pembayaran Lunas</p>
        </div>
        <div className="summary-card warning">
          <div className="summary-icon">⏳</div>
          <h3>{rekap.tertunda}</h3>
          <p>Pembayaran Tertunda</p>
        </div>
        <div className="summary-card danger">
          <div className="summary-icon">❌</div>
          <h3>{rekap.belumBayar}</h3>
          <p>Belum Bayar</p>
        </div>
        <div className="summary-card primary">
          <div className="summary-icon">💰</div>
          <h3>Rp {(rekap.totalPemasukan / 1000000).toFixed(1)}jt</h3>
          <p>Total Pemasukan</p>
        </div>
      </div>

      {/* Grafik Pembayaran (Simplified) */}
      <div className="section-card">
        <h3>📊 Statistik Pembayaran</h3>
        <div className="chart-container">
          <div className="chart-bar-group">
            <div className="chart-bar-wrapper">
              <div 
                className="chart-bar success" 
                style={{height: `${(rekap.lunas / rekap.total) * 100}%`}}
              >
                <span className="chart-value">{rekap.lunas}</span>
              </div>
              <p>Lunas</p>
            </div>
            <div className="chart-bar-wrapper">
              <div 
                className="chart-bar warning" 
                style={{height: `${(rekap.tertunda / rekap.total) * 100}%`}}
              >
                <span className="chart-value">{rekap.tertunda}</span>
              </div>
              <p>Tertunda</p>
            </div>
            <div className="chart-bar-wrapper">
              <div 
                className="chart-bar danger" 
                style={{height: `${(rekap.belumBayar / rekap.total) * 100}%`}}
              >
                <span className="chart-value">{rekap.belumBayar}</span>
              </div>
              <p>Belum Bayar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Transaksi */}
      <div className="section-card">
        <h3>📋 Detail Transaksi</h3>
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
              {pembayaranData
                .filter(p => !bulanFilter || p.bulan === bulanFilter)
                .map(pembayaran => (
                  <tr key={pembayaran.id}>
                    <td>{pembayaran.bulan}</td>
                    <td><strong>Rp {pembayaran.jumlah.toLocaleString('id-ID')}</strong></td>
                    <td>
                      <span className={`status-badge ${
                        pembayaran.status === 'Lunas' ? 'approved' : 
                        pembayaran.status === 'Tertunda' ? 'pending' : 'rejected'
                      }`}>
                        {pembayaran.status === 'Lunas' && '✅'}
                        {pembayaran.status === 'Tertunda' && '⏳'}
                        {pembayaran.status === 'Belum Bayar' && '❌'}
                        {' '}{pembayaran.status}
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
      </div>
    </div>
  );
};

export default RekapKeuangan;