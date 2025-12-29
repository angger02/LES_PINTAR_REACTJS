import { useState } from 'react';
import { muridData } from '../../data/MuridData';
import { nilaiData, tambahNilai, updateNilai } from '../../data/NilaiData';

const KelolaDataTambahan = () => {
  const [activeTab, setActiveTab] = useState('nilai');
  const [formData, setFormData] = useState({
    muridId: '',
    mataPelajaran: '',
    nilai: '',
    catatan: ''
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
      updateNilai(editId, {
        ...formData,
        nilai: parseInt(formData.nilai)
      });
    } else {
      tambahNilai({
        ...formData,
        nilai: parseInt(formData.nilai),
        muridId: parseInt(formData.muridId)
      });
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        muridId: '',
        mataPelajaran: '',
        nilai: '',
        catatan: ''
      });
      setEditId(null);
    }, 2000);
  };

  const handleEdit = (nilai) => {
    setFormData({
      muridId: nilai.muridId.toString(),
      mataPelajaran: nilai.mataPelajaran,
      nilai: nilai.nilai.toString(),
      catatan: nilai.catatan
    });
    setEditId(nilai.id);
  };

  const getMuridName = (muridId) => {
    const murid = muridData.find(m => m.id === muridId);
    return murid ? `${murid.nama} - ${murid.kelas}` : 'Unknown';
  };

  return (
    <div className="kelola-data-tambahan">
      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'nilai' ? 'active' : ''}
          onClick={() => setActiveTab('nilai')}
        >
           Nilai
        </button>
        <button 
          className={activeTab === 'catatan' ? 'active' : ''}
          onClick={() => setActiveTab('catatan')}
        >
           Catatan
        </button>
        <button 
          className={activeTab === 'dokumen' ? 'active' : ''}
          onClick={() => setActiveTab('dokumen')}
        >
           Dokumen
        </button>
      </div>

      {/* Form Input Nilai */}
      {activeTab === 'nilai' && (
        <>
          <div className="section-card">
            <h3>{editId ? '✏️ Edit Nilai' : ' Tambah Nilai Baru'}</h3>
            
            {success && (
              <div className="success-message">
                ✅ Nilai berhasil {editId ? 'diupdate' : 'ditambahkan'}!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Murid</label>
                  <select 
                    name="muridId"
                    value={formData.muridId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Murid --</option>
                    {muridData.map(murid => (
                      <option key={murid.id} value={murid.id}>
                        {murid.nama} - {murid.kelas}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Mata Pelajaran</label>
                  <select
                    name="mataPelajaran"
                    value={formData.mataPelajaran}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Mata Pelajaran --</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Kimia">Kimia</option>
                    <option value="Biologi">Biologi</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Nilai (0-100)</label>
                <input 
                  type="number"
                  name="nilai"
                  value={formData.nilai}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="form-group">
                <label>Catatan</label>
                <textarea 
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                  placeholder="Catatan tentang nilai ini..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                   {editId ? 'Update' : 'Simpan'} Nilai
                </button>
                {editId && (
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setEditId(null);
                      setFormData({
                        muridId: '',
                        mataPelajaran: '',
                        nilai: '',
                        catatan: ''
                      });
                    }}
                  >
                    ❌ Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Daftar Nilai */}
          <div className="section-card">
            <h3> Daftar Nilai</h3>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Murid</th>
                    <th>Mata Pelajaran</th>
                    <th>Nilai</th>
                    <th>Catatan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {nilaiData.map(nilai => (
                    <tr key={nilai.id}>
                      <td>{new Date(nilai.tanggal).toLocaleDateString('id-ID')}</td>
                      <td>{getMuridName(nilai.muridId)}</td>
                      <td>{nilai.mataPelajaran}</td>
                      <td><strong>{nilai.nilai}</strong></td>
                      <td>{nilai.catatan}</td>
                      <td>
                        <button 
                          className="btn-edit"
                          onClick={() => handleEdit(nilai)}
                        >
                           Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Catatan Tab */}
      {activeTab === 'catatan' && (
        <div className="section-card">
          <h3>📝 Catatan Khusus</h3>
          <p className="empty-state">Fitur catatan dalam pengembangan...</p>
        </div>
      )}

      {/* Dokumen Tab */}
      {activeTab === 'dokumen' && (
        <div className="section-card">
          <h3>📁 Dokumen</h3>
          <p className="empty-state">Fitur dokumen dalam pengembangan...</p>
        </div>
      )}
    </div>
  );
};

export default KelolaDataTambahan;