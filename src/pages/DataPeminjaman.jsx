// pages/DataPeminjaman.jsx
import { useEffect, useState } from "react";

export default function DataPeminjaman({ onBack }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/peminjaman")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl w-full bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Data Peminjaman</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-50">
            <tr>
              {["NIS", "Nama", "Kelas", "Barang", "Guru PJ", "Status"].map((head, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b last:border-0 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{row.nis}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.nama}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.kelas}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.barang}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{row.guru}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Dipinjam"
                          ? "bg-yellow-100 text-yellow-800"
                          : row.status === "Dikembalikan"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-gray-500 text-sm"
                >
                  Tidak ada data peminjaman.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={onBack}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm transition-colors"
      >
        Kembali
      </button>
    </div>
  );
}
