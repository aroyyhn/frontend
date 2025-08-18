import axios from "axios";

const API_URL = "http://localhost:3000"; // ganti sesuai backend

// Ambil semua data peminjaman
export const getPeminjaman = async () => {
  try {
    const res = await axios.get(`${API_URL}/peminjaman`);
    return res.data;
  } catch (err) {
    console.error("Error fetch data:", err);
    throw err;
  }
};

// Tambah data peminjaman
export const addPeminjaman = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/peminjaman/add`, data);
    return res.data;
  } catch (err) {
    console.error("Error add data:", err);
    throw err;
  }
};

// Update data peminjaman
export const updatePeminjaman = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/peminjaman/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error update data:", err);
    throw err;
  }
};

// Hapus data peminjaman
export const deletePeminjaman = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/peminjaman/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error delete data:", err);
    throw err;
  }
};
