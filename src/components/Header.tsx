import { readUser } from "../services/userStorage";
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header data-testid="header-component">
      <h1>Header</h1>
      <div>
        <Link data-testid="link-to-search" to={"/search"}>
          <p>Procurar</p>
        </Link>
        <Link data-testid="link-to-favorites" to={"/favorites"}>
          <p>Favoritos</p>
        </Link>
        <Link data-testid="link-to-profile" to={"/profile"}>
          <p>Perfil</p>
        </Link>
      </div>
      <div>
        <p data-testid="header-user-name">{readUser().name}</p>
      </div>
    </header>
  )
}

export default Header;