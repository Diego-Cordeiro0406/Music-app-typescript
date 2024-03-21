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
  }, [id]);

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
      data-testid="page-album"
    >
      <section
        className="
          flex
          relative
          items-end
          h-1/4
          bg-cover
          bg-center
          bg-login-background
        "
      >
        <img
            className="absolute ml-4 rounded-xl top-10"
            src={artistData?.artworkUrl100.replace('100x100bb.jpg', '300x300bb.jpg')}
            alt={artistData?.artistName}
          />
        <section className="flex w-full justify-center items-center">
          <div className="flex flex-col w-full justify-center items-center text-white">
            <h3 className="m-0" data-testid="album-name">{ artistData?.collectionName }</h3>
            <p className="m-0" data-testid="artist-name">{ artistData?.artistName }</p>
          </div>
        </section>
      </section>
      <main className="flex flex-col items-end h-3/4 overflow-y-scroll">
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
    </section>
  )
}

export default Album;