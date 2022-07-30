import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase/Firebase';
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Todo from './todo/Todo'
import './todos.css'
import { onAuthStateChanged } from 'firebase/auth';


const Todos = ({ search }) => {
  const [todos, setTodos] = useState([]);
  const [filtredTodos, setFiltredTodos] = useState([]);
  const [user, setUser] = useState({ uid: 1516554 })


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userDoc = doc(db, 'users', user && user?.uid);

        const todosCol = collection(userDoc, 'todos');
        const todosQuery = query(todosCol, orderBy("time", "desc"))
    
        onSnapshot(todosQuery, (snapshot) => {
          setTodos(todos => {
            return snapshot.docs.map(doc => doc)
          })
        })
      }
    })
  }, [])

  useEffect(() => {
    if(search.length > 0){
      const filtredTodos = todos.filter(todo => todo.data().text.includes(search));

      setFiltredTodos(filtredTodos)
    }
  }, [search])



  return (
    <div className='todos-wrapper'>
      {todos.length > 0 ? (
        <h1 className='todos-title'>todos</h1>        
      )
      :
      (
        <h1 className='todos-title'>Ther is not todos</h1>        
      )}
      {
        search.length == 0 ? (
          todos.map(todo => {
            return <Todo key={todo.id} todo={todo.data()} id={todo.id} user={user} />
          })
        ):(
          filtredTodos.map(todo => {
            return <Todo key={todo.id} todo={todo.data()} id={todo.id} user={user} />
  
          })
        )
        
      }
    </div>
  )
}

export default Todos