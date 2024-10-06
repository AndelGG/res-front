import { createRoot } from 'react-dom/client';
import './style/index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
