import React, {useState,useEffect} from 'react'
import './signUp.css'
import { auth, db } from '../firebase/Firebase'
import {createUserWithEmailAndPassword, onAuthStateChanged, updateProfile} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'

function Signup() {

  const [email, setEmail ] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [eye, setEye] = useState(false)
  
      useEffect(() => {
          onAuthStateChanged(auth, user => {
            if(user){
              setTimeout(() => window.location.assign('/'), 1000)
            }
          })
       
        
      },[])

  const signup = (e) => {
    e.preventDefault()


    createUserWithEmailAndPassword(auth, email, password )
    .then((cred) => {
      const user = cred.user


      setDoc(doc(db,'users',user.uid ),{
        email:email,
        username:username,
      })

    })
    .catch(() =>   setError(true))
  }

  const changeEye = () => {
    setEye(!eye)
  }
  return (
    <div className='signup-wrapper'>
      <div className="signup-form">
        <div className="signup-form-heder">
          <img src="./assets/todo-icon.png" alt="todo icon" />
          <p>sign up</p>
        </div>
        <div className="signup-form-content">
          <form onSubmit={signup}>
            <input type="email" placeholder='Email address' className='Email' value={email} onChange = {e => setEmail(e.target.value)}/>
            <input type="text"  placeholder='Username' className='Username' value={username} onChange = {e => setUsername(e.target.value)}/>
            {eye? 
            (
              <>
              <input type="text"  placeholder='Password'className='Password' value={password} onChange = {e => setPassword(e.target.value)}/>
              <AiFillEye className='signup-eye-icon'onClick={changeEye}/>
              </>
            )
            :
            (
              <>
              <input type="password"  placeholder='Password'className='Password' value={password} onChange = {e => setPassword(e.target.value)}/>
              <AiFillEyeInvisible className='signup-eye-icon'onClick={changeEye}/>
              </>
            )}
            
            <button className='signup' disabled = {!email || !username || password.length < 6 && true}>Sign up</button>
          </form>
          {error && (
            <div className="signup-error">Something is wrong</div>
          )
         }
        </div>
        <div className='signup-form-footer'>Have an account? <a href="/signin">Sign in</a></div>
      </div>
    </div>
  )
}

export default Signup