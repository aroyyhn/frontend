export default function Toast({ message, type }) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-6 right-6 px-4 py-2 rounded-xl shadow-lg text-white font-medium
                  z-50 transition-all duration-500
                  ${type === "success" ? "bg-green-500" : "bg-red-500"}
                  animate-slide-fade`}
    >
      {message}
    </div>
  );
}
