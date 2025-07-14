import { Component } from "react";
import "./App.css"
import SingleNote from "./SingleNote";
import { v4 as uuidv4 } from 'uuid';
   
class Notes extends Component{
    state ={
        notes:[{"id":4,"text":"rotate"},
     {"id":2,"text":"eat"},
    {"id":3,"text":"sleep"} ],
    newnote:null,
    
    }
     uniqueId = uuidv4();
  //   generateUniqueId = () => {
  //   // A simple method to generate a unique ID based on timestamp and random number
  //   return Date.now() + Math.random().toString(36).substr(2, 9);
  // };
    handleOnSubmit=(event)=>{
        event.preventDefault()
        this.addNote(this.newnote)
        console.log("Submitted:"+ this.state.newnote)
       
    }

  
      addNote = (newnote) => {
 
        let newState=[...this.state.notes,{
        id:uuidv4(),
        text:this.state.newnote
     }]
        this.setState({notes:newState})
    }
   

    onChangeHandler=(event)=>{
      this.setState({[event.target.name]:event.target.value})
      console.log(event.target.value)
     
    }

     removeNote=(id)=>{
      const newNotes=this.state.notes.filter((note)=>note.id!==id)
      this.setState({notes:newNotes})
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
               
                {this.state.notes.map((text,id) => (
  <div key={text.id}><SingleNote id={text.id} text={text.text} removeNote={this.removeNote}/></div> 
))}

              
                 
               

            </div>
            

            <div className="innerc">
               <input type="text" name="newnote" onChange={this.onChangeHandler}></input>
               <button onClick={this.handleOnSubmit}>Add</button>
               <button onClick={()=>this.setState({notes:[]})}>Remove All</button>
            </div>

            </div>
            </main>
       ) 
    }
}

export default Notes;