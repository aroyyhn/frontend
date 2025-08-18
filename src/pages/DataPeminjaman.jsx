// DataPeminjaman.jsx
import { useState, useEffect } from "react";
import { getPeminjaman, addPeminjaman } from "../services/api";

export default function DataPeminjaman({ onBack }) {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  // ambil data peminjaman pas pertama kali render
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const peminjaman = await getPeminjaman(); // pake fungsi dari api.js
      setData(peminjaman);
    } catch (err) {
      console.error("Error fetch data:", err);
    }
  };

  // const handleAdd = async () => {
  //   try {
  //     await addPeminjaman({ nama_barang: newItem });
  //     setNewItem("");
  //     fetchData(); // refresh data setelah tambah
  //   } catch (err) {    
  //     console.error("Error add data:", err);
  //   }
  // };

  return (
  
<div className="max-w-6xl mx-auto">
  <div className="bg-white shadow-lg rounded-xl overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <h1 className="text-xl font-bold text-gray-800">Data Peminjaman</h1>
      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
      >
        Kembali
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">NIS</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Kelas</th>
            <th className="px-4 py-3">Device</th>
            <th className="px-4 py-3">Mata Pelajaran</th>
            <th className="px-4 py-3">Guru Penanggung Jawab</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((d, index) => (
            <tr key={d.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-center">{index + 1}</td>
              <td className="px-4 py-3">{d.nis}</td>
              <td className="px-4 py-3 font-medium text-gray-800">{d.nama}</td>
              <td className="px-4 py-3">{d.kelas}</td>
              <td className="px-4 py-3">{d.device}</td>
              <td className="px-4 py-3">{d.mapel}</td>
              <td className="px-4 py-3">{d.guru}</td>
              <td className="px-4 py-3 text-center">
                {d.status === "Dipinjam" ? (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                    Dipinjam
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    Dikembalikan
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
}
