
export default function Button({ children }) {
  return (
    <button className="border border-gray-700 rounded-full px-4 py-1 text-black mb-2">
      {children}
    </button>
  );
}