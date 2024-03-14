import { useState } from "react";
import Header from "../components/Header";
import searchAlbumsAPI from "../services/searchAlbumFetch";
import { AlbumData } from "../types/types";
import AlbumCard from "../components/AlbumCard";

function Search() {
  const [search, setSearch] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<AlbumData[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);

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
    <section className="flex laptop:flex-row w-screen h-screen">
      <Header />
      <section className="flex flex-col w-4/5" data-testid="page-search">
        <form>
            <input
              value={ search }
              data-testid="search-artist-input"
              onChange={ handleInputChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ !valSearch }
              onClick={ handleClick }
            >
              Pesquisar
            </button>
          </form>
        <section>
          {
            !loading && !initial && <div>{`Resultado de álbuns de: ${input}`}</div>
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