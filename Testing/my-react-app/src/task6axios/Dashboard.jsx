import { Component } from "react"


class Dashboard extends Component {
    constructor(props) {
        super(props);
        
    }
    render(){
         return (
        <div>
            {this.props.books.map((book)=>{
               return (
                 <div key={book.id} className='single'>
                    <h1>{book.id} : {book.book}</h1>
                    <h2>{book.author}</h2>
                    <p>{book.description}</p>
                    <button>Remove</button>
                    <button>Edit</button>
                 
                  </div>
               )
            })}
        </div>
    )
        }

}

export default Dashboard;