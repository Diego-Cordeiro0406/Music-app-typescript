import { readUser } from "../services/userStorage";

function Header() {
  return (
    <header data-testid="header-component">
      <h1>Header</h1>
      <div>
        <p data-testid="header-user-name">{readUser().name}</p>
      </div>
    </header>
  )
}

export default Header;