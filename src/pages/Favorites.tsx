import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Music } from "../types/types";
import { getFavoriteSongs } from "../services/favoritesStorage";
import MusicCard from "../components/MusicCard";
import { useMediaQuery } from "react-responsive";
import Context from "../context/Context";
import { GiHamburgerMenu } from "react-icons/gi";

function Favorites() {
  const [loading, setLoading] = useState<boolean>(false);
  const [favoritesData, setFavoritesData] = useState<Music[]>();

  const isMobile = useMediaQuery({query: '(max-width: 1023px)'});

  const context = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getFavoriteSongs();
        setFavoritesData(data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const updateFavorites = (newFavorites: Music[]) => {
    setFavoritesData(newFavorites);
 };

 if (!context) return null;
 const { toggleCategories } = context;

  return (
    <section
      className="
        flex
        laptop:flex-row
        mobile:flex-col
        w-screen
        h-screen
        bg-[#eff3f9]
      "
    >
      <Header />
      <section className="w-full h-screen max-h-screen" data-testid="page-favorites">
        <section
          className="
            flex
            mobile:flex-col
            mobile:justify-start
            laptop:justify-center
            desktop:justify-center
            items-center
            w-full
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
                    justify-start
                  "
                >
                  <GiHamburgerMenu
                    onClick={() => toggleCategories() }
                    size={"2rem"}
                    style={ { color: '#00d5e2' } }
                    className="mx-1 mt-3"
                  />
                </div>)
            }
          <h2 className="mobile:mt-12 font-['Epilogue'] text-white">Músicas Favoritas</h2>
        </section>
        <main
          className="
            flex
            flex-col
            justify-start
            items-center
            h-3/4
            bg-[#eff3f9]
            overflow-y-scroll
          "
        >
          {
            loading ? <span>loading...</span> : (
              favoritesData?.map((music) => (
                <MusicCard
                  key={music.musicId}
                  musicId={music.musicId}
                  musicName={music.musicName}
                  previewUrl={music.previewUrl}
                  onFavoritesUpdate={updateFavorites}
                />
              ))
            )
          }
        </main>
      </section>
    </section>
  )
}

export default Favorites;