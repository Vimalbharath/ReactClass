import { useState } from "react";

const Score=()=>{

    const[score,setScore]=useState(0);
    function increase(score){
        setScore(score +1);
    }
     function decrease(score){
        setScore(score-1);
    }
    return (
        <div>
            <button onClick={decrease}>-</button>
            <div>{score}</div>
            <button onClick={increase}>+</button>
        </div>
    )
}

export default Score;