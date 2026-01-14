import { useState } from 'react';
import { seedDatabase } from '../utils/seedFirebase';

const SeedPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSeed = async () => {
    if (window.confirm('⚠️ Yakin ingin seed database?')) {
      setLoading(true);
      const res = await seedDatabase();
      setResult(res);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🌱 Database Seeder</h1>
      <p>Upload data dummy ke Firebase Firestore</p>
      
      <button 
        onClick={handleSeed}
        disabled={loading}
        style={{
          padding: '15px 30px',
          background: loading ? '#ccc' : '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '20px'
        }}
      >
        {loading ? '⏳ Seeding...' : '🚀 Seed Database'}
      </button>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: result.success ? '#d4edda' : '#f8d7da',
          color: result.success ? '#155724' : '#721c24',
          borderRadius: '8px'
        }}>
          {result.success ? '✅ Seeding berhasil! Cek Firebase Console' : `❌ Error: ${result.error}`}
        </div>
      )}

      <div style={{ marginTop: '40px', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h3>📋 Checklist:</h3>
        <ol>
          <li>✅ Install Firebase: <code>npm install firebase</code></li>
          <li>✅ Setup firebase.js dengan config dari Firebase Console</li>
          <li>✅ Enable Firestore Database (test mode)</li>
          <li>✅ Enable Authentication (Email/Password)</li>
          <li>⏳ Klik tombol "Seed Database" di atas</li>
          <li>⏳ Lihat console browser untuk progress</li>
          <li>⏳ Setelah selesai, hapus route /seed dari App.jsx</li>
        </ol>
      </div>
    </div>
  );
};

export default SeedPage;