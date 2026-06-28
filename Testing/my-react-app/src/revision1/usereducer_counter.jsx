import { useState,useReducer } from "react";

 

const Counter1=()=>{
    const initialState={
        count:0
    }
 function myReducer(state,action) {
        switch (action.type){
            case 'INCREMENT':
                return {...state,count:state.count+1}
            case 'DECREMENT':
                return {...state,count:state.count-1}
            default:
                return state
        }
    }
   
    const [state,dispatch] = useReducer(myReducer,initialState);
    return (
        <div>
            <button onClick={()=>dispatch({type:'DECREMENT'})}>-</button>
            <div>{state.count}</div>
            <button onClick={()=>dispatch({type:'INCREMENT'})}>+</button>
        </div>
    )
}

export default Counter1;