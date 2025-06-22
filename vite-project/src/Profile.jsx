import profilna from "./fotografije/profil.jpg"
import { doSignOut } from './firebase/auth';

function Profile() {
  return(
  <div className="profile-container">
    <img src={profilna}/>
    <h3>Abu Džaba Dabila</h3>
    <button onClick={doSignOut}>Log Out</button>
  </div>
  )
}

export default Profile