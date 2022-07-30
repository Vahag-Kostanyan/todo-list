import React, { useEffect, useState } from 'react'
import './RecycleBin.css'
import { auth, db } from '../../../firebase/Firebase'
import BinTodo from './binTodo/BinTodo'
import { BsX } from 'react-icons/bs'
import { doc, collection, onSnapshot, deleteDoc, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const RecycleBin = ({bin, changeBin }) => {
  const [binTodos, setBinTodos] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const binCollection = collection(userDoc, 'bin');

        onSnapshot(binCollection, (snapshot) => {
          setBinTodos(todos => {
            return snapshot.docs.map(doc => doc)
            //doc.id doc.data() text, completed, time
          })
        })
      }
    })
  }, [])
  
  const cleanBinTodo = async() => {
  onAuthStateChanged(auth, async(user) => {
    if(user){
      const userDoc = doc(db, 'users', user.uid);
      const binCollection = collection(userDoc, 'bin');

      const binSnapshot = await getDocs(binCollection);

      binSnapshot.forEach(docInfo => {
        deleteDoc(doc(userDoc, 'bin', docInfo.id));
      })
    }
  })
  }
  return (
    <div className='bin-wrapper'>
      {bin ? (
        <div className='bin-wrapper-done'>
          <div className="bin-wrapper-done-navbar">
            <button className='bin-wrapper-done-navbar-clear' onClick = {cleanBinTodo}><p>clean todos</p></button>
            <button className='bin-wrapper-done-navbar-close' onClick={() => changeBin(!bin)}><BsX style = {{color: 'black'}}/></button>
          </div>
          <div className="bin-wrapper-done-content">
            {binTodos.length > 0 ?(
              <h1>tobos</h1>
            ):(
              <h1>ther is not todo</h1>
            )}
            {binTodos.map(todo => {
              return <BinTodo  key={todo.id} id = {todo.id} binTodo = {todo.data()}/>
            })}
          </div>
        </div>
      ):(
        <div className="bin-wrapper-img">
          {binTodos.length > 0 ? (
            <img src='./assets/imgs/full-bin.png' alt="recycle bin" onClick={() => changeBin(!bin)}/>
          ):(
            <img src='./assets/imgs/empty-bin.png' alt="recycle bin" onClick={() => changeBin(!bin)}/>
          )}
        </div>
      )}
    </div>
  )
}
export default RecycleBin
