import React from 'react'
import Signin from './signIn/Signin'
import Signup from './signUp/Signup'
import Home from './home/Home'
import Notfound from './notFound/Notfound'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path='/signin' element = {<Signin/>}/>
          <Route path='*' element = {<Notfound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App