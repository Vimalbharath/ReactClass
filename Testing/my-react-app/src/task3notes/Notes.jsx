import { Component } from "react";
import "./App.css"
import SingleNote from "./SingleNote";
class Notes extends Component{
    state ={
        notes:["eat","sleep","rotate"],
    note:null,
    
    }
    
    render(){
       return (
         <main>
          <div className="container">
            <h1 >Notes App</h1>

          <div className="innerc"><h2>
            Sample Notes App:
          </h2></div>

            <div className="innerc">
               <h3>List of notes saved</h3>
                {this.state.notes.map((note,id) => (
  <div key={id}><SingleNote id={id} note={note}/></div> 
))}
              
                 
               

            </div>
            

            <div className="innerc">
               <input></input>
               <button>Add</button>
            </div>

            </div>
            </main>
       ) 
    }
}

export default Notes;