import { useState } from 'react';
import { pengumumanData } from '../../data/PengumumanData';

const PengumumanMurid = () => {
  const [filterKategori, setFilterKategori] = useState('all');

  // Filter pengumuman untuk murid/orang tua
  const pengumumanForMurid = pengumumanData.filter(p => 
    p.target === 'Semua' || 
    p.target === 'Murid' || 
    p.target === 'Orang Tua'
  );

  // Filter berdasarkan kategori
  const pengumumanFiltered = filterKategori === 'all'
    ? pengumumanForMurid
    : pengumumanForMurid.filter(p => p.kategori === filterKategori);

  const getKategoriColor = (kategori) => {
    const colors = {
      'Libur': 'badge-info',
      'Keuangan': 'badge-warning',
      'Akademik': 'badge-success',
      'Umum': 'badge-secondary'
    };
    return colors[kategori] || 'badge-secondary';
  };

  const getKategoriIcon = (kategori) => {
    const icons = {
      'Libur': '',
      'Keuangan': '',
      'Akademik': '',
      'Umum': ''
    };
    return icons[kategori] || '';
  };

  return (
    <div className="pengumuman-murid">
      {/* Filter */}
      <div className="filter-section">
        <div className="form-group">
          <label>Filter Kategori</label>
          <select 
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            <option value="Libur"> Libur</option>
            <option value="Keuangan"> Keuangan</option>
            <option value="Akademik"> Akademik</option>
            <option value="Umum"> Umum</option>
          </select>
        </div>
      </div>

      {/* Daftar Pengumuman */}
      <div className="pengumuman-list">
        {pengumumanFiltered.length > 0 ? (
          pengumumanFiltered.map(pengumuman => (
            <div key={pengumuman.id} className="pengumuman-card-murid">
              <div className="pengumuman-badge">
                <span className={`badge ${getKategoriColor(pengumuman.kategori)}`}>
                  {getKategoriIcon(pengumuman.kategori)} {pengumuman.kategori}
                </span>
              </div>
              <div className="pengumuman-header">
                <h3>{pengumuman.judul}</h3>
                <p className="pengumuman-date">
                   {new Date(pengumuman.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="pengumuman-body">
                <p>{pengumuman.isi}</p>
              </div>
              <div className="pengumuman-footer">
                <span className="target-badge">
                   Target: {pengumuman.target}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Tidak ada pengumuman</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PengumumanMurid;