import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import { IoIosSearch, IoMdStarOutline } from "react-icons/io";
import { TbUserCircle } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";

import { readUser } from "../services/userStorage";
import logo from '../assets/logo.png';
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { useMediaQuery } from "react-responsive";

function Header() {
  const [links, setColorLink] = useState({
    search: false,
    favorite: false,
    profile: false,
  });
  const isMobile = useMediaQuery({query: '(max-width: 1023px)'});

  const context = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
      const read = readUser()
      if (!read) {
        navigate('/')
      }
      const path = location.pathname;
      setColorLink(prevState => ({
        ...prevState,
        search: path === '/search',
        favorite: path === '/favorites',
        profile: path === '/profile',
      }))
  }, [location, navigate]);

  if (!context) return null;
  const { sidebarOpen, toggleCategories } = context;

  return (
    <header
      className={`
        flex
        flex-col
        laptop:w-1/5
        desktop:w-1/6
        toggle
        ${sidebarOpen ? 'open' : ''}
        justify-between
        items-center
        laptop:static
        mobile:absolute
        mobile:h-full
        bg-white
        mobile:z-50
      `}
      data-testid="header-component"
    >
      <section className="flex flex-col w-full justify-center items-center">
        {
          isMobile && (
        <div
          className="flex w-full justify-end mt-2"
        >
          <MdArrowBack
            onClick={() => toggleCategories() }
            size={"2rem"}
            style={ { color: '#5b6066' } }
            className="ml-1"
          />
        </div>)
       }
      <img className="laptop:mt-4 w-2/4" src={ logo } alt="logo" />
      </section>
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
          <IoIosSearch
            size="2rem"
            style={ { color: links.search ? '#000000' : '#5b6066' }}
          />
          <p
            className={`
              flex
              laptop:w-[4.688rem]
              font-['Epilogue']
              ${links.search ? 'text-black' : ''}
            `
            }
          >
            Procurar
          </p>
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
          <IoMdStarOutline
            size="2rem"
            style={ { color: links.favorite ? '#000000' : '#5b6066' }}
          />
          <p
            className={`
            flex
            laptop:w-[4.688rem]
            font-['Epilogue']
            ${links.favorite ? 'text-black' : ''}
          `
          }
        >
          Favoritos
        </p>
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
          <TbUserCircle
            size="2rem"
            
            style={ { color: links.profile ? '#000000' : '#5b6066' }}
          />
          <p
          className={`
            flex
            laptop:w-[4.688rem]
            font-['Epilogue']
            ${links.profile ? 'text-black' : ''}
          `
          }
        >
          Perfil
        </p>
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
          src={readUser()?.image}
          alt="user-image"
        />
        <p className="mb-4 font-['Epilogue'] font-normal" data-testid="header-user-name">{readUser()?.name}</p>
      </div>
    </header>
  )
}

export default Header;