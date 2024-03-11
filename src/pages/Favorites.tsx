import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Music } from "../types/types";
import { getFavoriteSongs } from "../services/favoritesStorage";
import MusicCard from "../components/MusicCard";

function Favorites() {
  const [loading, setLoading] = useState<boolean>(false);
  const [favoritesData, setFavoritesData] = useState<Music[]>();

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

  return (
    <>
      <Header />
      <section data-testid="page-favorites">
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
      </section>
    </>
  )
}

export default Favorites;