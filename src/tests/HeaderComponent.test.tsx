import '@testing-library/jest-dom'
import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import * as userAPI from '../services/userStorage';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import * as musicsAPI from '../services/musicsAPI';

describe('Testando renderização do componente de cabeçalho', () => {
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

  it('Será validado se o componente Header é renderizado na página /search',
    async () => {
      renderWithRouter(<App />, {route: "/search"});

      expect(screen.getByTestId("header-component")).toBeInTheDocument(); 
    });

  it('Testando se o componente Header é renderizado na página /album/:id',
    async () => {
      renderWithRouter(<App />, {route: "/album/1"});

      expect(screen.getByTestId("header-component")).toBeInTheDocument();  
    });   
    
  it('Testandohq se o componente Header é renderizado na página /favorites',
    async () => {
      renderWithRouter(<App />, {route: "/favorites"});
  
      expect(screen.getByTestId("header-component")).toBeInTheDocument();
    });

  it('Testando se o componente Header é renderizado na página /profile',
    async () => {
      renderWithRouter(<App />, {route: "/profile"});

      expect(screen.getByTestId("header-component")).toBeInTheDocument();
    });

  it('Testando se o componente Header é renderizado na página /profile/edit',
    async () => {
      renderWithRouter(<App />, {route: "/profile/edit"});

      expect(screen.getByTestId("header-component")).toBeInTheDocument();
    });

  it('Testando se a função getUser é chamada ao renderizar o componente',
    async () => {
      const spy = vi.spyOn(userAPI, 'readUser');
      renderWithRouter(<App />, {route: "/search"});

      expect(spy).toHaveBeenCalled();
    });

  it('Testando se o nome da pessoa usuária está presente na tela após o retorno da API',
    async () => {
      renderWithRouter(<App />, {route: "/search"});

      const headerUserName = screen.getByTestId('header-user-name');
      expect(headerUserName).toBeInTheDocument();

      expect(headerUserName.textContent).toContain('User Test');
    });
});