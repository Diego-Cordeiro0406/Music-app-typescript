import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
 window.history.pushState({}, 'Test page', route);

 return {
   ...render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>),
   // re-export everything
   rerender: (el: React.ReactElement, options?: object) =>
     render(el, { container: document.body.firstChild as HTMLElement, ...options }),
 };
}

export default renderWithRouter;