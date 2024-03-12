import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { User } from "../types/types";
import { readUser } from "../services/userStorage";

function Profile() {
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readUser();
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate()
  return (
    <>
      <Header />
      <main data-testid="page-profile">
        <section>
          <div>
            <img data-testid="profile-image" src={userData?.image} alt="batata logo" />
            <button onClick={() => navigate('/profile/edit')}>Editar perfil</button>
          </div>
          <div>
            <h3>{userData?.name}</h3>
            <p>{userData?.email}</p>
          </div>
          <div>
            <span>{userData?.description}</span>
          </div>
        </section>
      </main>
    </>
  )
}

export default Profile;