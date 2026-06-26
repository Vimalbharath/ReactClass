import { useState, useEffect } from "react";
import axios from 'axios';


function BooksAxios(){
    const [books,setBooks]=useState([]);
    const URL='http://localhost:3006/books'
    function fetchBooks(){
        fetch(URL)
        .then((res)=>res.json())
        .then((data)=> setBooks(data))
       
       
       
    }
    useEffect(()=>{
        fetchBooks();
      
    },[])
     // 2. Separate useEffect to log books ONLY after state has officially updated
    // useEffect(() => {
    //     console.log("Books state updated successfully:", books);
    // }, [books]); 

    // book=books.map((id,book)=>{
    //         return (
    //             <div>
                    
    //             </div>
    //         )
    //     })

    const vimal=["apple","mango","orange"]

    return (
        
        <div>
           {vimal.map((v,id)=>{
            return(
                <div key={id}>{v}</div>
            )
           })}
           {books.map((book,id)=>{
            return (
                <div key={id}>
                <div >{book.author} </div>
                <div>{book.id}{book.book} {book.description}</div>
                </div>
            )
           })

           }
        </div>
    )
}

export default BooksAxios;