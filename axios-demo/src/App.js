import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            todos:[]
         };
    }

    componentDidMount(){
        Axios.get('https://raw.githubusercontent.com/bvaughn/infinite-list-reflow-examples/master/books.json').then((res)=>{
            console.log(res.data);
            this.setState({todos:res.data})
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <h1>todo list</h1>
                {
                    this.state.todos.map((todo)=>{
                        return <tr>
                            <td>{todo.isbn}</td>
                            <td>{todo.title}</td>
                            <td>{todo.pageCount}</td>
                        </tr>
                    })
                }
            </div>
        );
    }
}

export default App;