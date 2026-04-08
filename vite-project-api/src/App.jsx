import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-6 mb-6 border-b pb-2">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <Link to="/favorites" className="text-blue-600 hover:text-blue-800">Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}