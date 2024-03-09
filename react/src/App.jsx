import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './page/Home'
import Contactus from './page/Contactus'
import Cars from './page/Cars'
import Login from './page/Login'
import Signup from './page/Signup'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Contactus' element={<Contactus/>}/>
          <Route path='/cars' element={<Cars/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
