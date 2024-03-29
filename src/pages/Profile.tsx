import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { User } from "../types/types";
import { readUser } from "../services/userStorage";
import { useMediaQuery } from "react-responsive";
import Context from "../context/Context";
import { GiHamburgerMenu } from "react-icons/gi";

function Profile() {
  const [userData, setUserData] = useState<User>();

  const isMobile = useMediaQuery({query: '(max-width: 1023px)'});

  const context = useContext(Context);

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

  if (!context) return null;
  const { toggleCategories } = context;

  return (
    <section
      className="
        flex
        laptop:flex-row
        mobile:flex-col
        w-screen
        h-screen
        bg-[#eff3f9]
      "
    >
      <Header />
      <section className="flex flex-col w-full h-screen max-h-screen" data-testid="page-profile">
        <section
          className="
            flex
            mobile:justify-start
            mobile:items-center
            w-full
            h-1/4
            bg-cover
            bg-center
            bg-login-background
          "
        >
          {
            isMobile && (
              <div
                className="
                  flex
                  h-full
                  justify-start
                "
                >
                  <GiHamburgerMenu
                    onClick={() => toggleCategories() }
                    size={"2rem"}
                    style={ { color: '#00d5e2' } }
                    className="mx-1 mt-3"
                  />
              </div>)
          }
          <img
            className="
              laptop:absolute
              rounded-full
              laptop:top-16
              laptop:left-56
              desktop:left-80
              laptop:w-60
              laptop:h-60
              mobile:w-40
              mobile:h-40
              mobile:ml-14
            "
            data-testid="profile-image"
            src={userData?.image}
            alt="batata logo"
          />
        </section>
        <main
          className="
            flex
            laptop:justify-end
            desktop:justify-center
            items-start
            mobile:mt-6
            laptop:mt-8
            desktop:ml-20
          "
          >
          <section className="laptop:w-[30.625rem] max-w-[30.625rem] desktop:ml-40">
            <div className="flex flex-col mb-8 mobile:ml-4 laptop:ml-0">
              <label className="font-['Epilogue'] mb-1" htmlFor="user-name">Nome</label>
              <p className="mt-0 mb-8 text-[#5b6066]" id="user-name">{userData?.name}</p>
              <label className="font-['Epilogue'] mb-1" htmlFor="user-email">E-mail</label>
              <p id="user-email" className="m-0 text-[#5b6066]">{userData?.email}</p>
            </div>
            <div className="flex flex-col mb-8 mobile:ml-4 laptop:ml-0">
              <label className="font-['Epilogue'] mb-1" htmlFor="user-description">Descrição</label>
              <span className="max-w-[30.625rem] text-[#5b6066]" id="user-description">{userData?.description}</span>
            </div>
            <div className="flex w-full mobile:justify-center laptop:justify-start mobile:items-center">
              <button
                className="
                  uppercase
                  bg-[#003be5]
                  h-[2.5rem]
                  rounded-3xl
                  border-none
                  text-white
                  w-[9.5rem]
                "
              onClick={() => navigate('/profile/edit')}
            >
              Editar perfil
            </button>
            </div>
            
          </section>
        </main>
      </section>
    </section>
  )
}

export default Profile;