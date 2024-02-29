import { useState } from "react";
import { createUser } from "../services/userStorage";
import { useNavigate } from "react-router-dom";

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
      image: '',
      description: '',
      email: 'null'
    })
    navigate('/search');
  };
  const valName = name.length > 2;

  return (
    <section data-testid="page-login">
      <form>
        <input
          data-testid="login-name-input"
          type="text"
          value={ name }
          onChange={ handleInputChange }
        />
        <button
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