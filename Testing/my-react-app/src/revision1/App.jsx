import React from 'react';
import Student from "./Student";
import Score from './Score';
import BooksAxios from './BooksAxios';
import Counter1 from './usereducer_counter';
import Counter2, { CounterProvider } from './useReducerContext';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={name:"Vimalbharath Kumar"};
    }
    render(){
         return (
        <CounterProvider>
        <div>  
            Start with Prop, state Function -{`>`} Class
            <Student name={this.state.name}/>
            Simple Counter with Class Component
            <Score/>
            With Map , Axios , Json server
            <BooksAxios/>
            With useReducer
            <Counter1/>
            With useReducer , useContext
            <Counter2/>
        </div>
        </CounterProvider>
    )   

    }
   
}

export default App;