import '@testing-library/jest-dom'
import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o formulário para pesquisar artistas', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({
      name: 'User Test',
      image: '',
      description: '',
      email: ''
    }));
    vi.restoreAllMocks();
  });

  afterEach(() => localStorage.clear());
  
  it('Testando se ao navegar para a rota /search, o input e o botão estão presentes na tela',
    async () => {
      renderWithRouter(<App />, {route: "/search"});

      expect(screen.getByTestId('search-artist-input')).toBeInTheDocument();
      expect(screen.getByTestId('search-artist-button')).toBeInTheDocument();
    });

  it('Testando se o botão está habilitado somente se o input de nome tiver 2 ou mais caracteres',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/search"});

      const searchArtistInput = screen
        .getByTestId('search-artist-input') as HTMLInputElement;
      expect(searchArtistInput).toBeInTheDocument();
      expect(searchArtistInput.value).toBe('');

      const searchArtistButton = screen
        .getByTestId('search-artist-button') as HTMLInputElement;
      expect(searchArtistButton).toBeInTheDocument();
      expect(searchArtistButton).toBeDisabled();

      await user.type(searchArtistInput, 'U');
      expect(searchArtistInput.value).toBe('U');
      expect(searchArtistButton).toBeDisabled();

      await user.type(searchArtistInput, '2');
      expect(searchArtistInput.value).toBe('U2');
      expect(searchArtistButton).toBeEnabled();
    });
});