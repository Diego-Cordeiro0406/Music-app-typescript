import '@testing-library/jest-dom'
import { waitFor, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as userAPI from '../services/userStorage';

import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';


describe('1 - Testando Pagina de login', () => {
  it('Testando se o componente Login é renderizado corretamente',
    async () => {
      renderWithRouter(<Login />);

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );
        
      expect(screen.getByTestId('page-login')).toBeInTheDocument();
      expect(screen.getByTestId('login-name-input')).toBeInTheDocument();
      expect(screen.getByTestId('login-submit-button')).toBeInTheDocument()
  });

  it('Será testado se o botão só é habilitado se o input de nome tiver 3 ou mais caracteres',
    async () => {
      renderWithRouter(<Login />);
      const user = userEvent.setup()

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      const loginNameInput = screen.getByTestId('login-name-input') as HTMLInputElement;
      const loginSubmitButton = screen.getByTestId('login-submit-button');
    
      expect(loginNameInput).toBeInTheDocument();
      expect(loginNameInput.value).toBe('');
      
      expect(loginSubmitButton).toBeInTheDocument();
      expect(loginSubmitButton).toBeDisabled();
      
      await user.type(loginNameInput, 'Na');

      expect(loginNameInput.value).toBe('Na');
      expect(loginSubmitButton).toBeDisabled();

      await user.type(loginNameInput, 'm');
      expect(loginNameInput.value).toBe('Nam');
      expect(loginSubmitButton).toBeEnabled();

      await user.type(loginNameInput, 'e');
      expect(loginNameInput.value).toBe('Name');
      expect(loginSubmitButton).toBeEnabled();
    });

    it('Testando se ao clicar no botão habilitado, a função createUser da userAPI é chamada',
    async () => {
      const spy = vi.spyOn(userAPI, 'createUser');
      const user = userEvent.setup()

      renderWithRouter(<Login />);

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );

      await user.type(screen.getByTestId('login-name-input'), 'Name');
      await user.click(screen.getByTestId('login-submit-button'));

      const storedUserName = userAPI.readUser().name;

      expect(storedUserName).toBe('Name');
      expect(spy).toBeCalled();
    });

  it('Será testado se ao clicar no botão, acontece o redirecionamento para a rota /search',
    async () => {
      const user = userEvent.setup()
      renderWithRouter(<App />);

      await waitFor(
        () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
        { timeout: 3000 }
      );
  
      await user.type(screen.getByTestId('login-name-input'), 'Name');
      await user.click(screen.getByTestId('login-submit-button'));
      
      await waitFor(
        () => expect(screen.getByTestId("page-search")).toBeInTheDocument(), { timeout: 3000 }
      )
    });
    afterEach(() => {
      localStorage.clear();
    });
});