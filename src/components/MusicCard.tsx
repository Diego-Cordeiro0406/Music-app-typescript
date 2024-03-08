import { useEffect, useState } from "react";
import { Music } from "../types/types";
import { addSong, getFavoriteSongs, removeSong } from "../services/favoritesStorage";

interface MusicCardProps {
  musicId: number
  musicName: string
  previewUrl: string
}

function MusicCard({musicId, musicName, previewUrl}: MusicCardProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const musicElement: Music = { musicId, musicName, previewUrl };

  const items = getFavoriteSongs();
  useEffect(() => {
    if (items) {
      setIsChecked(items.some((item: Music) => item.musicId === musicElement.musicId));
    }
  }, [items, musicElement.musicId]);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      removeSong(items, musicElement)
    } else {
      addSong(musicElement)
    }
  };

  return (
    <section key={ musicId }>
      <h3>{ musicName }</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento{" "} <code>audio</code>.
      </audio>
      <label htmlFor={ musicId.toString() }>Favoritar</label>
      <input
        data-testid={`checkbox-music-${musicId}`}
        id={ musicId.toString() }
        type="checkbox"
        checked={ isChecked }
        onChange={ handleCheckbox }
      />
    </section>
  );
}

export default MusicCard;