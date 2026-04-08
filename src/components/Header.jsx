import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🎬 Movie Explorer</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Search</Link>
          <Link to="/favorites" className="nav-link">Favorites </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;