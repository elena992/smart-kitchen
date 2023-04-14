import { useContext } from 'react'
import { Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AuthContext, { AuthProvider } from './contexts/AuthContext'
import Login from './views/Login/Login'
import Profile from './views/Profile/Profile'
import RecipeCreator from './views/Recipes/RecipeCreator'
import SearchRecipes from './views/SearchRecipes/SearchRecipes'


function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="container my-3">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
             <Route path="recipes" element={
            <ProtectedRoute>
              <RecipeCreator />
            </ProtectedRoute>
          } />
           <Route path="search-recipes" element={<SearchRecipes />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

