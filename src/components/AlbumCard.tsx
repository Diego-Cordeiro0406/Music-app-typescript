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
        mobile:w-40
        laptop:h-80
        laptop:mb-8
        mobile:mb-4
        justify-between
        items-start
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
      <img className="w-full laptop:h-2/3 mobile:h-1/4 rounded-[0.625rem]" src={img} alt={artistName} />
      <h3 className="my-1 max-h-6 overflow-hidden">{albumName}</h3>
      <div className="flex flex-col justify-start items-start w-full">
        <p className="my-1.5 font-['Epilogue']">{artistName}</p>
        <p className="my-1.5">{albumGenre}</p>
      </div>
      
    </Link>
  );
}

export default AlbumCard;