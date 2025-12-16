import { useState } from 'react';
import { jadwalMengajar, muridPerKelas } from '../../data/JadwalData';
import { tambahAbsensi } from '../../data/AbsensiData';

const AbsensiForm = ({ guruId }) => {
  const [selectedKelas, setSelectedKelas] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [absensi, setAbsensi] = useState({});
  const [success, setSuccess] = useState(false);

  const jadwalGuru = jadwalMengajar.filter(j => j.guruId === guruId);
  const kelasOptions = [...new Set(jadwalGuru.map(j => j.kelas))];

  const handleKelasChange = (kelas) => {
    setSelectedKelas(kelas);
    const murid = muridPerKelas[kelas] || [];
    const initialAbsensi = {};
    murid.forEach(m => {
      initialAbsensi[m.id] = 'hadir';
    });
    setAbsensi(initialAbsensi);
  };

  const handleAbsensiChange = (muridId, status) => {
    setAbsensi(prev => ({
      ...prev,
      [muridId]: status
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataAbsensi = {
      guruId,
      kelas: selectedKelas,
      tanggal,
      absensi: Object.entries(absensi).map(([muridId, status]) => ({
        muridId: parseInt(muridId),
        status
      }))
    };

    tambahAbsensi(dataAbsensi);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedKelas('');
      setAbsensi({});
    }, 2000);
  };

  const muridList = selectedKelas ? (muridPerKelas[selectedKelas] || []) : [];

  return (
    <div className="absensi-form">
      {success && (
        <div className="success-message">
          ✅ Absensi berhasil disimpan!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tanggal</label>
          <input 
            type="date" 
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Pilih Kelas</label>
          <select 
            value={selectedKelas}
            onChange={(e) => handleKelasChange(e.target.value)}
            required
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasOptions.map(kelas => (
              <option key={kelas} value={kelas}>{kelas}</option>
            ))}
          </select>
        </div>

        {selectedKelas && muridList.length > 0 && (
          <>
            <div className="absensi-table">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NIS</th>
                    <th>Nama Murid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {muridList.map((murid, index) => (
                    <tr key={murid.id}>
                      <td>{index + 1}</td>
                      <td>{murid.nis}</td>
                      <td>{murid.nama}</td>
                      <td>
                        <select 
                          value={absensi[murid.id] || 'hadir'}
                          onChange={(e) => handleAbsensiChange(murid.id, e.target.value)}
                        >
                          <option value="hadir">✅ Hadir</option>
                          <option value="sakit">🤒 Sakit</option>
                          <option value="izin">📝 Izin</option>
                          <option value="alpha">❌ Alpha</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="submit" className="submit-btn">
              💾 Simpan Absensi
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AbsensiForm;