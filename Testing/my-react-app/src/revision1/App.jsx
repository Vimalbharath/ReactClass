import React from 'react';
import Student from "./Student";
import Score from './Score';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={name:"Vimalbharath Kumar"};
    }
    render(){
         return (
        <div>  
            <Student name={this.state.name}/>
            <Score/>
        </div>
    )   

    }
   
}

export default App;