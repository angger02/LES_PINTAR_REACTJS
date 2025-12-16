import { useState } from 'react';
import { jadwalMengajar } from '../../data/JadwalData';
import { tambahLaporanKBM } from '../../data/LaporanKBMData';

const LaporanKBMForm = ({ guruId }) => {
  const [formData, setFormData] = useState({
    kelas: '',
    tanggal: new Date().toISOString().split('T')[0],
    materi: '',
    metode: '',
    hambatan: '',
    solusi: '',
    catatan: ''
  });
  const [success, setSuccess] = useState(false);

  const jadwalGuru = jadwalMengajar.filter(j => j.guruId === guruId);
  const kelasOptions = [...new Set(jadwalGuru.map(j => j.kelas))];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    tambahLaporanKBM({
      guruId,
      ...formData
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        kelas: '',
        tanggal: new Date().toISOString().split('T')[0],
        materi: '',
        metode: '',
        hambatan: '',
        solusi: '',
        catatan: ''
      });
    }, 2000);
  };

  return (
    <div className="laporan-kbm-form">
      {success && (
        <div className="success-message">
          ✅ Laporan KBM berhasil disimpan!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Tanggal</label>
            <input 
              type="date" 
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Kelas</label>
            <select 
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Kelas --</option>
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Materi yang Diajarkan</label>
          <textarea 
            name="materi"
            value={formData.materi}
            onChange={handleChange}
            placeholder="Contoh: Persamaan Kuadrat - Rumus ABC"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Metode Pembelajaran</label>
          <textarea 
            name="metode"
            value={formData.metode}
            onChange={handleChange}
            placeholder="Contoh: Ceramah, diskusi kelompok, dan latihan soal"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Hambatan/Kendala (jika ada)</label>
          <textarea 
            name="hambatan"
            value={formData.hambatan}
            onChange={handleChange}
            placeholder="Contoh: Beberapa murid kesulitan memahami konsep..."
            rows="2"
          />
        </div>

        <div className="form-group">
          <label>Solusi yang Diterapkan</label>
          <textarea 
            name="solusi"
            value={formData.solusi}
            onChange={handleChange}
            placeholder="Contoh: Memberikan penjelasan tambahan dengan contoh konkret..."
            rows="2"
          />
        </div>

        <div className="form-group">
          <label>Catatan Tambahan</label>
          <textarea 
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            placeholder="Catatan lain yang perlu disampaikan..."
            rows="2"
          />
        </div>

        <button type="submit" className="submit-btn">
           Simpan Laporan KBM
        </button>
      </form>
    </div>
  );
};

export default LaporanKBMForm;