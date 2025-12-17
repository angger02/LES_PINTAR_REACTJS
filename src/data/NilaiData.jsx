// Data nilai dan catatan murid
export let nilaiData = [
  {
    id: 1,
    muridId: 1,
    mataPelajaran: "Matematika",
    nilai: 85,
    tanggal: "2025-01-15",
    catatan: "Pemahaman baik, perlu latihan soal cerita"
  },
  {
    id: 2,
    muridId: 1,
    mataPelajaran: "Bahasa Indonesia",
    nilai: 90,
    tanggal: "2025-01-16",
    catatan: "Sangat baik dalam menulis esai"
  },
  {
    id: 3,
    muridId: 2,
    mataPelajaran: "Matematika",
    nilai: 78,
    tanggal: "2025-01-15",
    catatan: "Perlu bimbingan tambahan di aljabar"
  }
];

export const tambahNilai = (nilai) => {
  nilaiData.push({
    ...nilai,
    id: nilaiData.length + 1,
    tanggal: new Date().toISOString().split('T')[0]
  });
};

export const updateNilai = (id, data) => {
  const index = nilaiData.findIndex(n => n.id === id);
  if (index !== -1) {
    nilaiData[index] = { ...nilaiData[index], ...data };
  }
};

export const getNilaiByMurid = (muridId) => {
  return nilaiData.filter(n => n.muridId === muridId);
};

export const getAverageNilai = (muridId) => {
  const nilai = getNilaiByMurid(muridId);
  if (nilai.length === 0) return 0;
  const total = nilai.reduce((sum, n) => sum + n.nilai, 0);
  return (total / nilai.length).toFixed(2);
};