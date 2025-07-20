import {useState} from 'react';

const App=()=>{
    const [value,setValue]=useState(0);
    const increase=()=>{
        setValue(value+1);
    }
    const decrease=()=>{
        if(value>0){
             setValue(value-1);
        }
       
    }
    return (
    <div className='container border my-5 p-5'>
        <h1>Hooks Counter</h1>
      <button onClick={increase}>+</button>
      <div>{value}</div>
      <button onClick={decrease}>-</button>
    </div>)
}

export default App;