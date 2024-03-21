import { useContext, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { GiHamburgerMenu } from "react-icons/gi";
import ReactLoading from 'react-loading';

import Header from "../components/Header";
import searchAlbumsAPI from "../services/searchAlbumFetch";
import { AlbumData } from "../types/types";
import AlbumCard from "../components/AlbumCard";
import Context from "../context/Context";
import notFoundImg from '../assets/icon _circle.png'

function Search() {
  const [search, setSearch] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<AlbumData[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);

  const isMobile = useMediaQuery({query: '(max-width: 1023px)'});
  const inputRef = useRef<HTMLInputElement>(null);

  const context = useContext(Context);

  if (!context) return null;
  const { toggleCategories } = context;

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = event.target.value;
    setSearch(novoValor);
  };

  const handleClick = async() => {
    try {
      setLoading(true);
      setInitial(false);
      const albuns = await searchAlbumsAPI(search);
      setInput(search);
      setData(albuns);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearch('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Previne o comportamento padrão do Enter (por exemplo, enviar um formulário)
      handleClick(); // Aciona a função de envio
      inputRef.current?.blur();
    }
 };

  const valSearch = search.length > 1;

  return (
    <section className="flex laptop:flex-row mobile:flex-col w-screen h-screen">
      <Header />
      <section
        className="
          flex
          flex-col
          laptop:w-4/5
          desktop:w-5/6
          mobile:w-full
          mobile:h-full
          "
        data-testid="page-search"
      >
        <form
          className="
            flex
            w-full
            mobile:flex-col
            mobile:justify-evenly
            laptop:flex-row
            laptop:justify-center
            items-center
            h-1/4
            mobile:min-h-[11.875rem]
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
                  w-full
                  justify-start"
                >
                  <GiHamburgerMenu
                    onClick={() => toggleCategories() }
                    size={"2rem"}
                    style={ { color: '#00d5e2' } }
                    className="ml-1"
                  />
              </div>)
            }
            <input
              className="
              border-none
              rounded-3xl
              laptop:w-2/5
              tablet:w-3/5
              h-[2.5rem]
              mobile:w-3/4
              text-[#003be5]
              text-start
              placeholder:text-white
              bg-[#80acf1]
              placeholder:uppercase
              pl-4
              outline-none
            "
              type="text"
              placeholder="digite a sua pesquisa"
              value={ search }
              data-testid="search-artist-input"
              ref={ inputRef }
              onChange={ handleInputChange }
              onKeyDown={ handleKeyDown }
            />
            <button
              className="
                uppercase
                bg-[#00d5e2]
                h-[2.5rem]
                rounded-3xl
                border-none
                text-white w-28
                ml-2
              "
              data-testid="search-artist-button"
              type="button"
              disabled={ !valSearch }
              onClick={ handleClick }
            >
              Pesquisar
            </button>
          </form>
        <section
          className="
            flex
            flex-row
            w-full
            h-3/4
            bg-[#eff3f9]
            flex-wrap
            items-center
            justify-evenly
            overflow-y-scroll
          "
        >
          {
            !loading && !initial && data!.length > 0 && <div
              className="
                flex
                justify-center
                w-full
                laptop:h-28
                mobile:h-16
                items-center
                bg-[#eff3f9]
                text-2xl
                text-[#003BE5]
                italic
              "
            >
              {`Resultado de álbuns de: ${input}`}
            </div>
          }
          {
            loading && (
            <section className="flex justify-center items-center w-full h-full">
              <ReactLoading type="spinningBubbles" color="#00d5e2" data-testid="loading-element" />
            </section>)
          }
          {
            data && data.length === 0 && !initial ? (
            <div className="flex flex-col justify-center text-[#5b6066] items-center font-['Epilogue']">
              <img src={notFoundImg} alt="not-found-image" />
              <h3>Nenhum álbum foi encontrado</h3>
            </div>) : (
              data?.map((album) => (
                <AlbumCard
                  key={album.collectionId}
                  albumId={album.collectionId}
                  img={album.artworkUrl100}
                  albumName={album.collectionName}
                  artistName={album.artistName}
                  albumGenre={album.primaryGenreName}
                />         
              ))
            )
          }
        </section>
      </section>
    </section>
    
  )
}

export default Search;