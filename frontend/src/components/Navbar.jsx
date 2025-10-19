import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Ananay's Computer Price Predictor</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/predict" className="hover:text-blue-600">Predict</Link>
        <Link to="/info" className="hover:text-blue-600">Info</Link>
      </div>
    </nav>
  );
}
