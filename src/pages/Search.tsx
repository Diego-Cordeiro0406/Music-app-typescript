import { useState } from "react";
import Header from "../components/Header";
import searchAlbumsAPI from "../services/searchAlbumFetch";
import { AlbumData } from "../types/types";
import { Link } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<AlbumData[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = event.target.value;
    setSearch(novoValor);
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
    <>
      <Header />
      <section data-testid="page-search">
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
            !loading ? <div>resultado</div> : (<span>loading...</span>)
          }
          {
            data && data?.length > 0 && !initial ? (
              data.map((album) => (
                <Link
                  to={`/album/${album.collectionId}`}
                  data-testid={`link-to-album-${album.collectionId}`}
                  key={album.collectionId}
                >
                  <img src={album.artworkUrl100} alt={album.artistName} />
                  <h3>{album.collectionName}</h3>
                  <p>{album.artistName}</p>
                  <p>{album.primaryGenreName}</p>
                </Link>
              ))
            ) : <span>Nenhum album foi encontrado</span>
          }
        </section>
      </section>
    </>
    
  )
}

export default Search;