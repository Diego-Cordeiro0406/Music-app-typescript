import { Link } from "react-router-dom";

interface AlbumCardProps {
  albumId: number
  img: string
  albumName: string
  artistName: string
  albumGenre: string
}

function AlbumCard({albumId, img, albumName, artistName }: AlbumCardProps) {
  return (
    <Link
      className="
        flex
        flex-col
        w-[18.75rem]
        laptop:h-96
        laptop:mb-8
        mobile:mb-4
        justify-between
        items-start
        no-underline
        text-[#5b6066]
        rounded-[0.625rem]
        cursor-pointer
      "
      to={`/album/${albumId}`}
      data-testid={`link-to-album-${albumId}`}
    >
      <img className="w-full h-[18.75rem] rounded-[0.625rem]" src={img} alt={artistName} />
      <h3
        className="
          flex
          justify-center
          items-center
          my-0
          mobile:h-10
          max-h-10
          overflow-hidden
          mobile:text-sm
          laptop:text-base
        "
      >
        {albumName}
      </h3>
      <div className="flex flex-col justify-start items-start w-full">
        <p className="my-0 font-['Epilogue'] text-[#878f96] mobile:text-sm">{artistName}</p>
      </div>
      
    </Link>
  );
}

export default AlbumCard;