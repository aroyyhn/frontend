const BASE_URL = "http://localhost:3000/api";

// === Peminjaman ===
export const getPeminjaman = async () => {
  const res = await fetch(`${BASE_URL}/peminjaman`);
  if (!res.ok) throw new Error("Gagal fetch data peminjaman");
  return res.json();
};

export const addPeminjaman = async (data) => {
  const res = await fetch(`${BASE_URL}/peminjaman/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menambahkan peminjaman");
  return res.json();
};

// === Barang ===
export const getBarang = async () => {
  const res = await fetch(`${BASE_URL}/barang`);
  if (!res.ok) throw new Error("Gagal fetch data barang");
  return res.json();
};

// === Guru ===
export const getGuru = async () => {
  const res = await fetch(`${BASE_URL}/guru`);
  if (!res.ok) throw new Error("Gagal fetch data guru");
  return res.json();
};

// === Mapel ===
export const getMapel = async () => {
  const res = await fetch(`${BASE_URL}/mapel`);
  if (!res.ok) throw new Error("Gagal fetch data mapel");
  return res.json();
};

// === Siswa by RFID ===
export const getSiswaByRFID = async (uid) => {
  const res = await fetch(`${BASE_URL}/siswa/rfid/${uid}`);
  if (!res.ok) throw new Error("Siswa tidak ditemukan");
  return res.json();
};
