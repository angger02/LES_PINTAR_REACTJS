import { useState } from 'react';
import { getLaporanBulanan } from '../../data/LaporanKBMData';
import { getAbsensiByGuru } from '../../data/AbsensiData';

const LaporanBulanan = ({ guruId }) => {
  const currentDate = new Date();
  const [bulan, setBulan] = useState(currentDate.getMonth());
  const [tahun, setTahun] = useState(currentDate.getFullYear());

  const laporanKBM = getLaporanBulanan(guruId, bulan, tahun);
  const absensi = getAbsensiByGuru(guruId).filter(a => {
    const date = new Date(a.tanggal);
    return date.getMonth() === bulan && date.getFullYear() === tahun;
  });

  const namaBulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handleDownload = () => {
    const reportContent = `
LAPORAN BULANAN KEGIATAN BELAJAR MENGAJAR
Bulan: ${namaBulan[bulan]} ${tahun}

=== RINGKASAN ===
Total Pertemuan: ${laporanKBM.length}
Total Absensi Diisi: ${absensi.length}

=== DETAIL LAPORAN KBM ===
${laporanKBM.map((lap, i) => `
${i + 1}. Tanggal: ${new Date(lap.tanggal).toLocaleDateString('id-ID')}
   Kelas: ${lap.kelas}
   Materi: ${lap.materi}
   Metode: ${lap.metode}
   ${lap.hambatan ? `Hambatan: ${lap.hambatan}` : ''}
   ${lap.solusi ? `Solusi: ${lap.solusi}` : ''}
`).join('\n')}

=== REKAPITULASI ABSENSI ===
${absensi.map((abs, i) => `
${i + 1}. Tanggal: ${new Date(abs.tanggal).toLocaleDateString('id-ID')}
   Kelas: ${abs.kelas}
`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_${namaBulan[bulan]}_${tahun}.txt`;
    a.click();
  };

  return (
    <div className="laporan-bulanan">
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
            {[2024, 2025, 2026].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button onClick={handleDownload} className="download-btn">
           Download Laporan
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>{laporanKBM.length}</h3>
          <p>Total Pertemuan</p>
        </div>
        <div className="summary-card">
          <h3>{absensi.length}</h3>
          <p>Absensi Diisi</p>
        </div>
      </div>

      <div className="laporan-list">
        <h3> Laporan KBM Bulan {namaBulan[bulan]} {tahun}</h3>
        {laporanKBM.length > 0 ? (
          laporanKBM.map((lap, index) => (
            <div key={lap.id} className="laporan-item">
              <div className="laporan-header">
                <span className="laporan-no">{index + 1}</span>
                <span className="laporan-tanggal">
                  {new Date(lap.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="laporan-kelas">{lap.kelas}</span>
              </div>
              <div className="laporan-body">
                <p><strong>Materi:</strong> {lap.materi}</p>
                <p><strong>Metode:</strong> {lap.metode}</p>
                {lap.hambatan && <p><strong>Hambatan:</strong> {lap.hambatan}</p>}
                {lap.solusi && <p><strong>Solusi:</strong> {lap.solusi}</p>}
                {lap.catatan && <p><strong>Catatan:</strong> {lap.catatan}</p>}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Belum ada laporan untuk bulan ini</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaporanBulanan;