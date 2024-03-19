import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { GiHamburgerMenu } from "react-icons/gi";

import Header from "../components/Header";
import searchAlbumsAPI from "../services/searchAlbumFetch";
import { AlbumData } from "../types/types";
import AlbumCard from "../components/AlbumCard";
import Context from "../context/Context";

function Search() {
  const [search, setSearch] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<AlbumData[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);

  const isMobile = useMediaQuery({query: '(max-width: 1023px)'});

  const context = useContext(Context);

  if (!context) return null;
  const { toggleCategories } = context;

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = event.target.value;
    setSearch(novoValor);
    setInput(novoValor);
  };

  const handleClick = async() => {
    try {
      setLoading(true);
      setInitial(false);
      const albuns = await searchAlbumsAPI(search);
      setData(albuns);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearch('');
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
              focus:outline-none
            "
              placeholder="digite a sua pesquisa"
              value={ search }
              data-testid="search-artist-input"
              onChange={ handleInputChange }
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
            !loading && !initial && <div
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
            loading && <div data-testid="loading-element">loading...</div>
          }
          {
            data && data.length === 0 && !initial ? <span>Nenhum álbum foi encontrado</span> : (
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