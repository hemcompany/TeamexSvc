import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// [24.03.25] HEM ADD
import { UserProvider } from './provider/UserProvider';
import { MenuProvider } from './provider/MenuProvider';

// [24.04.30] HEM ADD REPORT LICENSE
import {} from "./utils/arjs-license";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MenuProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </MenuProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
