import React from 'react';
import Student from "./Student";
import Score from './Score';
import BooksAxios from './BooksAxios';
import Counter1 from './usereducer_counter';
import Counter2, { CounterProvider } from './useReducerContext';
import { Provider } from 'react-redux';
import store from './reduxtoolkit/store';
import Counter3 from './reduxtoolkit/Counter';
import User from './thunk/user';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={name:"Vimalbharath Kumar"};
    }
    render(){
         return (
        <Provider store={store}>
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
            With ReduxToolkit
            <Counter3/>
            With Redux and Thunk
            <User/>
            
        </div>
        </CounterProvider>
        </Provider>
    )   

    }
   
}

export default App;