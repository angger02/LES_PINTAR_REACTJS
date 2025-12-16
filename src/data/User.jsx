// src/data/users.js
// Data dummy untuk testing (nanti ganti dengan API)

export const user = [
  // Admin
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    nama: "Administrator",
    email: "admin@lespintar.com"
  },
  // Guru
  {
    id: 2,
    username: "guru1",
    password: "guru123",
    role: "guru",
    nama: "Pak Budi Santoso",
    email: "budi@lespintar.com",
    mataPelajaran: "Matematika"
  },
  {
    id: 3,
    username: "guru2",
    password: "guru123",
    role: "guru",
    nama: "Bu Siti Rahmawati",
    email: "siti@lespintar.com",
    mataPelajaran: "Bahasa Indonesia"
  },
  // Murid/Orang Tua
  {
    id: 4,
    username: "murid1",
    password: "murid123",
    role: "murid",
    nama: "Andi Wijaya",
    email: "andi@gmail.com",
    kelas: "10 IPA 1",
    orangTua: "Bapak Wijaya"
  },
  {
    id: 5,
    username: "orangtua1",
    password: "orangtua123",
    role: "orangtua",
    nama: "Ibu Dewi",
    email: "dewi@gmail.com",
    anakNama: "Andi Wijaya",
    anakKelas: "10 IPA 1"
  }
];