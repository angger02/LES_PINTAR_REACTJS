import { jadwalMengajar } from '../../data/JadwalData';
import { muridData } from '../../data/MuridData';

const JadwalLes = ({ muridId }) => {
  // Ambil data murid
  const murid = muridData.find(m => m.id === muridId);
  
  if (!murid) {
    return <div className="empty-state"><p>Data murid tidak ditemukan</p></div>;
  }

  // Filter jadwal berdasarkan kelas murid
  const jadwalMurid = jadwalMengajar.filter(j => j.kelas === murid.kelas);

  // Urutkan berdasarkan hari
  const hariOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const jadwalSorted = [...jadwalMurid].sort((a, b) => 
    hariOrder.indexOf(a.hari) - hariOrder.indexOf(b.hari)
  );

  return (
    <div className="jadwal-les">
      <div className="info-card">
        <h3>📚 Jadwal Les Anda</h3>
        <p><strong>Nama:</strong> {murid.nama}</p>
        <p><strong>Kelas:</strong> {murid.kelas}</p>
        <p><strong>NIS:</strong> {murid.nis}</p>
      </div>

      <div className="jadwal-grid">
        {jadwalSorted.map(jadwal => (
          <div key={jadwal.id} className="jadwal-card">
            <div className="jadwal-hari">{jadwal.hari}</div>
            <div className="jadwal-waktu">⏰ {jadwal.waktu}</div>
            <div className="jadwal-info">
              <p><strong>📖 Mata Pelajaran:</strong></p>
              <p className="mata-pelajaran">{jadwal.mataPelajaran}</p>
              <p><strong>🏫 Ruangan:</strong> {jadwal.ruangan}</p>
            </div>
          </div>
        ))}
      </div>

      {jadwalSorted.length === 0 && (
        <div className="empty-state">
          <p>Belum ada jadwal les untuk kelas Anda</p>
        </div>
      )}
    </div>
  );
};

export default JadwalLes;