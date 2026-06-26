import React from 'react';
import Student from "./Student";

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={name:"Vimalbharath Kumar"};
    }
    render(){
         return (
        <div>  
            <Student name={this.state.name}/>
        </div>
    )   

    }
   
}

export default App;