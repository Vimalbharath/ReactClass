import { Component } from "react"
import Addemployee from "./Addemployee";
import UpdateEmployee from "./UpdateEmployee";

class Crud extends Component{
     constructor(props) {
        super(props);
        this.state = { 
            employees:[
                {"id":"1","firstName":"MS","lastName":"Dhoni","address":"Chennai"},
                {"id":"2","firstName":"Virat","lastName":"Kholi","address":"Bangalore"},
                {"id":"3","firstName":"Rohit","lastName":"Sharma","address":"Mumbai"}
            ],
            employee:{},
            updateFlag:false

         };
    }
     handleRemove=(index)=>{
        const current  = {...this.state};
        let newstate = current.employees.filter((employee,ind)=>{
            return ind !== index;
        });
        this.setState(({employees: newstate}));
    }

    handleEdit=(index)=>{
        let emp = this.state.employees.slice(index,index+1)
        let newstate = this.state.employees.filter((employee,ind)=>{
            return ind !== index;
        });
        this.setState({employee:emp[0],employees:newstate,updateFlag:true})
    }

    addEmployee=(employee)=>{
        let newState=[...this.state.employees,employee]
        this.setState({employees:newState,updateFlag:false})
    }


        render() {
        return (
            <div>
                <h1>Employee List</h1>
                <button>Add Student</button>
                <table className="table table-dark">
                    <thead>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map((employee,ind)=>{
                                return <tr key={ind}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                     <td>{employee.address}</td>
                                    <button onClick={()=>{this.handleEdit(ind)}} className="btn btn-info">Edit</button>
                                    <button onClick={()=>{this.handleRemove(ind)}} className="btn btn-danger"> Remove</button>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            {this.state.updateFlag?(<UpdateEmployee employee={this.state.employee} addEmployee={this.addEmployee}/>):(<Addemployee addEmployee={this.addEmployee}/>)
            }
            </div>
        );
    }
}

export default Crud;