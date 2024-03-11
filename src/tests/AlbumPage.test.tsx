import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import renderWithRouter from './helpers/renderWithRouter';
import * as musicFetch from '../services/musicsFetch';
import App from '../App';
import mockedMusics from './mocks/musicApiMock';

describe('Testando a lista de músicas do álbum selecionado', () => {
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

  it('Testando se o serviço de musicsAPI está sendo chamado', async () => {
    const spy = vi.spyOn(musicFetch, 'default').mockImplementation(
      () => Promise.resolve(mockedMusics),
    );

    renderWithRouter(<App />, {route: '/album/12'});

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
    );

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('12');
  });

  it('Testando se o nome da banda ou artista e o nome do álbum são exibidos', async () => {
    vi.spyOn(musicFetch, 'default').mockImplementation(
      () => Promise.resolve(mockedMusics),
    );

    renderWithRouter(<App />, {route: '/album/12'});

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
    );

    const artistNameElement = screen.getByTestId('artist-name');
    expect(artistNameElement).toBeInTheDocument();
    expect(artistNameElement).toHaveTextContent('Bon Jovi');

    const albumNameElement = screen.getByTestId('album-name');
    expect(albumNameElement).toBeInTheDocument();
    expect(albumNameElement).toHaveTextContent('Greatest Hits');
  });

  it('Testando se todas músicas retornadas pela API são listadas', async () => {
    vi.spyOn(musicFetch, 'default').mockImplementation(
      () => Promise.resolve(mockedMusics),
    );

    renderWithRouter(<App />, {route: '/album/12'});

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
    );

    expect(screen.getByText("Livin' On a Prayer")).toBeInTheDocument();
    expect(screen.getByText('You Give Love a Bad Name')).toBeInTheDocument();
    expect(screen.getByText("It's My Life")).toBeInTheDocument();
    expect(screen.getByText('Have a Nice Day')).toBeInTheDocument();
    expect(screen.getAllByTestId('audio-component')).toHaveLength(4);
  });
});