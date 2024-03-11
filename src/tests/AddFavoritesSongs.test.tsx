import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import renderWithRouter from './helpers/renderWithRouter';
import * as musicFetch from '../services/musicsFetch';
import * as favoriteSongs from '../services/favoritesStorage'
import App from '../App';
import mockedMusics from './mocks/musicApiMock';
import userEvent from '@testing-library/user-event';

describe('Testando o mecanismo para adicionar músicas na lista de músicas favoritas', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify({
      name: 'User Test',
      image: '',
      description: '',
      email: ''
    }));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
  });

  afterEach(() => localStorage.clear());

  it(
    'Testando se existe um checkbox para cada música da lista',
    async () => {
      vi.spyOn(musicFetch, 'default').mockImplementation(
        () => Promise.resolve(mockedMusics),
      );

      renderWithRouter(<App />, {route: '/album/123'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(screen.getByTestId('checkbox-music-1484688057')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-1484688223')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-1484688244')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-1484688264')).toBeInTheDocument();
    },
  );

  it(
    'Testando se a função addSong é chamada quando algum checkbox é clicado',
    async () => {
      vi.spyOn(musicFetch, 'default').mockImplementation(
        () => Promise.resolve(mockedMusics),
      );

      const spy = vi.spyOn(favoriteSongs, 'addSong');

      const user = userEvent.setup()

      renderWithRouter(<App />, {route: '/album/123'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      await user.click(screen.getByTestId('checkbox-music-1484688057'));

      expect(spy) .toHaveBeenCalled();
    },
  );

  it(
    'Testando se o número de checkboxes marcados como checked aumenta quando um checkbox é clicado',
    async () => {
      vi.spyOn(musicFetch, 'default').mockImplementation(
        () => Promise.resolve(mockedMusics),
      );

      const user = userEvent.setup()

      renderWithRouter(<App />, {route: '/album/123'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(0);
      expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(4);

      await user.click(screen.getByTestId('checkbox-music-1484688057'));

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(1);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(3);

      await user.click(screen.getByTestId('checkbox-music-1484688223'));

      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(2);
      expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(2);
    },
  );
});