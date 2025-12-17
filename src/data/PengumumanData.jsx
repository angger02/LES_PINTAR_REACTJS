// Data pengumuman
export let pengumumanData = [
  {
    id: 1,
    judul: "Libur Tahun Baru",
    isi: "Les libur tanggal 1-3 Januari 2025. Kegiatan belajar dimulai kembali tanggal 4 Januari.",
    tanggal: "2024-12-20",
    kategori: "Libur",
    target: "Semua"
  },
  {
    id: 2,
    judul: "Pembayaran Bulan Februari",
    isi: "Harap melakukan pembayaran SPP bulan Februari paling lambat tanggal 10 Februari 2025.",
    tanggal: "2025-01-25",
    kategori: "Keuangan",
    target: "Orang Tua"
  }
];

export const tambahPengumuman = (pengumuman) => {
  pengumumanData.unshift({
    ...pengumuman,
    id: pengumumanData.length + 1,
    tanggal: new Date().toISOString().split('T')[0]
  });
};

export const hapusPengumuman = (id) => {
  pengumumanData = pengumumanData.filter(p => p.id !== id);
};

export const updatePengumuman = (id, data) => {
  const index = pengumumanData.findIndex(p => p.id === id);
  if (index !== -1) {
    pengumumanData[index] = { ...pengumumanData[index], ...data };
  }
};