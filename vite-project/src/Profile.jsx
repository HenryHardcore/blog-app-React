import profilna from "./fotografije/profil.jpg"


function Profile() {
  return(
  <div className="profile-container">
    <img src={profilna}/>
    <h3>Abu Džaba Dabila</h3>
  </div>
  )
}

export default Profile