import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import renderWithRouter from './helpers/renderWithRouter';
import * as userAPI from '../services/userStorage';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando o formulário de edição de perfil', () => {
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

  it('Testando se é feita a requisição para getUser para recuperar as informações da pessoa logada',
    async () => {
      const spy = vi.spyOn(userAPI, 'readUser');

      renderWithRouter(<App />, {route: "/profile/edit"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(spy).toBeCalled();
    });

  it('Testando se o formulário é renderizado já preenchido com as informações da pessoa logada',
    async () => {
      renderWithRouter(<App />, {route: "/profile/edit"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(screen.getByTestId('edit-input-name')).toHaveValue('User Test');
      expect(screen.getByTestId('edit-input-email')).toHaveValue('user@email.com');
      expect(screen.getByTestId('edit-input-description')).toHaveValue('Lorem ipsum');
      expect(screen.getByTestId('edit-button-save')).toBeInTheDocument();
    });

  it('Testando se é possível alterar os valores dos campos',
    async () => {
      const user = userEvent.setup();
      renderWithRouter(<App />, {route: "/profile/edit"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      const nameInput = screen.getByTestId('edit-input-name');
      await user.clear(nameInput);
      await user.type(nameInput, 'New user test');

      const emailInput = screen.getByTestId('edit-input-email');
      await user.clear(emailInput);
      await user.type(emailInput, 'newemail@test.com');

      const descriptionInput = screen.getByTestId('edit-input-description');
      await user.clear(descriptionInput);
      await user.type(descriptionInput, 'Dolor sit amet');

      expect(nameInput).toHaveValue('New user test');
      expect(emailInput).toHaveValue('newemail@test.com');
      expect(descriptionInput).toHaveValue('Dolor sit amet');
    });

  it('Testando se o botão salvar é habilitado somente se todos os campos estiverem válidos',
    async () => {
      localStorage.setItem('user', JSON.stringify({
        name: "User Test", 
        email: "",
        description: "",
        image: ""
      }));
      const user = userEvent.setup();
      renderWithRouter(<App />, {route: "/profile/edit"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      const saveButton = screen.getByTestId('edit-button-save');

      const nameInput = screen.getByTestId('edit-input-name');
      await user.clear(nameInput);

      const emailInput = screen.getByTestId('edit-input-email');
      await user.clear(emailInput);
      await user.type(emailInput, 'not-an-email');

      const descriptionInput = screen.getByTestId('edit-input-description');
      await user.clear(descriptionInput);

      expect(saveButton).toBeDisabled();

      await user.type(nameInput, 'User test');
      await user.clear(emailInput);
      await user.type(emailInput, 'valid@email.com');
      await user.type(descriptionInput, 'User description');

      expect(saveButton).toBeEnabled();
    });

  it('Testando se as informações são enviadas usando a função updateUser',
    async () => {
      const spy = vi.spyOn(userAPI, 'updateUser');
      const user = userEvent.setup();
      renderWithRouter(<App />, {route: "/profile/edit"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      const nameInput = screen.getByTestId('edit-input-name');
      await user.clear(nameInput);
      await user.type(nameInput, 'New user test');

      const emailInput = screen.getByTestId('edit-input-email');
      await user.clear(emailInput);
      await user.type(emailInput, 'newemail@test.com');

      const descriptionInput = screen.getByTestId('edit-input-description');
      await user.clear(descriptionInput);
      await user.type(descriptionInput, 'Dolor sit amet');

      await user.click(screen.getByTestId('edit-button-save'));

      expect(spy).toBeCalledWith({
        name: 'New user test',
        email: 'newemail@test.com',
        description: 'Dolor sit amet',
        image: 'url-to-image',
      });
    });

  it('Testando se após salvar as informações a pessoa é redirecionada para a página de exibição de perfil',
    async () => {
      const user = userEvent.setup();
      renderWithRouter(<App />, {route: "/profile/edit"});

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      await user.click(screen.getByTestId('edit-button-save'));

      await waitFor(
        () => expect(screen.queryByTestId('loading-element')).not.toBeInTheDocument(),
      { timeout: 3000 },
      );

      expect(screen.getByText('Editar perfil')).toBeInTheDocument();
      expect(screen.getByTestId("page-profile")).toBeInTheDocument();
    });
});