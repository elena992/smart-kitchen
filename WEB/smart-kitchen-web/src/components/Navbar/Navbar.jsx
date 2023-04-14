import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const handleMenuOpen = () => {
      setMenuOpen(!menuOpen);
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">Home</Link>
          <div className={`navbar-burger ${menuOpen ? 'is-active' : ''}`} onClick={handleMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link to="/login" className="navbar-item">Log in</Link>
            <Link to="/signup" className="navbar-item">Sign up</Link>
            <Link to="/profile" className="navbar-item">Profile</Link>
            <Link to="/recipes" className="navbar-item">Create a Recipe</Link>
            <Link to="/search-recipes" className="navbar-item">Search Recipes</Link>
          </div>
        </div>
      </nav>
    );
  };  

export default Navbar