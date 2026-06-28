import { useDispatch,useSelector } from "react-redux";
import { increment,decrement } from "./actions";


const Counter3=()=>{

    const count=useSelector(state=>state.count);
    const dispatch=useDispatch();

    return (
        <div>
            <button onClick={dispatch(()=>increment)}>-</button>
            <div>{count}</div>
            <button onClick={dispatch(()=>decrement)}>+</button>
        </div>
    )
}

export default Counter3;