import "./Landing.css";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

const Landing = () => {
  const { currentUser } = useContext(AuthContext);
  const Navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        {!currentUser ? (
          <div>
            <h1>Welcome to Smart Kitchen</h1>
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
            <h1>Welcome {currentUser.firstName} to Smart Kitchen</h1>
            <h3>What do you want to do today?</h3>
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
