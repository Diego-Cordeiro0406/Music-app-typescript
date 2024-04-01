import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Provider from '../../context/Provider';

function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
 window.history.pushState({}, 'Test page', route);

 return {
   ...render(<Provider><MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter></Provider>),
   // re-export everything
   rerender: (el: React.ReactElement, options?: object) =>
     render(el, { container: document.body.firstChild as HTMLElement, ...options }),
 };
}

export default renderWithRouter;