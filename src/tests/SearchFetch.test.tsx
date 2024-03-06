import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import * as AlbumFetch from '../services/searchAlbumFetch';
import mockedAlbums from './mocks/responseAPIMock';

describe('6 - Faça a requisição para pesquisar artistas', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify({
      name: 'User Test',
      image: '',
      description: '',
      email: ''
    }));
  });
  it('Testando se ao clicar em pesquisar, a requisição é feita usando a searchAlbumsAPI', async () => {
    const spy = vi
      .spyOn(AlbumFetch, 'default')
      .mockImplementation(() => Promise.resolve([]));
    const user = userEvent.setup()
    renderWithRouter(<App />, {route: '/search'});

    await user.type(screen.getByTestId('search-artist-input'), 'Artist Name');
    await user.click(screen.getByTestId('search-artist-button'));

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument()
    );

    expect(spy).toBeCalledWith('Artist Name');
  });

  it('Testando se ao clicar no botão, o texto Resultado de álbuns de: <artista> aparece na tela', async () => {
    vi
      .spyOn(AlbumFetch, 'default')
      .mockImplementation(() => Promise.resolve(mockedAlbums));
    const user = userEvent.setup()
    renderWithRouter(<App />, {route: '/search'});

    const searchArtistInput = screen.getByTestId('search-artist-input');

    await user.type(searchArtistInput, 'bon jovi');
    await user.click(screen.getByTestId('search-artist-button'));

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument()
    );

    const searchMessage = await screen.findByText(/Resultado de álbuns de: bon jovi/i);

    expect(searchMessage).toBeInTheDocument();
    expect((screen.getByTestId('search-artist-input') as HTMLInputElement).value).toBe('');
  });

  it('Testando se ao receber o retorno da API, os álbuns são listados na tela', async () => {
    vi
    .spyOn(AlbumFetch, 'default')
    .mockImplementation(() => Promise.resolve(mockedAlbums));
    const user = userEvent.setup()
    renderWithRouter(<App />, {route: '/search'});

    const searchArtistInput = screen.getByTestId('search-artist-input');

    await user.type(searchArtistInput, 'bon jovi');
    await user.click(screen.getByTestId('search-artist-button'));

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument()
    );
    await waitFor(() => {
      expect(screen.getByText('Greatest Hits')).toBeInTheDocument();
      expect(screen.getByText('Greatest Hits: The Ultimate Collection (Deluxe Edition)')).toBeInTheDocument();
      expect(screen.queryByText('Nenhum álbum foi encontrado')).not.toBeInTheDocument();
    });
  });

  it('Testando se caso a API não retorne nenhum álbum, a mensagem Nenhum álbum foi encontrado é exibida', async () => {
    vi
    .spyOn(AlbumFetch, 'default')
    .mockImplementation(() => Promise.resolve([]));
    const user = userEvent.setup()
    renderWithRouter(<App />, {route: '/search'});

    const searchArtistInput = screen.getByTestId('search-artist-input');

    await user.type(searchArtistInput, 'aesdsgseg');
    await user.click(screen.getByTestId('search-artist-button'));

    await waitFor(
     () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument()
    );
  
    const noAlbumFoundMessage = await screen.findByText(
      /Nenhum álbum foi encontrado/i
    );
    expect(noAlbumFoundMessage).toBeInTheDocument();
  });

  it('Testando se existe um link para cada álbum listado que redirecione para a rota /album/:id', async () => {
    vi
    .spyOn(AlbumFetch, 'default')
    .mockImplementation(() => Promise.resolve(mockedAlbums));
    const user = userEvent.setup()
    renderWithRouter(<App />, {route: '/search'});

    const searchArtistInput = screen.getByTestId('search-artist-input');

    await user.type(searchArtistInput, 'bon jovi');
    await user.click(screen.getByTestId('search-artist-button'));

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument()
      );
  
    const link01 = await screen.findByTestId('link-to-album-1484688048');
    const link02 = await screen.findByTestId('link-to-album-1440677662');

    expect(link01).toBeInTheDocument();
    expect(link02).toBeInTheDocument();

    await user.click(link01);

    expect(screen.getByTestId('page-album')).toBeInTheDocument();
  });
  afterEach(() => localStorage.clear());
});