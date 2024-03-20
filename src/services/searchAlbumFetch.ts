import { AlbumData } from "../types/types";

function replaceArtworkUrl(url: string): string {
  return url.replace('100x100bb.jpg', '300x300bb.jpg');
 }

const searchAlbumsAPI = async (artist: string): Promise<AlbumData[] | null> => {
  const artistNameURL = encodeURI(artist).replace('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json();

  results.forEach((item: AlbumData) => {
    if (item.artworkUrl100) {
       item.artworkUrl100 = replaceArtworkUrl(item.artworkUrl100);
    }
   });
  
  if (results === null) return null
  return results;
};

export default searchAlbumsAPI;