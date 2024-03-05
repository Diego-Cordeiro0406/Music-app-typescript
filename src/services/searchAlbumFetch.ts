import { AlbumData } from "../types/types";

const searchAlbumsAPI = async (artist: string): Promise<AlbumData[] | null> => {
  const artistNameURL = encodeURI(artist).replace('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json();

  // const response = results.map(
  //   ({
  //     artistId,
  //     artistName,
  //     collectionId,
  //     collectionName,
  //     collectionPrice,
  //     artworkUrl100,
  //     releaseDate,
  //     trackCount,
  //   }) => ({
  //     artistId,
  //     artistName,
  //     collectionId,
  //     collectionName,
  //     collectionPrice,
  //     artworkUrl100,
  //     releaseDate,
  //     trackCount,
  //   }),
  // );
  if (results === null) return null
  return results;
};

export default searchAlbumsAPI;