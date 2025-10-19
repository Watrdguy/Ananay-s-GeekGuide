export default function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>
  );
}
