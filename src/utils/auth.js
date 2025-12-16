// src/utils/auth.js

// Fungsi untuk login
export const loginUser = (username, password, users) => {
  const user = users.find(
    u => u.username === username && u.password === password
  );
  
  if (user) {
    // Simpan data user ke sessionStorage (tanpa password)
    const userData = { ...user };
    delete userData.password;
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    return { success: true, user: userData };
  }
  
  return { success: false, message: 'Username atau password salah!' };
};

// Fungsi untuk logout
export const logoutUser = () => {
  sessionStorage.removeItem('currentUser');
};

// Fungsi untuk cek user sudah login atau belum
export const getCurrentUser = () => {
  const userData = sessionStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Fungsi untuk cek apakah user punya akses ke role tertentu
export const hasRole = (allowedRoles) => {
  const user = getCurrentUser();
  if (!user) return false;
  return allowedRoles.includes(user.role);
};