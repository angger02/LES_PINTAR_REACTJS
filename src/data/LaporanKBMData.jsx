// Data laporan KBM
export let laporanKBMData = [];

export const tambahLaporanKBM = (laporan) => {
  laporanKBMData.push({
    ...laporan,
    id: laporanKBMData.length + 1,
    tanggal: new Date().toISOString()
  });
};

export const getLaporanByGuru = (guruId) => {
  return laporanKBMData.filter(l => l.guruId === guruId);
};

export const getLaporanBulanan = (guruId, bulan, tahun) => {
  return laporanKBMData.filter(l => {
    const laporanDate = new Date(l.tanggal);
    return l.guruId === guruId && 
           laporanDate.getMonth() === bulan && 
           laporanDate.getFullYear() === tahun;
  });
};
