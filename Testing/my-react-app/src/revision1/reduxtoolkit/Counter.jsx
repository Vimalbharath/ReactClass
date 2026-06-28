import { useDispatch,useSelector } from "react-redux";
import { increment,decrement } from "./counterSlice";


const Counter3=()=>{

    const count=useSelector((state)=>state.counter.count);
    const dispatch=useDispatch();

    return (
        <div>
            <button onClick={()=>dispatch(decrement())}>-</button>
            <div>{count}</div>
            <button onClick={()=>dispatch(increment())}>+</button>
        </div>
    )
}

export default Counter3;