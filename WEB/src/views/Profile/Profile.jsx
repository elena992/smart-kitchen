import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="profile" style={{ backgroundColor: 'purple' }}>
      <div className="container">
        <h1>Profile</h1>
        <p>{currentUser.firstName} {currentUser.lastName}</p>
      </div>
    </div>
  )
}

export default Profile;