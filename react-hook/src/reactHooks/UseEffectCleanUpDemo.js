import React, { useState,useEffect } from 'react';

const UseEffectCleanUpDemo = () => {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addNote = (e) => {
        e.preventDefault()
        setNotes([
            ...notes,
            { title, body }
        ])
        setTitle('')
        setBody('')
    }

    const removeNote = (title) => {
        setNotes(notes.filter((note) => note.title !== title))
    }

    useEffect(() => {
        console.log ("try to fetch value from localstorage")
        const notesData = JSON.parse(localStorage.getItem('notes'))

        if (notesData) {
            setNotes(notesData)
        }
    }, [])

    useEffect(() => {
        
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    return (
        <div>
            <h1>Notes</h1>
            {notes.map((note) => (
                <Note key={note.title} note={note} removeNote={removeNote}/>
            ))}
            <p>Add note</p>
            <form onSubmit={addNote}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button>add note</button>
            </form>
        </div>
    )
}


const Note = ({ note, removeNote }) => {
    useEffect(() => {
        console.log('Setting up effect!')

        return () => {
            console.log('Cleaning up effect!')
        }
    }, [])

    return (
        <div>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button onClick={() => removeNote(note.title)}>x</button>
        </div>
    )
}

export default UseEffectCleanUpDemo;