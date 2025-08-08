function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
export default Button;
