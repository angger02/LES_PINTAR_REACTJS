// Data jadwal mengajar guru
export const jadwalMengajar = [
  {
    id: 1,
    guruId: 2, // Pak Budi (Matematika)
    hari: "Senin",
    waktu: "08:00 - 09:30",
    kelas: "10 IPA 1",
    mataPelajaran: "Matematika",
    ruangan: "R.101"
  },
  {
    id: 2,
    guruId: 2,
    hari: "Selasa",
    waktu: "10:00 - 11:30",
    kelas: "10 IPA 2",
    mataPelajaran: "Matematika",
    ruangan: "R.102"
  },
  {
    id: 3,
    guruId: 2,
    hari: "Rabu",
    waktu: "13:00 - 14:30",
    kelas: "11 IPA 1",
    mataPelajaran: "Matematika",
    ruangan: "R.103"
  },
  {
    id: 4,
    guruId: 3, // Bu Siti (Bahasa Indonesia)
    hari: "Senin",
    waktu: "10:00 - 11:30",
    kelas: "10 IPA 1",
    mataPelajaran: "Bahasa Indonesia",
    ruangan: "R.104"
  },
  {
    id: 5,
    guruId: 3,
    hari: "Kamis",
    waktu: "08:00 - 09:30",
    kelas: "10 IPA 2",
    mataPelajaran: "Bahasa Indonesia",
    ruangan: "R.105"
  }
];

// Data murid per kelas
export const muridPerKelas = {
  "10 IPA 1": [
    { id: 4, nama: "Andi Wijaya", nis: "2023001" },
    { id: 5, nama: "Budi Santoso", nis: "2023002" },
    { id: 6, nama: "Citra Dewi", nis: "2023003" },
    { id: 7, nama: "Deni Pratama", nis: "2023004" },
    { id: 8, nama: "Eka Putri", nis: "2023005" }
  ],
  "10 IPA 2": [
    { id: 9, nama: "Fandi Ahmad", nis: "2023006" },
    { id: 10, nama: "Gita Sari", nis: "2023007" },
    { id: 11, nama: "Hendra Wijaya", nis: "2023008" },
    { id: 12, nama: "Indah Permata", nis: "2023009" },
    { id: 13, nama: "Joko Susanto", nis: "2023010" }
  ],
  "11 IPA 1": [
    { id: 14, nama: "Kiki Amelia", nis: "2022001" },
    { id: 15, nama: "Lina Marlina", nis: "2022002" },
    { id: 16, nama: "Maya Sari", nis: "2022003" },
    { id: 17, nama: "Nanda Pratama", nis: "2022004" },
    { id: 18, nama: "Oscar Wijaya", nis: "2022005" }
  ]
};