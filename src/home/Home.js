import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from './navbar/Navbar'
import Form from './content/todo-form/Form'
import Todos from './content/todos/Todos'
import RecycleBin from './content/RecycleBin/RecycleBin'
import { auth, db } from '../firebase/Firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

function Home() {
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')
  const [bin, setBin] = useState(false);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (!user) window.location.assign('/signin')

      setUser(user)
    })

  }, [])

  const changeSearch = (val) => {
    setSearch(val);
  }


  return (
    <div className='home-wrapper'>
      {!bin ?
        (
          <div>
            <div className="home-wrapper-firest-side">
              <Navbar signOut={signOut} auth={auth} bin = {bin} changeBin = { bin => setBin(bin)} />
            </div>
            <div className="home-wrapper-last-side">
              <div className="home-heder">
                <Form userId={user?.uid} search={search} changeSearch={changeSearch} />
              </div>
              <div className="home-content">
                <Todos search={search} />
              </div>
              <div className="home-footer">
                <RecycleBin bin={bin} changeBin={bin => setBin(bin)}/>
              </div>
            </div>
          </div>
        )
        :
        (
          <div className="home-footer">
            <RecycleBin bin={bin} changeBin={bin => setBin(bin)} />
          </div>
        )}

    </div>
  )
}

export default Home