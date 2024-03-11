import { useEffect, useState } from "react";
import { Music } from "../types/types";
import { addSong, getFavoriteSongs, removeSong } from "../services/favoritesStorage";

interface MusicCardProps {
  musicId: number
  musicName: string
  previewUrl: string
  onFavoritesUpdate?: (favorites: Music[]) => void;
}

function MusicCard({musicId, musicName, previewUrl, onFavoritesUpdate}: MusicCardProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const musicElement: Music = { musicId, musicName, previewUrl };

  const items = getFavoriteSongs();
  useEffect(() => {
    // Ao montar o componente verifica se a musica já está na lista de favoritas, se sim seta o estado is checked como true.
    if (items) {
      setIsChecked(items.some((item: Music) => item.musicId === musicElement.musicId));
    }
  }, [items, musicElement.musicId]);

  const handleCheckbox = () => {
    // Obtem a lista atual de músicas favoritas do localStorage
    const currentFavoriteSongs = getFavoriteSongs();

   // Verifica se a música já está na lista de favoritos
    const isFavorite = currentFavoriteSongs.some((song: Music) => song.musicId === musicElement.musicId);

    if (isFavorite) {
      // Se a música já está na lista de favoritos, remova-a
      removeSong(currentFavoriteSongs, musicElement);
    } else {
      // Se a música não está na lista de favoritos, adicione-a
      addSong(musicElement);
    }
    // Atualiza o estado isChecked com base na nova lista de músicas favoritas
    setIsChecked(!isChecked);
    if (onFavoritesUpdate) {
      onFavoritesUpdate(getFavoriteSongs());
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