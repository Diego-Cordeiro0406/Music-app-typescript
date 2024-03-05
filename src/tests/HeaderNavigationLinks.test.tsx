import '@testing-library/jest-dom'
import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando os links de navegação no cabeçalho', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({
      name: 'User Test',
      image: '',
      description: '',
      email: ''
    }));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
    vi.restoreAllMocks();
  });

  afterEach(() => localStorage.clear());

  // Search page
  it('Testando se os links de navegação são exibidos na página de pesquisa',
    async () => {
      renderWithRouter(<App />, {route: "/search"});

      expect(screen.getByTestId('link-to-search')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-favorites')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-profile')).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de pesquisa e a página de músicas favoritas ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/search"});

      await user.click(screen.getByTestId('link-to-favorites'));

      expect(screen.getByTestId("page-favorites")).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de pesquisa e a página de exibição do perfil ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/search"});

      await user.click(screen.getByTestId('link-to-profile'));

      expect(screen.getByTestId("page-profile")).toBeInTheDocument();
    });
    
  // // Album page
  it('Testando se os links de navegação são exibidos na página do álbum',
    async () => {
      renderWithRouter(<App />, {route: "/album/1"});

      expect(screen.getByTestId('link-to-search')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-favorites')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-profile')).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página do álbum e a página de pesquisa ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/album/1"});

      await user.click(screen.getByTestId('link-to-search'));

      expect(screen.getByTestId("page-search")).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página do álbum e a página de músicas favoritas ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/album/1"});

      await user.click(screen.getByTestId('link-to-favorites'));

     expect(screen.getByTestId("page-favorites")).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página do álbum e a página de exibição do perfil ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/album/1"});

      await user.click(screen.getByTestId('link-to-profile'));

      expect(screen.getByTestId("page-profile")).toBeInTheDocument();
    });

  // // Favorites page
  it('Testando se os links de navegação são exibidos na página de músicas favoritas',
    async () => {
      renderWithRouter(<App />, {route: "/favorites"});

      expect(screen.getByTestId('link-to-search')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-favorites')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-profile')).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de músicas favoritas e a página de pesquisa ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/favorites"});

      await user.click(screen.getByTestId('link-to-search'));

      expect(screen.getByTestId("page-search")).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de músicas favoritas e a página de exibição perfil ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/favorites"});

      await user.click(screen.getByTestId('link-to-profile'));

      expect(screen.getByTestId("page-profile")).toBeInTheDocument();
    });

  // // Profile page
  it('Testando se os links de navegação são exibidos na página de exibição do perfil',
    async () => {
      renderWithRouter(<App />, {route: "/profile"});

      expect(screen.getByTestId('link-to-search')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-favorites')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-profile')).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de exibição do perfil e a página de pesquisa ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/profile"});

      await user.click(screen.getByTestId('link-to-search'));

      expect(screen.getByTestId("page-search")).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de exibição do perfil e a página de músicas favoritas ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/profile"});

      await user.click(screen.getByTestId('link-to-favorites'));

      expect(screen.getByTestId("page-favorites")).toBeInTheDocument();
    });

  // // Edit profile page  
  it('Testando se os links de navegação são exibidos na página de edição do perfil',
    async () => {
      renderWithRouter(<App />, {route: "/profile/edit"});

      expect(screen.getByTestId('link-to-search')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-favorites')).toBeInTheDocument();

      expect(screen.getByTestId('link-to-profile')).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de edição do perfil e a página de pesquisa ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/profile/edit"});

      await user.click(screen.getByTestId('link-to-search'));

      expect(screen.getByTestId("page-search")).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de edição do perfil e a página de músicas favoritas ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/profile/edit"});

      await user.click(screen.getByTestId('link-to-favorites'));

      expect(screen.getByTestId("page-favorites")).toBeInTheDocument();
    });

  it('Testando se a navegação entre a página de edição do perfil e a página de exibição do perfil ocorre corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/profile/edit"});

      await user.click(screen.getByTestId('link-to-profile'));

      expect(screen.getByTestId("page-profile")).toBeInTheDocument();
    });
});