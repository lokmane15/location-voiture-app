import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { DataProvider } from './Context/DataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    </AuthContextProvider>
  </DataProvider>
)
