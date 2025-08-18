// App.jsx
import { useState } from "react";
import FormPeminjaman from "./pages/FormPeminjaman";
import DataPeminjaman from "./pages/DataPeminjaman";

export default function App() {
  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [mode, setMode] = useState("home"); 
  // mode: "home" | "form" | "admin"

  // Simulasi tap RFID siswa
  const handleRFIDSiswa = () => {
    setNis("2324003");
    setNama("Ahmad Royhan");
    setMode("form");
  };

  // Simulasi tap RFID guru
  const handleRFIDGuru = () => {
    setMode("admin");
  };

  // Reset balik ke home
  const handleBack = () => {
    setNis("");
    setNama("");
    setMode("home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      {mode === "home" && (
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md w-full animate-fadeIn border border-gray-100">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img
              src="/logosmk.png"
              alt="Logo SMK TI BAZMA"
              className="w-40 h-40 object-contain"
            />
          </div>

          <div className="space-y-3">
            {/* Tombol RFID Siswa */}
            <button
              onClick={handleRFIDSiswa}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg 
                        shadow-md transition duration-300 ease-in-out 
                        transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Simulasi Tap RFID Siswa
            </button>

            {/* Tombol RFID Guru */}
            <button
              onClick={handleRFIDGuru}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg 
                        shadow-md transition duration-300 ease-in-out 
                        transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Simulasi Tap RFID Guru/Admin
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-black/70">
            © {new Date().getFullYear()} SMK TI BAZMA
          </div>
        </div>
      )}

      {mode === "form" && (
          <FormPeminjaman nis={nis} nama={nama} onSelesai={handleBack} />
      )}
      
      {mode === "admin" && (
        <DataPeminjaman onBack={handleBack} />
      )}


    </div>
  );
}
