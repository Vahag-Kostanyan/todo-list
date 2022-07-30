import React, { useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs'
import { FaTrashRestore } from 'react-icons/fa'
import './binTodo.css'
import { db, auth } from '../../../../firebase/Firebase'
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'



const BinTodo = ({ binTodo, id }) => {
  const { text, completed } = binTodo
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])
  const deleteBinTodo = () => {
    const userDoc = doc(db, 'users', user.uid);

    const binCol = doc(userDoc, 'bin', id);

    deleteDoc(binCol)
  }
  const binCompleted = () => {
    const userDoc = doc(db, 'users', user.uid);
    const binCol = doc(userDoc, 'bin', id);

    updateDoc(binCol, {
      completed: !completed
    })
  }
  const restorTodo = () => {
    const userDoc = doc(db, 'users', user.uid);
    const todoCol = doc(userDoc, 'todos', id);
    const binCol = doc(userDoc, 'bin', id)

    getDoc(binCol)
      .then(doc => {
        setDoc(todoCol, doc.data());
        deleteDoc(binCol);
      })

  }
  return (
    <div className='BinTodo-content'>
      <div className="BinTodo-content-left-side">
        <input type="checkbox" onChange={binCompleted} checked={completed} />
        <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</p>
      </div>
      <div className="BinTodo-content-right-side">
        <button><FaTrashRestore onClick={restorTodo} /></button>
        <button><BsX onClick={deleteBinTodo} /></button>
      </div>
    </div>
  )
}

export default BinTodo