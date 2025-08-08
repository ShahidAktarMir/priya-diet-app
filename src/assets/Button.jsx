function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-orange-500 text-white m-10 p-2 rounded hover:bg-orange-700 animate-bounce disabled:opacity-50"
    >
      {children}
    </button>
  );
}
export default Button;
