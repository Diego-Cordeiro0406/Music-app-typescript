import { useState } from "react";
import { createUser, readUser } from "../services/userStorage";
import { useNavigate } from "react-router-dom";

import defaultLogo from '../assets/default.png';
import logo from '../assets/logo.png';

function Login() {
  const [name, setName] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = event.target.value;
    setName(novoValor);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    const read = readUser()
    if (!read) {
      createUser({
        name,
        image: defaultLogo,
        description: 'Sem descrição',
        email: 'E-mail não informado'
      })
    }
    navigate('/search');
  };
  const valName = name.length > 2;

  return (
    <section
      className="
        flex
        justify-center
        items-center
        w-screen
        h-screen
        bg-cover
        bg-center
        bg-login-background
      "
      data-testid="page-login"
      >
      <form className="
        flex
        flex-col
        desktop:w-2/4
        desktop:h-3/5
        laptop:w-3/5
        laptop:h-1/2
        mobile:w-11/12
        mobile:h-4/6
        mobile:min-h-[25rem]
        justify-center
        items-center
        bg-white
        rounded-xl
      "
      >
        <img className="mobile:w-2/4 tablet:w-1/4 desktop:w-1/4 mb-4" src={logo} alt="logo" />
        <input
          id="login-input"
          className="
            border
            rounded-3xl
            laptop:w-3/5
            tablet:w-3/5
            h-[2.5rem]
            mobile:w-11/12
            border-[#003be5]
            text-[#003be5]
            text-center
            p-0
            focus:outline-none
            placeholder:text-[#003be5]
          "
          placeholder="Qual é o seu nome?"
          data-testid="login-name-input"
          type="text"
          value={ name }
          onChange={ handleInputChange }
        />
        <button
          className="
            bg-[#003be5]
            disabled:bg-red-600
            rounded-3xl
            laptop:w-3/5
            tablet:w-3/5
            h-[2.5rem]
            mobile:w-11/12
            border-none
            text-white
            uppercase
            mt-2
            text-sm
            epilo
          "
          
          type="button"
          data-testid="login-submit-button"
          disabled={ !valName }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </section>
  )
}

export default Login;