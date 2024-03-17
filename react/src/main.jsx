import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { DataProvider } from './Context/DataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </AuthContextProvider>
  </DataProvider>
)
