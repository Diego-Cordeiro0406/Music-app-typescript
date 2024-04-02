import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useMediaQuery } from "react-responsive";

import Header from "../components/Header";
import getMusics from "../services/musicsFetch";
import { AlbumData, MusicTrack } from "../types/types";
import MusicCard from "../components/MusicCard";
import { readFavoriteSongs } from "../services/favoritesStorage";
import { GiHamburgerMenu } from "react-icons/gi";
import Context from "../context/Context";


function Album() {
  const { id } = useParams();
  const [musicData, setMusicData] = useState<MusicTrack[]>();
  const [artistData, setArtistData] = useState<AlbumData>();
  const [loading, setLoading] = useState<boolean>(false);

  const isMobile = useMediaQuery({query: '(max-width: 1023px)'});

  const context = useContext(Context);

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

  if (!context) return null;
  const { toggleCategories } = context;

  return (
    <section className="flex laptop:flex-row mobile:flex-col w-dvw h-dvh">
    <Header />
    <section
      className="
      flex
      flex-col
      laptop:w-4/5
      desktop:w-5/6
      mobile:w-full
      mobile:h-full
      bg-[#eff3f9]
      "
      data-testid="page-album"
    >
      <section
        className="
          flex
          laptop:relative
          laptop:items-end
          mobile:items-center
          h-1/4
          bg-cover
          bg-center
          bg-login-background
          laptop:z-50
          desktop:z-50
        "
      >
        {
          isMobile && (
            <div
              className="
                flex
                h-full
                justify-start"
              >
                <GiHamburgerMenu
                  onClick={() => toggleCategories() }
                  size={"2rem"}
                  style={ { color: '#00d5e2' } }
                  className="mx-1 mt-3"
                />
            </div>)
        }
        <div className="flex laptop:justify-end laptop:w-2/5">
          {
            loading ? (
              <ReactLoading type="spinningBubbles" color="#00d5e2" data-testid="loading-element" />
            ) : (
              <img
            className="
              laptop:absolute
              rounded-xl
              laptop:top-10
              laptop:w-60
              laptop:h-60
              mobile:w-28
              mobile:h-28
            "
            src={artistData?.artworkUrl100.replace('100x100bb.jpg', '240x240bb.jpg')}
            alt={artistData?.artistName}
          />
            )
          }
        </div>
          <div
            className="
              flex
              flex-col
              laptop:w-3/5
              justify-start
              items-start
              text-white
              ml-2
              mb-2
            "
            >
            <h3 className="m-0" data-testid="album-name">{ artistData?.collectionName }</h3>
            <p className="m-0" data-testid="artist-name">{ artistData?.artistName }</p>
          </div>
      </section>
      <main
        className="
          flex
          flex-col
          laptop:items-end
          others:pr-20
          h-3/4
          overflow-y-scroll
          bg-[#eff3f9]
          pt-4
          mobile:z-10
        "
      >
        {
          loading ? (
            <section className="flex justify-center items-center w-full h-full">
              <ReactLoading type="spinningBubbles" color="#00d5e2" data-testid="loading-element" />
            </section>) : (
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