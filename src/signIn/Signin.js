import React,{useState, useEffect} from 'react'
import './Signin.css'
import {auth} from '../firebase/Firebase'
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'

function Signin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [eye, setEye] = useState(false)


  useEffect(() => {
    onAuthStateChanged(auth, user =>{
      if(user){
        window.location.assign('/')
      }
    })
  },[])


  const signin = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);

      setEmail('')
      setPassword('')
    })
    .catch((err) => { setError(true) })

  }
  const changeEye = () => {
    setEye(!eye)
  }
  return (
    <div>
      <div className="signin-wrapper">
        <div className="signin-form">
          <div className="signin-form-heder">
            <img src='./assets/todo-icon.png' alt="todo icon" />
            <p> Log in </p>
          </div>
          <div className="signin-form-content">
            <form>
              <input type="email" placeholder='Email address' className='Email' value={email} onChange = {(e) => setEmail(e.target.value)}/>
              {eye? 
            (
              <>
              <input type="text" placeholder='Password' className='Password' value={password} onChange ={(e) => setPassword(e.target.value)}/>
              <AiFillEye className='signin-eye-icon'onClick={changeEye}/>
              </>
            )
            :
            (
              <>
              <input type="password" placeholder='Password' className='Password' value={password} onChange ={(e) => setPassword(e.target.value)}/>
              <AiFillEyeInvisible className='signin-eye-icon'onClick={changeEye}/>
              </>
            )}
              <button className='signin' onClick={signin} disabled = {!email || password.length < 6 && true}>Log in</button>
            </form>
            { error && (
              <div className="signin-error">Something is wrong</div>
            )
            }
          </div>
          <div className='signin-form-footer'>Don't have an account? <a href="/signup">Sign up</a></div>
        </div>
      </div>
    </div>
  )
}

export default Signin