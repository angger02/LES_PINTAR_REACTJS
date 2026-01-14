import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

// Import data dummy
import { user } from '../data/User';
import { muridData } from '../data/MuridData';
import { jadwalMengajar } from '../data/JadwalData';
import { pembayaranData } from '../data/PembayaranData';
import { pengumumanData } from '../data/PengumumanData';
import { nilaiData } from '../data/NilaiData';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // 1. Seed Users
    console.log('📝 Seeding users...');
    for (const userData of user) {
      try {
        const email = userData.email || `${userData.username}@lespintar.com`;
        const password = userData.password;
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, 'users', uid), {
          username: userData.username,
          email: email,
          role: userData.role,
          nama: userData.nama,
          mataPelajaran: userData.mataPelajaran || null,
          kelas: userData.kelas || null,
          orangTua: userData.orangTua || null,
          anakNama: userData.anakNama || null,
          anakKelas: userData.anakKelas || null,
          createdAt: new Date().toISOString()
        });

        console.log(`✅ User ${userData.username} created`);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`⚠️ User ${userData.username} already exists`);
        } else {
          console.error(`❌ Error: ${error.message}`);
        }
      }
    }

    // 2. Seed Murid
    console.log('📝 Seeding murid...');
    for (const murid of muridData) {
      await addDoc(collection(db, 'murid'), murid);
    }
    console.log(`✅ ${muridData.length} murid added`);

    // 3. Seed Jadwal
    console.log('📝 Seeding jadwal...');
    for (const jadwal of jadwalMengajar) {
      await addDoc(collection(db, 'jadwal'), jadwal);
    }
    console.log(`✅ ${jadwalMengajar.length} jadwal added`);

    // 4. Seed Pembayaran
    console.log('📝 Seeding pembayaran...');
    for (const pembayaran of pembayaranData) {
      await addDoc(collection(db, 'pembayaran'), pembayaran);
    }
    console.log(`✅ ${pembayaranData.length} pembayaran added`);

    // 5. Seed Pengumuman
    console.log('📝 Seeding pengumuman...');
    for (const pengumuman of pengumumanData) {
      await addDoc(collection(db, 'pengumuman'), pengumuman);
    }
    console.log(`✅ ${pengumumanData.length} pengumuman added`);

    // 6. Seed Nilai
    console.log('📝 Seeding nilai...');
    for (const nilai of nilaiData) {
      await addDoc(collection(db, 'nilai'), nilai);
    }
    console.log(`✅ ${nilaiData.length} nilai added`);

    console.log('🎉 Seeding completed!');
    return { success: true };
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error: error.message };
  }
};