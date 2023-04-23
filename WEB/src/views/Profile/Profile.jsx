import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile container">
      <h1>
        {currentUser.firstName} {currentUser.lastName}
      </h1>
      <h2>We are working on it!</h2>
    </div>
  );
};

export default Profile;
