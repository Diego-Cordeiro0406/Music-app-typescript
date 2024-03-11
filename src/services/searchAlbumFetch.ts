import { AlbumData } from "../types/types";

const searchAlbumsAPI = async (artist: string): Promise<AlbumData[] | null> => {
  const artistNameURL = encodeURI(artist).replace('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json();

  if (results === null) return null
  return results;
};

export default searchAlbumsAPI;