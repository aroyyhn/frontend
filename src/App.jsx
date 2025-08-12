// App.jsx
import { useState } from "react";
import FormPeminjaman from "./pages/FormPeminjaman";

export default function App() {
  const [nis, setNis] = useState("");
  const [nama, setNama] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleRFIDTap = () => {
    // Simulasi data RFID
    setNis("123456");
    setNama("Budi Santoso");
    setIsFormVisible(true);
  };
  

  const handleFormSelesai = () => {
    // Reset data & kembali ke tampilan awal
    setNis("");
    setNama("");
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      {!isFormVisible ? (
        // Tampilan awal sebelum tap
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md w-full animate-fadeIn border border-gray-100">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img
              src="/logosmk.png"
              alt="Logo SMK TI BAZMA"
              className="w-40 h-40 object-contain"
            />
          </div>
          {/* Tombol */}
          <button
            onClick={handleRFIDTap}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-out hover:scale-[1.02]"
          >
            Simulasi Tap Kartu RFID
          </button>
            <div className="mt-6 text-center text-xs text-black/70">
            © {new Date().getFullYear()} SMK TI BAZMA
          </div>
        </div>
      ) : (
      
        // Tampilan form setelah tap
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-fadeIn">
            <FormPeminjaman nis={nis} nama={nama} onSelesai={() => setIsFormVisible(false)} />
        </div>
      )}
    </div>
  );
}


