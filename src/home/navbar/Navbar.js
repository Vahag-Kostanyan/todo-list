import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { auth, db } from '../../firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { CgProfile } from 'react-icons/cg'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

function Navbar({ signOut, auth, bin, changeBin }) {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return window.location.assign('/signin')

      const getUser = async () => {
        const userRef = doc(db, "users", user.uid)
        const dbUser = await getDoc(userRef)

        setUser(dbUser.data())
      }

      getUser()
    })
  }, [])



  return (
    <div className='home-navbar'>
      <div className="home-navbar-logo">
        <img src='./assets/imgs/todo-logo.png' alt="todo logo" />
      </div>
      <div className='home-navbar-right-side'>
      <div className="home-navbar-username" >
        <p>{user?.username}</p>
        <div className='home-navbar-menyu'></div>
        <CgProfile className='home-navbar-icon' onClick={() => setMenu(true)} />

        {menu &&
          (
            <ClickAwayListener onClickAway={() => setMenu(false)}>
              <div className='home-navbar-menyu-content'>
                <div>
                <button onClick={() => changeBin(!bin)}>Bin</button>
                </div>
                <button onClick={() => signOut(auth)}>Log out</button>
              </div>
            </ClickAwayListener>

          )
          }
      </div>
      <div className="home-navbar-logout">
        <button onClick={() => signOut(auth)}>log out</button>
      </div>
      </div>
    </div>
  )
}

export default Navbar