import { useState } from 'react';
import { muridData } from '../../data/MuridData';
import { nilaiData, getAverageNilai } from '../../data/NilaiData';
import { absensiData } from '../../data/AbsensiData';

const AnalisisPerforma = () => {
  const [selectedMurid, setSelectedMurid] = useState('');

  const muridWithPerforma = muridData.map(murid => {
    const rataRata = getAverageNilai(murid.id);
    const nilaiMurid = nilaiData.filter(n => n.muridId === murid.id);
    
    return {
      ...murid,
      rataRata: parseFloat(rataRata),
      jumlahNilai: nilaiMurid.length
    };
  }).sort((a, b) => b.rataRata - a.rataRata);

  const selectedMuridData = selectedMurid 
    ? muridWithPerforma.find(m => m.id === parseInt(selectedMurid))
    : null;

  const nilaiMuridSelected = selectedMuridData
    ? nilaiData.filter(n => n.muridId === selectedMuridData.id)
    : [];

  return (
    <div className="analisis-performa">
      {/* Ringkasan Performa */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>{muridData.length}</h3>
          <p>Total Murid</p>
        </div>
        <div className="summary-card">
          <h3>{muridWithPerforma.filter(m => m.rataRata >= 80).length}</h3>
          <p>Performa Baik (≥80)</p>
        </div>
        <div className="summary-card">
          <h3>{muridWithPerforma.filter(m => m.rataRata < 70 && m.rataRata > 0).length}</h3>
          <p>Perlu Bimbingan (&lt;70)</p>
        </div>
        <div className="summary-card">
          <h3>{(muridWithPerforma.reduce((sum, m) => sum + m.rataRata, 0) / muridWithPerforma.filter(m => m.rataRata > 0).length).toFixed(1)}</h3>
          <p>Rata-rata Kelas</p>
        </div>
      </div>

      {/* Ranking Murid */}
      <div className="section-card">
        <h3> Ranking Murid (Berdasarkan Rata-rata Nilai)</h3>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>NIS</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Rata-rata</th>
                <th>Jumlah Nilai</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {muridWithPerforma
                .filter(m => m.rataRata > 0)
                .map((murid, index) => (
                <tr key={murid.id}>
                  <td>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && index + 1}
                  </td>
                  <td>{murid.nis}</td>
                  <td>{murid.nama}</td>
                  <td><span className="badge">{murid.kelas}</span></td>
                  <td><strong>{murid.rataRata.toFixed(1)}</strong></td>
                  <td>{murid.jumlahNilai}</td>
                  <td>
                    <span className={`status-badge ${
                      murid.rataRata >= 80 ? 'approved' : 
                      murid.rataRata >= 70 ? 'pending' : 'rejected'
                    }`}>
                      {murid.rataRata >= 80 && ' Baik'}
                      {murid.rataRata >= 70 && murid.rataRata < 80 && ' Cukup'}
                      {murid.rataRata < 70 && ' Perlu Bimbingan'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Murid */}
      <div className="section-card">
        <h3> Detail Performa Murid</h3>
        <div className="form-group">
          <label>Pilih Murid</label>
          <select 
            value={selectedMurid}
            onChange={(e) => setSelectedMurid(e.target.value)}
          >
            <option value="">-- Pilih Murid --</option>
            {muridData.map(murid => (
              <option key={murid.id} value={murid.id}>
                {murid.nama} - {murid.kelas}
              </option>
            ))}
          </select>
        </div>

        {selectedMuridData && (
          <div className="murid-detail">
            <div className="detail-header">
              <h4>{selectedMuridData.nama}</h4>
              <p>{selectedMuridData.kelas} • NIS: {selectedMuridData.nis}</p>
            </div>

            {nilaiMuridSelected.length > 0 ? (
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Mata Pelajaran</th>
                      <th>Nilai</th>
                      <th>Catatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nilaiMuridSelected.map(nilai => (
                      <tr key={nilai.id}>
                        <td>{new Date(nilai.tanggal).toLocaleDateString('id-ID')}</td>
                        <td>{nilai.mataPelajaran}</td>
                        <td><strong>{nilai.nilai}</strong></td>
                        <td>{nilai.catatan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-state">Belum ada data nilai</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalisisPerforma;