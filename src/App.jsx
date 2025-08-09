import DietForm from "./components/DietForm";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
      <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold text-4xl text-center mb-8">
        Priya Jana
      </h1>
      <DietForm />
      </div>
    </div>
  );
}
export default App;
