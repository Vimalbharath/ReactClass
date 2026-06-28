import {useState,useEffect} from 'react'
import axios from 'axios'

const User=()=>{
    const URL='https://api.github.com/users/vimalbharath'
    const [user,setUser]=useState({})

    // const fetchUser= function (){
    //     fetch(URL).then((res)=>res.json()).then((data)=>console.log(data))
    // }

    // const fetchUser=async ()=>{
    //     const response=await fetch(URL)
    //     const data=await response.json()
    //     console.log(data)
    // }

    async function fetchUser(){
        const response=await axios.get(URL);
        console.log(response.data)
    }

    useEffect(()=>{
        fetchUser()
    },[])
    
    return(
        <h1>Name :</h1>

    )
}

export default User;