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
      className="
        flex
        flex-col
        laptop:w-52
        laptop:h-80
        mb-8
        justify-between
        items-center
        no-underline
        text-[#5b6066]
        bg-white
        rounded-[0.625rem]
        cursor-pointer
        shadow
      "
      to={`/album/${albumId}`}
      data-testid={`link-to-album-${albumId}`}
    >
      <img className="w-full rounded-[0.625rem]" src={img} alt={artistName} />
      {/* <div className="flex justify-center items-center w-full"> */}
        <h3 className="my-1.5 max-h-6 overflow-hidden">{albumName}</h3>
      <div className="flex flex-col justify-start items-center w-full">
        <p className="my-1.5">{artistName}</p>
        <p className="my-1.5">{albumGenre}</p>
      </div>
      
    </Link>
  );
}

export default AlbumCard;