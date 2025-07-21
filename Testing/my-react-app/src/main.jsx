import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './task7reduxex/App'
import { Provider } from 'react-redux';
import store from'./task7reduxex/store';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
