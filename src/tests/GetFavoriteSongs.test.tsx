import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import renderWithRouter from './helpers/renderWithRouter';
import * as musicFetch from '../services/musicsFetch';
import * as favoriteSongs from '../services/favoritesStorage'
import App from '../App';
import mockedMusics from './mocks/musicApiMock';
import favoritesMock from './mocks/favoritesMock';

describe('Testando a requisição para recuperar as músicas favoritas ao entrar na página do Álbum', () => {
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


  it('Testando se a requisição para `getFavoriteSongs` é feita para recuperar as músicas favoritas',
    async () => {
      vi.spyOn(musicFetch, 'default').mockImplementation(
        () => Promise.resolve(mockedMusics),
      );
      const spy = vi.spyOn(favoriteSongs, 'getFavoriteSongs');

      renderWithRouter(<App />, {route: '/album/12'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(spy).toBeCalled();
    });


  it('Testando se, ao entrar na página, o número de checkboxes marcados como `checked` é correspondente ao número de músicas que já foram favoritadas',
  async () => {
    vi.spyOn(musicFetch, 'default').mockImplementation(
      () => Promise.resolve(mockedMusics),
    );

    renderWithRouter(<App />, {route: '/album/12'});

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
    { timeout: 3000 },
    );

    expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(2);
    expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(2);
  });
});