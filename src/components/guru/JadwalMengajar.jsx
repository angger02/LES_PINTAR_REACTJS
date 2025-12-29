import { jadwalMengajar } from '../../data/JadwalData';

const JadwalMengajar = ({ guruId }) => {
  const jadwalGuru = jadwalMengajar.filter(j => j.guruId === guruId);

  const hariOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const jadwalSorted = [...jadwalGuru].sort((a, b) => 
    hariOrder.indexOf(a.hari) - hariOrder.indexOf(b.hari)
  );

  return (
    <div className="jadwal-container">
      <div className="jadwal-grid">
        {jadwalSorted.map(jadwal => (
          <div key={jadwal.id} className="jadwal-card">
            <div className="jadwal-hari">{jadwal.hari}</div>
            <div className="jadwal-waktu"> {jadwal.waktu}</div>
            <div className="jadwal-info">
              <p><strong>Kelas:</strong> {jadwal.kelas}</p>
              <p><strong>Mata Pelajaran:</strong> {jadwal.mataPelajaran}</p>
              <p><strong>Ruangan:</strong> {jadwal.ruangan}</p>
            </div>
          </div>
        ))}
      </div>

      {jadwalSorted.length === 0 && (
        <div className="empty-state">
          <p>Tidak ada jadwal mengajar</p>
        </div>
      )}
    </div>
  );
};

export default JadwalMengajar;