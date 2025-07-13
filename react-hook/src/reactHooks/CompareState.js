import React, { useState } from "react";

const CompareState = (props) => {                   //Functional component which has props as input
    const [state, setState] = useState({            //state is an object
        count: props.count,
        text: ''
    })

    return (
        <div>
            <p>The current {state.text || 'count'} is {state.count}</p>
            <button onClick={() => setState({ count: state.count - 1 })}>-1</button>
            <button onClick={() => setState({ count: props.count })}>reset</button>
            <button onClick={() => setState({ count: state.count + 1 })}>+1</button>
            <input value={state.text} onChange={(e) => setState({ text: e.target.value })} />
        </div>
    )
}

export default CompareState;