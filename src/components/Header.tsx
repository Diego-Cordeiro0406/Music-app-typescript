import { readUser } from "../services/userStorage";
import { Link } from 'react-router-dom'
import { IoIosSearch, IoMdStarOutline } from "react-icons/io";
import { TbUserCircle } from "react-icons/tb";

import logo from '../assets/logo.png';

function Header() {
  return (
    <header
      className="
        flex
        flex-col
        laptop:w-1/5
        mobile:w-0
        justify-between
        items-center
        laptop:static
        mobile:absolute
        mobile:h-full
        bg-white
      "
      data-testid="header-component"
    >
      <img className="mt-4 w-2/4" src={ logo } alt="logo" />
      <div>
        <Link
          className="
          flex
          laptop:w-[7.563rem]
          laptop:justify-between
          mobile:justify-start
          items-center
          no-underline
          cursor-pointer
          text-[#5b6066]
        "
          data-testid="link-to-search"
          to={"/search"}
        >
          <IoIosSearch size="2rem" style={ { color: '#5b6066' } } />
          <p className="flex laptop:w-[4.688rem] font-['Epilogue']">Procurar</p>
        </Link>
        <Link
          className="
          flex
          laptop:w-[7.563rem]
          justify-between
          items-center
          no-underline
          cursor-pointer
          text-[#5b6066]
        " 
          data-testid="link-to-favorites"
          to={"/favorites"}
        >
          <IoMdStarOutline size="2rem" style={ { color: '#5b6066' } } />
          <p className="flex laptop:w-[4.688rem] font-['Epilogue']">Favoritos</p>
        </Link>
        <Link
          className="
            flex
            laptop:w-[7.563rem]
            laptop:justify-between
            mobile:justify-start
            items-center
            no-underline
            cursor-pointer
            text-[#5b6066]
          " 
            data-testid="link-to-profile"
            to={"/profile"}
          >
          <TbUserCircle size="2rem" style={ { color: '#5b6066' } } />
          <p className="flex laptop:w-[4.688rem] font-['Epilogue']">Perfil</p>
        </Link>
      </div>
      <div className="flex justify-between items-center text-[#5b6066]">
        <img
          className="
            w-10
            h-10
            rounded-full
            mr-4
          "
          src={readUser().image}
          alt="user-image"
        />
        <p className="mb-4 font-['Epilogue'] font-normal" data-testid="header-user-name">{readUser().name}</p>
      </div>
    </header>
  )
}

export default Header;