function Input({ name, value, onChange, placeholder }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 p-2 rounded w-full mb-2"
    />
  );
}
export default Input;
