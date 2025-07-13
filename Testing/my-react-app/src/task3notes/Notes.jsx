import { Component } from "react";
import "./App.css"
import SingleNote from "./SingleNote";
class Notes extends Component{
    state ={
        notes:["eat","sleep","rotate"],
    note:null,
    
    }
    handleOnSubmit=(event)=>{
        event.preventDefault()
        this.addNote(this.state.note)
       
    }
      addNote = (note) => {
 
        let newState=[...this.state.notes,note]
        this.setState({notes:newState})
    }
   

    onChangeHandler=(event)=>{
      this.setState({[event.target.name]:event.target.value})
     
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
                {this.state.notes.map((note,id) => (
  <div key={id}><SingleNote id={id} note={note} removeNote={this.removeNote}/></div> 
))}
              
                 
               

            </div>
            

            <div className="innerc">
               <input type="text" name="note" onChange={this.onChangeHandler}></input>
               <button onSubmit={this.handleOnSubmit}>Add</button>
               <button onClick={()=>this.setState({notes:[]})}>Remove All</button>
            </div>

            </div>
            </main>
       ) 
    }
}

export default Notes;