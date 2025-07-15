import React, { Component } from 'react';


class Addemployee extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:null,
            firstName:null,
            lastName:null,
            address:null
         };
    }

    handleOnChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleOnSubmit=(event)=>{
        event.preventDefault()
        this.props.Addemployee(this.state)
        event.target.reset();
    }

    render() {
        return (
            <div>
                <div>Add Employee</div>
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

export default Addemployee;