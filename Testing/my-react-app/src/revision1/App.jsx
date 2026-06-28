import React from 'react';
import Student from "./Student";
import Score from './Score';
import BooksAxios from './BooksAxios';
import Counter1 from './usereducer_counter';

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
            <BooksAxios/>
            <Counter1/>
        </div>
    )   

    }
   
}

export default App;