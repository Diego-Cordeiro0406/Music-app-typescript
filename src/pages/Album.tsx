import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import getMusics from "../services/musicsFetch";
import { AlbumData, MusicTrack } from "../types/types";
import MusicCard from "../components/MusicCard";
import { readFavoriteSongs } from "../services/favoritesStorage";

function Album() {
  const { id } = useParams();
  const [musicData, setMusicData] = useState<MusicTrack[]>();
  const [artistData, setArtistData] = useState<AlbumData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getMusics(id!);
        setMusicData(data);
        setArtistData(data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    if (!readFavoriteSongs()) {
      localStorage.setItem('favorite_songs', JSON.stringify([]));
    }
    fetchData();
  }, [id])
  return (
    <>
    <Header />
    <section data-testid="page-album">
      <section>
        <img src={artistData?.artworkUrl100} alt={artistData?.artistName} />
        <h3 data-testid="album-name">{ artistData?.collectionName }</h3>
        <p data-testid="artist-name">{ artistData?.artistName }</p>
      </section>
      <main>
        {
          loading ? <div data-testid="loading-element">Loading...</div> : (
            musicData?.slice(1).map((music) => (
            <MusicCard
              key={ music.trackId }
              musicId={music.trackId}
              musicName={music.trackName}
              previewUrl={music.previewUrl}
            />
          )))
        }
      </main>
    </section>
    </>
  )
}

export default Album;