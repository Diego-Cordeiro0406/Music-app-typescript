import '@testing-library/jest-dom'
import { waitFor, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest'

// import { defaultUser } from './mocks';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';


describe('1 - Crie as rotas necessárias para a aplicação', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({
      name: 'User Test',
      email: '',
      description: '',
      image: '',
    }));
    localStorage.setItem('favorite_songs', JSON.stringify([]));
    cleanup()
  });

  it('A rota "/" é uma rota existente e que renderiza um componente com o "data-testid" com valor "page-login"',
    async () => {
      localStorage.clear();
      renderWithRouter(<Login />);

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );
        
      expect(screen.getByTestId('page-login')).toBeInTheDocument();
  });
});