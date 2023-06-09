import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import RecipeCreator from "./views/RecipeCreator/RecipeCreator";
import SearchRecipes from "./views/SearchRecipes/SearchRecipes";
import Signup from "./views/Signup/Signup";
import MyRecipes from "./views/MyRecipes/MyRecipes";
import DetailRecipe from "./views/DetailRecipe/DetailRecipe";
import Landing from "./views/Landing/Landing";

function App() {
  const location = useLocation();

  // Check if the current route path is "login"
  const isLanding = location.pathname === "/";
  return (
    <div className="App">
      {!isLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-recipe"
          element={
            <ProtectedRoute>
              <RecipeCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="recipes/search"
          element={
            <ProtectedRoute>
              <SearchRecipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-recipes"
          element={
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail-recipe/:id"
          element={
            <ProtectedRoute>
              <DetailRecipe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
