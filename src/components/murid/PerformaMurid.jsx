import { useState } from 'react';
import { nilaiData } from '../../data/NilaiData';
import { muridData } from '../../data/MuridData';
import { laporanKBMData } from '../../data/LaporanKBMData';

const PerformaMurid = ({ muridId }) => {
  const [bulan, setBulan] = useState(new Date().getMonth());
  const [tahun, setTahun] = useState(new Date().getFullYear());
  
  const murid = muridData.find(m => m.id === muridId);
  
  if (!murid) {
    return <div className="empty-state"><p>Data murid tidak ditemukan</p></div>;
  }

  // Ambil nilai murid
  const nilaiMurid = nilaiData.filter(n => n.muridId === muridId);
  
  // Hitung rata-rata nilai
  const rataRata = nilaiMurid.length > 0
    ? (nilaiMurid.reduce((sum, n) => sum + n.nilai, 0) / nilaiMurid.length).toFixed(1)
    : 0;

  // Ambil laporan KBM untuk kelas murid di bulan tertentu
  const laporanBulan = laporanKBMData.filter(lap => {
    const lapDate = new Date(lap.tanggal);
    return lap.kelas === murid.kelas && 
           lapDate.getMonth() === bulan && 
           lapDate.getFullYear() === tahun;
  });

  const namaBulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handleDownloadReport = () => {
    const reportContent = `
LAPORAN PERFORMA MURID
${namaBulan[bulan]} ${tahun}

=== DATA MURID ===
Nama: ${murid.nama}
NIS: ${murid.nis}
Kelas: ${murid.kelas}

=== NILAI ===
Rata-rata: ${rataRata}

Detail Nilai:
${nilaiMurid.map((n, i) => `
${i + 1}. ${n.mataPelajaran}: ${n.nilai}
   Tanggal: ${new Date(n.tanggal).toLocaleDateString('id-ID')}
   Catatan: ${n.catatan}
`).join('\n')}

=== MATERI YANG DIPELAJARI ===
${laporanBulan.map((lap, i) => `
${i + 1}. Tanggal: ${new Date(lap.tanggal).toLocaleDateString('id-ID')}
   Materi: ${lap.materi}
   Metode: ${lap.metode}
`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_${murid.nama}_${namaBulan[bulan]}_${tahun}.txt`;
    a.click();
  };

  return (
    <div className="performa-murid">
      {/* Info Card */}
      <div className="info-card">
        <h3> Performa Belajar</h3>
        <p><strong>Nama:</strong> {murid.nama}</p>
        <p><strong>Kelas:</strong> {murid.kelas}</p>
        <p><strong>NIS:</strong> {murid.nis}</p>
      </div>

      {/* Statistik Nilai */}
      <div className="summary-cards">
        <div className="summary-card primary">
          <div className="summary-icon"></div>
          <h3>{rataRata}</h3>
          <p>Rata-rata Nilai</p>
        </div>
        <div className="summary-card success">
          <div className="summary-icon"></div>
          <h3>{nilaiMurid.length}</h3>
          <p>Total Penilaian</p>
        </div>
        <div className="summary-card info">
          <div className="summary-icon"></div>
          <h3>{nilaiMurid.filter(n => n.nilai >= 80).length}</h3>
          <p>Nilai ≥ 80</p>
        </div>
        <div className="summary-card warning">
          <div className="summary-icon"></div>
          <h3>{nilaiMurid.filter(n => n.nilai < 70).length}</h3>
          <p>Perlu Bimbingan</p>
        </div>
      </div>

      {/* Daftar Nilai */}
      <div className="section-card">
        <h3> Daftar Nilai</h3>
        {nilaiMurid.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Mata Pelajaran</th>
                  <th>Nilai</th>
                  <th>Catatan Guru</th>
                </tr>
              </thead>
              <tbody>
                {nilaiMurid.map(nilai => (
                  <tr key={nilai.id}>
                    <td>{new Date(nilai.tanggal).toLocaleDateString('id-ID')}</td>
                    <td><strong>{nilai.mataPelajaran}</strong></td>
                    <td>
                      <span className={`nilai-badge ${
                        nilai.nilai >= 80 ? 'nilai-baik' : 
                        nilai.nilai >= 70 ? 'nilai-cukup' : 'nilai-kurang'
                      }`}>
                        {nilai.nilai}
                      </span>
                    </td>
                    <td>{nilai.catatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada data nilai</p>
          </div>
        )}
      </div>

      {/* Laporan Bulanan */}
      <div className="section-card">
        <div className="section-header">
          <h3> Laporan Bulanan</h3>
          <button onClick={handleDownloadReport} className="download-btn">
             Download Laporan
          </button>
        </div>

        <div className="filter-section">
          <div className="form-group">
            <label>Bulan</label>
            <select value={bulan} onChange={(e) => setBulan(parseInt(e.target.value))}>
              {namaBulan.map((nama, index) => (
                <option key={index} value={index}>{nama}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tahun</label>
            <select value={tahun} onChange={(e) => setTahun(parseInt(e.target.value))}>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>

        <h4> Materi yang Dipelajari di {namaBulan[bulan]} {tahun}</h4>
        {laporanBulan.length > 0 ? (
          <div className="laporan-list">
            {laporanBulan.map((lap, index) => (
              <div key={lap.id} className="laporan-item">
                <div className="laporan-number">{index + 1}</div>
                <div className="laporan-content">
                  <p className="laporan-date">
                     {new Date(lap.tanggal).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p><strong>Materi:</strong> {lap.materi}</p>
                  <p><strong>Metode Pembelajaran:</strong> {lap.metode}</p>
                  {lap.catatan && <p><strong>Catatan:</strong> {lap.catatan}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada laporan untuk bulan ini</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformaMurid;