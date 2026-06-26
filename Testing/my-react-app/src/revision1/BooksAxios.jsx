import { useState, useEffect } from "react";


function BooksAxios(){
    const [books,setBooks]=useState({});
    const URL='http://localhost:3006/books'
    async function fetchBooks(){
        const response=await fetch(URL);
        console.log(response)
        const data=await response.json();
        setBooks(data);
    }
    useEffect(()=>{
        fetchBooks();
        console.log(books);
    },[])
    return (
        <div>
        
        </div>
    )
}

export default BooksAxios;