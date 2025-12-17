import { useState } from 'react';
import { jadwalMengajar } from '../../data/JadwalData';
import { muridData } from '../../data/MuridData';

const KelolaJadwal = () => {
  const [selectedKelas, setSelectedKelas] = useState('');
  
  const kelasOptions = [...new Set(jadwalMengajar.map(j => j.kelas))];
  const jadwalFiltered = selectedKelas 
    ? jadwalMengajar.filter(j => j.kelas === selectedKelas)
    : jadwalMengajar;

  const muridFiltered = selectedKelas
    ? muridData.filter(m => m.kelas === selectedKelas)
    : muridData;

  return (
    <div className="kelola-jadwal">
      <div className="filter-section">
        <div className="form-group">
          <label>Filter Kelas</label>
          <select 
            value={selectedKelas}
            onChange={(e) => setSelectedKelas(e.target.value)}
          >
            <option value="">Semua Kelas</option>
            {kelasOptions.map(kelas => (
              <option key={kelas} value={kelas}>{kelas}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Jadwal Kelas */}
      <div className="section-card">
        <h3>📅 Jadwal Kelas {selectedKelas || 'Semua'}</h3>
        <div className="jadwal-grid">
          {jadwalFiltered.map(jadwal => (
            <div key={jadwal.id} className="jadwal-card">
              <div className="jadwal-hari">{jadwal.hari}</div>
              <div className="jadwal-waktu">⏰ {jadwal.waktu}</div>
              <div className="jadwal-info">
                <p><strong>Kelas:</strong> {jadwal.kelas}</p>
                <p><strong>Mata Pelajaran:</strong> {jadwal.mataPelajaran}</p>
                <p><strong>Ruangan:</strong> {jadwal.ruangan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daftar Murid */}
      <div className="section-card">
        <h3>👥 Daftar Murid {selectedKelas || 'Semua Kelas'}</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>NIS</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Orang Tua</th>
                <th>Telepon</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {muridFiltered.map(murid => (
                <tr key={murid.id}>
                  <td>{murid.nis}</td>
                  <td>{murid.nama}</td>
                  <td><span className="badge">{murid.kelas}</span></td>
                  <td>{murid.orangTua}</td>
                  <td>{murid.telepon}</td>
                  <td>
                    <button className="btn-detail">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KelolaJadwal;