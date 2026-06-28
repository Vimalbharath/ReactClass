import { createContext, useContext, useReducer } from "react";

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

const CounterContext=createContext();

export const CounterProvider = ({children}) =>{
    const [state,dispatch] = useReducer(myReducer,initialState);

    return <CounterContext.Provider value={{state,dispatch}}>
                {children}
                </CounterContext.Provider>
}


 

const Counter2=()=>{

    const {state,dispatch}=useContext(CounterContext);

    return (
        <div>
            <button onClick={()=>dispatch({type:'DECREMENT'})}>-</button>
            <div>{state.count}</div>
            <button onClick={()=>dispatch({type:'INCREMENT'})}>+</button>
        </div>
    )
}

export default Counter2;