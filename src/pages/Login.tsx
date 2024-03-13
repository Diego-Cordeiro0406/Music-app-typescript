import { useState } from "react";
import { createUser } from "../services/userStorage";
import { useNavigate } from "react-router-dom";

import defaultLogo from '../assets/default.png';

function Login() {
  const [name, setName] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = event.target.value;
    setName(novoValor);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    createUser({
      name,
      image: defaultLogo,
      description: 'Sem descrição',
      email: 'E-mail não informado'
    })
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
        laptop:w-3/5
        h-1/2
        justify-center
        items-center
        bg-white
        rounded-xl
      "
      >
        <input
          className="
            border
            rounded-3xl
            laptop:w-3/5
            border-[#003be5]
            laptop:h-[2.5rem]
            text-center
          "
          placeholder="Qual é o seu nome?"
          data-testid="login-name-input"
          type="text"
          value={ name }
          onChange={ handleInputChange }
        />
        <button
          className="
            rounded-3xl
            laptop:w-3/5
            bg-[#003be5]
            border-none
            laptop:h-[2.5rem]
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