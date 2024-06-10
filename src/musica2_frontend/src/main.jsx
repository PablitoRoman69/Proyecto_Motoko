import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Create from './FormSong';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';



 const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/Crear-cancion",
    element: <Create></Create>
  },
  
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
);
