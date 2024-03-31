import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux"
import reportWebVitals from './reportWebVitals';
import { Root } from './components/root';
import { MyWallet } from './pages/myWallet';
import { History } from './pages/history';
import { RegistrationPage } from './pages/registration';
import { LoginPage } from './pages/login';
import { store } from './redux/store/store';
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: '/wallet',
        element: <MyWallet />
      },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/registration',
        element: <RegistrationPage />
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
