import { useState, useEffect } from "react";
import { getBarang, getGuru, getMapel, addPeminjaman } from "../services/api";

export default function FormPeminjaman({ nis, nama, onSelesai }) {
  const [barangList, setBarangList] = useState([]);
  const [guruList, setGuruList] = useState([]);
  const [mapelList, setListMapel] = useState([]);

  const [id_barang, setBarang] = useState("");
  const [waktu_pinjam, setJamPinjam] = useState("");
  const [waktu_kembali, setJamKembali] = useState("");
  const [mapel, setMapel] = useState("");
  const [id_guru, setGuruId] = useState("");
  const [keterangan, setKeterangan] = useState("");
  

  // fetch data barang & guru dari API
  useEffect(() => {
    getBarang().then(setBarangList).catch((err) => console.error("Error fetch barang:", err));
    getGuru().then(setGuruList).catch((err) => console.error("Error fetch guru:", err));
    getMapel().then(setListMapel).catch((err) => console.error("Error fetch mapel:", err));
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPeminjaman({
        nis,
        nama,
        id_barang: id_barang,   // foreign key ke tabel barang
        id_guru: id_guru,       // foreign key ke tabel guru
        waktu_pinjam: waktu_pinjam,
        waktu_kembali: waktu_kembali,
        mapel,       
        keterangan,
      });

      alert("Data berhasil disimpan ke database!");
      if (onSelesai) onSelesai();
    } catch (err) {
      console.error("Gagal simpan data:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="font-bold text-xl text-gray-800">Form Peminjaman</h2>

      {/* NIS */}
      <label className="block text-sm font-medium text-gray-700">
        NIS
        <input
          type="text"
          value={nis}
          readOnly
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed shadow-sm"
        />
      </label>

      {/* Nama */}
      <label className="block text-sm font-medium text-gray-700">
        Nama
        <input
          type="text"
          value={nama}
          readOnly
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed shadow-sm"
        />
      </label>

      {/* Barang */}
      <label className="block text-sm font-medium text-gray-700">
        Barang
      <select
        value={id_barang}
        onChange={(e) => setBarang(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">Pilih Barang</option>

        <optgroup label="Lab Komputer 1">
          {barangList
            .filter((b) => b.lokasi === "Lab Komputer 1")
            .map((b) => (
              <option key={b.id_barang} value={b.id_barang}>
                {b.jenis} {b.nomor}
              </option>
            ))}
        </optgroup>

        <optgroup label="Lab Komputer 2">
          {barangList
            .filter((b) => b.lokasi === "Lab Komputer 2")
            .map((b) => (
              <option key={b.id_barang} value={b.id_barang}>
                {b.jenis} {b.nomor}
              </option>
            ))}
        </optgroup>
      </select>
      </label>

      {/* Jam Peminjaman & Pengembalian */}
        <div className="flex gap-4">
          <label className="flex-1 block text-sm font-medium text-gray-700">
            Jam Peminjaman
            <input
              type="time"
              value={waktu_pinjam}
              onFocus={() => {
                if (!waktu_pinjam) {
                  const now = new Date();
                  const hh = String(now.getHours()).padStart(2, "0"); // 0-23
                  const mm = String(now.getMinutes()).padStart(2, "0");
                  setJamPinjam(`${hh}:${mm}`);
                }
              }}
              onChange={(e) => setJamPinjam(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              step="60"       // memastikan kompatibilitas 24 jam
              required
            />
          </label>

          <label className="flex-1 block text-sm font-medium text-gray-700">
            Jam Pengembalian
            <input
              type="time"
              value={waktu_kembali}
              onChange={(e) => setJamKembali(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              step="60"       // memastikan kompatibilitas 24 jam
              required
            />
          </label>
        </div>
      <label className="flex-1 block text-sm font-medium text-gray-700">
      Mata Pelajaran
        <select
        value={mapel}
        onChange={(e) => setMapel(e.target.value)}
        className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required
      >
        <option value="">Pilih Mapel</option>
        {mapelList.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nama_mapel}
          </option>
        ))}
      </select>

    </label>

      {/* Guru Penanggung Jawab */}
      <label className="block text-sm font-medium text-gray-700">
        Guru Penanggung Jawab
        <select
          value={id_guru}
          onChange={(e) => setGuruId(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Pilih Guru</option>
          {guruList.map((g) => (
            <option key={g.id_guru} value={g.id_guru}>
              {g.nama_guru}
            </option>
          ))}
        </select>
      </label>

      {/* Keterangan */}
      <label className="block text-sm font-medium text-gray-700">
        Keterangan / Tujuan Peminjaman
        <textarea
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Tuliskan tujuan peminjaman..."
          required
        />
      </label>

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm font-medium transition-colors"
      >
        Simpan
      </button>
    </form>
  );
}
