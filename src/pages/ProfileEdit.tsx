import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { readUser, updateUser } from "../services/userStorage";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Context from "../context/Context";
import { GiHamburgerMenu } from "react-icons/gi";

function ProfileEdit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    image: ''
   });

  const navigate = useNavigate();

  const isMobile = useMediaQuery({query: '(max-width: 1023px)'});

  const context = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readUser();
        setFormData(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
       ...prevFormData,
       [name]: value,
    }));
   };
  
  const handleClick = async() => {
    updateUser(formData)
    navigate('/profile')
  };

  const valForm = (formData
    .name.length > 1 && formData
    .email.length > 1 && formData
    .description.length > 1 && formData
    .email.endsWith('.com'));

  if (!context) return null;
  const { toggleCategories } = context;

  return (
    <section
      className="
        flex
        laptop:flex-row
        mobile:flex-col
        w-dvw
        h-dvh
        bg-[#eff3f9]
      "
    >
      <Header />
      <section className="flex flex-col w-full h-screen max-h-screen" data-testid="page-profile-edit">
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
              laptop:left-54
              desktop:left-40
              others:left-80
              laptop:w-60
              laptop:h-60
              mobile:w-40
              mobile:h-40
              mobile:ml-14
            "
            data-testid="profile-image"
            src={formData.image}
            alt="batata logo"
          />
        </section>
        <main
          className="
            flex
            laptop:justify-end
            mobile:justify-center
            desktop:justify-center
            items-center
            mobile:pt-6
            laptop:pt-8
            laptop:pr-8
          "
        >
          <section
            className="
              flex
              flex-col
              laptop:items-start
              mobile:items-center
              laptop:justify-end
            "
            >
            <div
              className="
                flex
                flex-col
                mb-8
                mobile:ml-0
                desktop:ml-0
              "
              >
              <label className="font-['Epilogue']" htmlFor="input-name">Nome</label>
              <p className="mt-1">Fique á vontade para usar seu nome social</p>
              <input
                className="border-none w-72 h-10 outline-none focus:bg-[#eff3f9]"
                data-testid="edit-input-name"
                value={formData.name}
                placeholder="Exemplo: Zézinho"
                name="name"
                id="input-name"
                type="text"
                onChange={ handleInputChange }
              />
              <div className="width" />
            </div>
            <div
              className="
                flex
                flex-col
                mb-8
                mobile:ml-0
                desktop:ml-0"
              >
              <label className="font-['Epilogue']" htmlFor="input-email">E-mail</label>
              <p className="mt-1">Escolha um e-mail que consulte diariamente</p>
              <input
                className="border-none w-72 h-10 outline-none focus:bg-[#eff3f9]"
                data-testid="edit-input-email"
                value={formData.email}
                placeholder="usuario@email.com"
                name="email"
                id="input-email"
                type="email"
                onChange={ handleInputChange }
              />
              <div className="width" />
            </div>
            <div
              className="
                flex
                flex-col
                mb-8
                mobile:ml-0
                mobile:w-72
                laptop:w-[30.625rem]
                desktop:ml-0"
              >
              <label className="font-['Epilogue'] mb-4" htmlFor="input-description">Descrição</label>
              <textarea
                className="border-none w-full h-[6.625rem] outline-none"
                data-testid="edit-input-description"
                value={formData.description}
                placeholder="Admirador(a) de músicas"
                name="description"
                id="input-description"
                onChange={ handleInputChange }
              />
              <div className="width" />
            </div>
            <button
              className="
                uppercase
                bg-[#003be5]
                disabled:bg-red-600
                h-[2.5rem]
                rounded-3xl
                border-none
                text-white
                w-[9.5rem]
              "
              data-testid="edit-button-save"
              onClick={ handleClick }
              disabled={ !valForm }
            >
              Salvar
            </button>
            </section>
          </main>
        </section>
      </section>
  )
}

export default ProfileEdit;