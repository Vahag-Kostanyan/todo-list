import React, { useState } from 'react'
import { db } from '../../../firebase/Firebase'
import { doc, addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore'
import './form.css'

const Form = ({ userId, search, changeSearch }) => {
    const [text, setText] = useState('')

    const  addTodo = (e) => {
        e.preventDefault();

        const userDoc = doc(db, 'users', userId);

        const todosCol = collection(userDoc, 'todos');

        addDoc(todosCol, {
            text:text,
            completed: false,
            time: serverTimestamp()
        })

        setText('')
    }

   
    return (
        <div className='form-wrapper'>
            <form onSubmit={addTodo}>
                <input type="text" placeholder='add todo' className='form-add-todo' value={text} onChange={e => setText(e.target.value)} maxLength = {20}/>
                <input type="text" placeholder='search todo'className='form-search-todo' value={search} onChange = {e => changeSearch(e.target.value)}/>
                <button className='form-button' type="submit" disabled = {!text}>add todo</button>
            </form>
        </div>
    )
}

export default Form