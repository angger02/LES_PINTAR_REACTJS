import { useState } from 'react';
import { pengumumanData, tambahPengumuman, hapusPengumuman, updatePengumuman } from '../../data/PengumumanData';

const KelolaPengumuman = () => {
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    kategori: '',
    target: ''
  });
  const [editId, setEditId] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editId) {
      updatePengumuman(editId, formData);
    } else {
      tambahPengumuman(formData);
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        judul: '',
        isi: '',
        kategori: '',
        target: ''
      });
      setEditId(null);
    }, 2000);
  };

  const handleEdit = (pengumuman) => {
    setFormData({
      judul: pengumuman.judul,
      isi: pengumuman.isi,
      kategori: pengumuman.kategori,
      target: pengumuman.target
    });
    setEditId(pengumuman.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus pengumuman ini?')) {
      hapusPengumuman(id);
    }
  };

  const getKategoriColor = (kategori) => {
    const colors = {
      'Libur': 'badge-info',
      'Keuangan': 'badge-warning',
      'Akademik': 'badge-success',
      'Umum': 'badge-secondary'
    };
    return colors[kategori] || 'badge-secondary';
  };

  return (
    <div className="kelola-pengumuman">
      {/* Form Pengumuman */}
      <div className="section-card">
        <h3>{editId ? '✏️ Edit Pengumuman' : ' Buat Pengumuman Baru'}</h3>
        
        {success && (
          <div className="success-message">
            ✅ Pengumuman berhasil {editId ? 'diupdate' : 'dibuat'}!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Judul Pengumuman</label>
            <input 
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Contoh: Libur Lebaran 2025"
              required
            />
          </div>

          <div className="form-group">
            <label>Isi Pengumuman</label>
            <textarea 
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              placeholder="Tulis isi pengumuman di sini..."
              rows="5"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Libur">Libur</option>
                <option value="Keuangan">Keuangan</option>
                <option value="Akademik">Akademik</option>
                <option value="Umum">Umum</option>
              </select>
            </div>

            <div className="form-group">
              <label>Target</label>
              <select
                name="target"
                value={formData.target}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Target --</option>
                <option value="Semua">Semua</option>
                <option value="Murid">Murid</option>
                <option value="Orang Tua">Orang Tua</option>
                <option value="Guru">Guru</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
               {editId ? 'Update' : 'Publikasikan'} Pengumuman
            </button>
            {editId && (
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    judul: '',
                    isi: '',
                    kategori: '',
                    target: ''
                  });
                }}
              >
                ❌ Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Daftar Pengumuman */}
      <div className="section-card">
        <h3> Daftar Pengumuman</h3>
        
        {pengumumanData.length > 0 ? (
          <div className="pengumuman-list">
            {pengumumanData.map(pengumuman => (
              <div key={pengumuman.id} className="pengumuman-card">
                <div className="pengumuman-header">
                  <div>
                    <h4>{pengumuman.judul}</h4>
                    <div className="pengumuman-meta">
                      <span className={`badge ${getKategoriColor(pengumuman.kategori)}`}>
                        {pengumuman.kategori}
                      </span>
                      <span className="badge badge-secondary">
                        Target: {pengumuman.target}
                      </span>
                      <span className="date">
                         {new Date(pengumuman.tanggal).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pengumuman-body">
                  <p>{pengumuman.isi}</p>
                </div>
                <div className="pengumuman-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(pengumuman)}
                  >
                     Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(pengumuman.id)}
                  >
                     Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada pengumuman</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KelolaPengumuman;