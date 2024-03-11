import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import * as musicFetch from '../services/musicsFetch';
import * as favoriteSongs from '../services/favoritesStorage'
import App from '../App';
import mockedMusics from './mocks/musicApiMock';
import favoritesMock from './mocks/favoritesMock';


describe('Testando o mecanismo para remover músicas na lista de músicas favoritas', () => {
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


  it('Testando se a função removeSong é chamada quando algum checkbox que já esteja marcado é clicado',
    async () => {
      vi.spyOn(musicFetch, 'default').mockImplementation(
        () => Promise.resolve(mockedMusics),
      );

      const spy = vi.spyOn(favoriteSongs, 'removeSong');

      const user = userEvent.setup();

      renderWithRouter(<App />, {route: '/album/12'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );
 
      await user.click(screen.getByTestId('checkbox-music-1484688057'));

      expect(spy).toHaveBeenCalled();
    });

  it('Testando se o número de checkboxes marcados como checked diminui quando um checkbox marcado é clicado',
    async () => {
      vi.spyOn(musicFetch, 'default').mockImplementation(
        () => Promise.resolve(mockedMusics),
      );

      const user = userEvent.setup();

      renderWithRouter(<App />, {route: '/album/12'});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      await waitFor(
        () => {
          expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(2);
          expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(2);
        }
      );

      await user.click(screen.getByTestId('checkbox-music-1484688057'));
      
      await waitFor(
        () => {
          expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(1);
          expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(3);
        }
      );

      await user.click(screen.getByTestId('checkbox-music-1484688223'));

      await waitFor(
        () => {
          expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(2);
          expect(screen.queryAllByRole('checkbox', { checked: false })).toHaveLength(2);
        }
      );
    });
});