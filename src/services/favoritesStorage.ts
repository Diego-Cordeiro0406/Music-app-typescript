import { Music } from "../types/types";

const FAVORITE_SONGS_KEY = 'favorite_songs';

export const readFavoriteSongs = () => {
  const favoriteData = localStorage.getItem(FAVORITE_SONGS_KEY)
  if (favoriteData !== null) {
    return JSON.parse(favoriteData);
  }
  return null;
};

export const saveFavoriteSongs = (favoriteSongs: Music[]) => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

export const getFavoriteSongs = () => {
  const favoriteSongs = readFavoriteSongs();
  return favoriteSongs
};

export const addSong = (song: Music) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
};

export const removeSong = (songs: Music[], song: Music) =>  {
  saveFavoriteSongs(songs.filter((s: Music) => s.musicId !== song.musicId));
};