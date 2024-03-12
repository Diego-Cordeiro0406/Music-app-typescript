import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import renderWithRouter from './helpers/renderWithRouter';
import * as userAPI from '../services/userStorage';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando a exibição de perfil', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('user', JSON.stringify({
      name: 'User Test',
      image: 'url-to-image',
      description: 'Lorem ipsum',
      email: 'user@email.com'
    }));
  });

  afterEach(() => localStorage.clear());

  it('Testando se a API getUser é usada para recuperar as informações da pessoa logada',
    async () => {
      const spy = vi.spyOn(userAPI, 'readUser');

      renderWithRouter(<App />, {route: "/profile"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(spy).toBeCalled();
    });

  it('Testando se as informações da pessoa logada são exibidas na tela',
    async () => {
      renderWithRouter(<App />, {route: "/profile"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(screen.getAllByText('User Test')).toHaveLength(2);
      expect(screen.getByText('user@email.com')).toBeInTheDocument();
      expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
      expect(screen.getByTestId('profile-image')).toHaveAttribute('src', 'url-to-image');
    });

  it('Testando se foi criado um link para a rota de edição de perfil com o texto Editar perfil',
    async () => {
      renderWithRouter(<App />, {route: "/profile"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(screen.getByText("Editar perfil")).toBeInTheDocument();
    });

  it('Testando se ao clicar no link Editar perfil, a navegação acontece corretamente',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />, {route: "/profile"});

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
    { timeout: 3000 },
    );

    await user.click(screen.getByText("Editar perfil"));

    await waitFor(
      () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
    { timeout: 3000 },
    );

      expect(screen.getByTestId('page-profile-edit')).toBeInTheDocument();
    });
});