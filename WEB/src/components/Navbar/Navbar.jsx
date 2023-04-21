import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { logout } from "../../stores/AccessTokenStore";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <div
          className={`navbar-burger ${menuOpen ? "is-active" : ""}`}
          onClick={handleMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
        <div className="navbar-end">
          <Link to="/login" className="navbar-item">
            Log in
          </Link>
          <Link to="/signup" className="navbar-item">
            Sign up
          </Link>
          <Link to="/profile" className="navbar-item">
            Profile
          </Link>
          <Link to="/create-recipe" className="navbar-item">
            Create a Recipe
          </Link>
          <Link to="/recipes/search" className="navbar-item">
            Search Recipes
          </Link>
          <Link to="/my-recipes" className="navbar-item">
            My Recipes
          </Link>
          <Link to="/detail-recipe/:id" className="navbar-item">
            Detail Recipe
          </Link>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
