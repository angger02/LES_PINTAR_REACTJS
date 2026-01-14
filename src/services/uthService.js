import { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // ✅ BENAR
import { auth, db } from '../config/firebase';

// Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Ambil data user dari Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = { uid: user.uid, ...userDoc.data() };
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true, user: userData };
    } else {
      return { success: false, message: 'Data user tidak ditemukan' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.message };
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    sessionStorage.removeItem('currentUser');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: error.message };
  }
};

// Get Current User
export const getCurrentUser = () => {
  const userData = sessionStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Register User (untuk admin membuat user baru)
export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Simpan data user ke Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      ...userData,
      createdAt: new Date().toISOString()
    });
    
    return { success: true, user: { uid: user.uid, ...userData } };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: error.message };
  }
};

// Check role
export const hasRole = (allowedRoles) => {
  const user = getCurrentUser();
  if (!user) return false;
  return allowedRoles.includes(user.role);
};
