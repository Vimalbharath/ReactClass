import React, { Component } from 'react';

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:this.props.employee.id,
            firstName:this.props.employee.firstName,
            lastName:this.props.employee.lastName,
            address:this.props.employee.address
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
        this.props.addEmployee(this.state)
    }

    render() {
        return (
             <div>
                 <div>Update Employee</div>
                <form onSubmit={this.handleOnSubmit}>
                    Id:<input type="text" name="id" onChange={this.handleOnChange}/>
                    FirstName:<input type="text" name="firstName" onChange={this.handleOnChange}/>
                    LastName:<input type="text" name="lastName" onChange={this.handleOnChange}/>
                    Address:<input type="text" name="address" onChange={this.handleOnChange}/>
                    <button>Save</button>
                </form>
              </div>
        );
    }
}

export default UpdateEmployee;