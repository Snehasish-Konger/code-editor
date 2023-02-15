import React from "react";
import { useAuth0} from "@auth0/auth0-react";

const Profile = () => {
    const {user, loginWithRedirect, isAuthenticated} = useAuth0();

    return (
      <div class="container">
        <div className="p_flex top">
            {isAuthenticated ? (
                <div>
                    <h1>Profile</h1>
                    <img src={user.picture} alt={user.name} />
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    </div>
            ) : (
                <div>
                    <h1>Profile</h1>
                    <p>You are not logged in.</p>
                    <button onClick={() => loginWithRedirect()}>Log In</button>
                    </div>
            )}
        </div>
        </div>
    );
}
export default Profile;