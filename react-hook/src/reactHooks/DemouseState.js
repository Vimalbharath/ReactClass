import React, { useState, useEffect } from 'react';


const DemouseState = (props) => {                   //Functional Component
    const [count, setCount] = useState(0)           //useState('') - Initial Value, count-variable, setCount - setState
    const [text, setText] = useState('Value')
  
    useEffect(()=>{
        console.log("loaded app")
            },[])

    useEffect(()=>{
        console.log("component did mount")
        document.title=count
    },[count])

    return (
        <div>

            <p>The current {text} is {count}</p>
            <input value={text} onChange={(e)=>setText(e.target.value)}/>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>reset</button>
            <button onClick={() => setCount(count + 1)}>+1</button>
            
        </div>
    )
}

export default DemouseState;