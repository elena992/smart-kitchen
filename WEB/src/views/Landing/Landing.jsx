import "./Landing.css";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { logout } from "../../stores/AccessTokenStore.js";
import logo from "../../assets/images/logo.png";

const Landing = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="landing-page">
      {currentUser && (
        <div className="header">
          <button className="btn btn-secondary logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      <div className="landing-page-content">
        {!currentUser ? (
          <div>
            <div>
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="wrapper">
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Log in
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Welcome {currentUser.firstName} </h2>
            <h4>What do you want to do today?</h4>
            <div className="wrapper">
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = "/create-recipe";
                }}
              >
                Create
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = "/recipes/search";
                }}
              >
                Search
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  window.location.href = "/my-recipes";
                }}
              >
                My Recipes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
