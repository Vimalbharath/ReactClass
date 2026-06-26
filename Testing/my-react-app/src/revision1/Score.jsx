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
            <button onClick={()=>{setScore(score-1)}}>-</button>
            <div>{score}</div>
            <button onClick={()=>increase(score)}>+</button>
        </div>
    )
}

export default Score;