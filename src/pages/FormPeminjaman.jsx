import { useState } from "react";

export default function FormPeminjaman({ nis, nama, onSelesai }) {
  const [barang, setBarang] = useState("");
  const [jamPinjam, setJamPinjam] = useState("");
  const [jamKembali, setJamKembali] = useState("");
  const [guruPJ, setGuruPJ] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const guruOptions = ["Pak Andi", "Bu Sari", "Pak Budi", "Bu Lina"];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi simpan data
    console.log("Data disimpan:", {
      nis,
      nama,
      barang,
      jamPinjam,
      jamKembali,
      guruPJ,
      keterangan,
    });

    alert(`Data berhasil disimpan:
Guru PJ: ${guruPJ}
Barang: ${barang}
Keterangan: ${keterangan}`);

    // Panggil callback dari parent supaya UI kembali ke tampilan awal
    if (onSelesai) onSelesai();
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
          value={barang}
          onChange={(e) => setBarang(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled hidden>
            Pilih Barang
          </option>
          <option value="Laptop">Laptop</option>
          <option value="Proyektor">Proyektor</option>
          <option value="Speaker">Speaker</option>
        </select>
      </label>

      {/* Jam Peminjaman */}
      <div className="flex gap-4">
      <label className="flex-1 block text-sm font-medium text-gray-700">
        Jam Peminjaman
        <input
          type="time"
          value={jamPinjam}
          onChange={(e) => setJamPinjam(e.target.value)}
          onFocus={() => {
            if (!jamPinjam) {
              const now = new Date();
              const jam = String(now.getHours()).padStart(2, "0");
              const menit = String(now.getMinutes()).padStart(2, "0");
              setJamPinjam(`${jam}:${menit}`);
            }
          }}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </label>

      {/* Jam Pengembalian */}
      <label className="flex-1 block text-sm font-medium text-gray-700">
        Jam Pengembalian
        <input
          type="time"
          value={jamKembali}
          onChange={(e) => setJamKembali(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </label>
      </div>

      {/* Guru Penanggung Jawab */}
      <label className="block text-sm font-medium text-gray-700">
        Guru Penanggung Jawab
        <select
          value={guruPJ}
          onChange={(e) => setGuruPJ(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled hidden>
            Pilih Guru
          </option>
          {guruOptions.map((guru) => (
            <option key={guru} value={guru}>
              {guru}
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
