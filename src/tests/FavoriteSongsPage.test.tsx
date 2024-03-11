import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import renderWithRouter from './helpers/renderWithRouter';
// import * as musicFetch from '../services/musicsFetch';
import * as favoriteSongs from '../services/favoritesStorage'
import App from '../App';
// import mockedMusics from './mocks/musicApiMock';
import favoritesMock from './mocks/favoritesMock';
import userEvent from '@testing-library/user-event';

describe('Testando a lista de músicas favoritas', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify({
      name: 'User Test',
      image: '',
      description: '',
      email: ''
    }));
    localStorage.setItem('favorite_songs', JSON.stringify(favoritesMock));
  });

  afterEach(() => localStorage.clear());

  it('Testando se a requisição para getFavoriteSongs é feita para recuperar as músicas favoritas',
    async () => {
      const spy = vi.spyOn(favoriteSongs, 'getFavoriteSongs');
      renderWithRouter(<App />, {route: '/favorites'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(spy).toBeCalled();
    });

  it('Testando se é exibida a lista de músicas favoritas',
    async () => {
      renderWithRouter(<App />, {route: '/favorites'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(screen.getByTestId('checkbox-music-1484688057')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-1484688244')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
    });

  it('Testando se a lista de músicas favoritas é atualizada ao remover uma música da lista',
    async () => {
      const user = userEvent.setup();
      renderWithRouter(<App />, {route: '/favorites'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      const checkboxes = await screen.queryAllByRole('checkbox', { checked: true });

      expect(screen.getByTestId('checkbox-music-1484688057')).toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-1484688244')).toBeInTheDocument();
      expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
      expect(checkboxes).toHaveLength(2);

      await user.click(screen.getByTestId('checkbox-music-1484688057'));

      expect(screen.queryByTestId('checkbox-music-1484688057')).not.toBeInTheDocument();
      expect(screen.getByTestId('checkbox-music-1484688244')).toBeInTheDocument();

      expect(screen.getAllByTestId('audio-component')).toHaveLength(1);
      expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(1);
    });
});