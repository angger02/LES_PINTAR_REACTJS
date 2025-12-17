// Data pembayaran murid
export let pembayaranData = [
  {
    id: 1,
    muridId: 1,
    bulan: "Januari 2025",
    jumlah: 500000,
    status: "Lunas",
    tanggalBayar: "2025-01-05",
    metodePembayaran: "Transfer Bank"
  },
  {
    id: 2,
    muridId: 1,
    bulan: "Februari 2025",
    jumlah: 500000,
    status: "Belum Bayar",
    tanggalBayar: null,
    metodePembayaran: null
  },
  {
    id: 3,
    muridId: 2,
    bulan: "Januari 2025",
    jumlah: 500000,
    status: "Lunas",
    tanggalBayar: "2025-01-10",
    metodePembayaran: "Cash"
  },
  {
    id: 4,
    muridId: 2,
    bulan: "Februari 2025",
    jumlah: 500000,
    status: "Tertunda",
    tanggalBayar: null,
    metodePembayaran: null
  },
  {
    id: 5,
    muridId: 3,
    bulan: "Januari 2025",
    jumlah: 500000,
    status: "Lunas",
    tanggalBayar: "2025-01-07",
    metodePembayaran: "Transfer Bank"
  }
];

export const tambahPembayaran = (pembayaran) => {
  pembayaranData.push({
    ...pembayaran,
    id: pembayaranData.length + 1
  });
};

export const updatePembayaran = (id, data) => {
  const index = pembayaranData.findIndex(p => p.id === id);
  if (index !== -1) {
    pembayaranData[index] = { ...pembayaranData[index], ...data };
  }
};

export const getPembayaranByMurid = (muridId) => {
  return pembayaranData.filter(p => p.muridId === muridId);
};

export const getRekapPembayaran = (bulan) => {
  const data = bulan ? pembayaranData.filter(p => p.bulan === bulan) : pembayaranData;
  
  const lunas = data.filter(p => p.status === "Lunas").length;
  const belumBayar = data.filter(p => p.status === "Belum Bayar").length;
  const tertunda = data.filter(p => p.status === "Tertunda").length;
  const totalPemasukan = data
    .filter(p => p.status === "Lunas")
    .reduce((sum, p) => sum + p.jumlah, 0);
  
  return { lunas, belumBayar, tertunda, totalPemasukan, total: data.length };
};