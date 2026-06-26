import { useState, useEffect } from "react";
import axios from 'axios';


function BooksAxios(){
    const [books,setBooks]=useState([]);
    const URL='http://localhost:3006/books'
    async function fetchBooks(){
        const response=await axios.get(URL);
        //console.log(response)
        //const data=await response.json();
        setBooks(response.data);
        //  console.log(books);
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
                <div key={id}>{book.author} {book.id}{book.book} {book.description}</div>
            )
           })

           }
        </div>
    )
}

export default BooksAxios;