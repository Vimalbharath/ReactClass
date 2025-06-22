import React, { Component } from 'react';

class UpdateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:this.props.student.id,
            name:this.props.student.name,
            course:this.props.student.course
         };
    }

    handleOnChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    /**Handle on submit event handles adding the student with the state value.
     * prevent default method of the event interface tells the user agent that
     * if the event does not get explicitly handled, its default action should
     * not be taken as it normally would be by blocking the event from reloading
     * the page.
     */
    handleOnSubmit=(event)=>{
        event.preventDefault()
        this.props.addStudent(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    Id:<input type="text" value={this.state.id} name="id" onChange={this.handleOnChange}/>
                    Name:<input type="text" value={this.state.name} name="name" onChange={this.handleOnChange}/>
                    Course:<input type="text" value={this.state.course} name="course" onChange={this.handleOnChange}/>
                    <button>Update</button>
                </form>
            </div>
        );
    }
}

export default UpdateStudent;