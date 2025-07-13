//useArray.js
import { useState, useCallback } from "react";

export const useArray=initial=>{
    const[value,setValue]=useState(initial);
    return{
        value,
        setValue,
        add:    useCallback(a=>setValue(v=>([...value,a]))),
        clear:  useCallback(()=>setValue(()=>[])),
    };
};