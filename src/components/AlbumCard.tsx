import { Link } from "react-router-dom";

interface AlbumCardProps {
  albumId: number
  img: string
  albumName: string
  artistName: string
  albumGenre: string
}

function AlbumCard({albumId, img, albumName, artistName, albumGenre}: AlbumCardProps) {
  return (
    <Link
      to={`/album/${albumId}`}
      data-testid={`link-to-album-${albumId}`}
    >
      <img src={img} alt={artistName} />
      <h3>{albumName}</h3>
      <p>{artistName}</p>
      <p>{albumGenre}</p>
    </Link>
  );
}

export default AlbumCard;