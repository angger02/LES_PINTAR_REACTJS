// Data absensi (ini akan di-update real-time)
export let absensiData = [];

export const tambahAbsensi = (absensi) => {
  absensiData.push({
    ...absensi,
    id: absensiData.length + 1,
    tanggal: new Date().toISOString()
  });
};

export const getAbsensiByGuru = (guruId) => {
  return absensiData.filter(a => a.guruId === guruId);
};