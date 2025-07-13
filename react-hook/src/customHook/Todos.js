//Todos.js
import React from 'react';
import { useArray } from "./useArray";

const Todos = () => {
const todos=useArray([])

    return (
        <div>
            <h1> Todo List</h1>
            <ul>
{
      todos.value.map(todo=>{
          return <li>{todo}</li>

    })
}
</ul>
<button onClick={()=>{todos.add(Math.random())}}>add</button>
<button onClick={todos.clear}>clear</button>
        </div>
        
    );
}

export default Todos;