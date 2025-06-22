import React, { Component } from 'react';


class Addstudent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:null,
            name:null,
            course:null
         };
    }

    handleOnChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleOnSubmit=(event)=>{
        event.preventDefault()
        this.props.addStudent(this.state)
        event.target.reset();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    Id:<input type="text" name="id" onChange={this.handleOnChange}/>
                    Name:<input type="text" name="name" onChange={this.handleOnChange}/>
                    Course:<input type="text" name="course" onChange={this.handleOnChange}/>
                    <button>Save</button>
                </form>
            </div>
        );
    }
}

export default Addstudent;