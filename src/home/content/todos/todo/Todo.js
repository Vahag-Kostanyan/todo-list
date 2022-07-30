import React, { useState } from 'react'
import './todo.css'
import { AiTwotoneEdit } from 'react-icons/ai'
import { BsX } from 'react-icons/bs'
import { db } from '../../../../firebase/Firebase'
import {deleteDoc, doc,getDoc,setDoc, updateDoc} from 'firebase/firestore'

const Todo = ({ todo, id, user }) => {
    const { text, completed } = todo;
    const [update, setUpdate] = useState(text)
    const [isUpdate, setIsupdate] = useState(false)
    const [changicon, setChangicon] = useState(false)

    const deleteTodo = () => {
        const userDoc = doc(db, 'users', user?.uid);

        const todoDoc = doc(userDoc, 'todos', id);
        
        const binDoc = doc(userDoc, 'bin', id)
        
        getDoc(todoDoc)
        .then(doc => {
                setDoc(binDoc, doc.data())
                deleteDoc(todoDoc);
        })
        

    }
    const updateTodo = () => {

        const userDoc = doc(db, "users", user?.uid);

        const todoDoc = doc(userDoc, "todos", id);

        updateDoc(todoDoc, {
            text: update
        })

        setChangicon(!changicon)

        setIsupdate(false)
    }
    const changChackbox = () => {
        const userDoc = doc(db, 'users', user?.uid);

        const todoDoc = doc(userDoc, "todos", id);

        updateDoc( todoDoc, {
            completed: !completed
        })

    }
    const todoupdate = () => {
        setIsupdate(!isUpdate);
        setChangicon(!changicon);
    }
    

    return (
        <div className='todo-wrapper'>
            
            <div className="todo-content">
                <div className="todo-content-left-side">
                    <input type='checkbox' onChange={changChackbox} checked={completed} />
                    {isUpdate ?(
                        <form>
                            <input type="text" value={update} onChange = {e => setUpdate(e.target.value)} className = 'updateInput' maxLength={20}/>
                            <button onClick={updateTodo} className = 'updateButton'>update</button>
                        </form>
                    )
                    :
                    (
                        <p className='todo-text' style={{textDecoration: completed ? "line-through" : "none"}}>{text}</p>
                    )}
                </div>
                <div className="todo-content-right-side">
                    { !changicon ? 
                    (
                        <button className='todo-update' onClick = {todoupdate} ><AiTwotoneEdit  className ='todo-update-icon ' /></button>
                    )
                    :
                    (
                        <button className='todo-changupdate' onClick = {todoupdate} ><AiTwotoneEdit  className ='todo-update-icon ' /></button>
                    )}
                    <button className='todo-delet' onClick={deleteTodo}><BsX className='todo-delet-icon' /></button>
                </div>
            </div>
        </div>
    )
}

export default Todo