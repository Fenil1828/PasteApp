import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'
// We'll use dynamic import instead
// import {Toaster} from 'react-hot-toast';

// Initial render without Toaster
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// Dynamically import Toaster
import('react-hot-toast').then(({ Toaster }) => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </StrictMode>
  );
});
