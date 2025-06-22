import React, { Component } from 'react';
import Addstudent from './Addstudent';
import UpdateStudent from './UpdateStudent';

class EmployeeList extends Component {                              //use upper camel case for classes
    constructor(props) {
        super(props);
        this.state = { 
            employees:[
                {"id":"1","firstName":"Prasath","lastName":"Mahesh"},//use lower camel case for variables
                {"id":"2","firstName":"Pradeep","lastName":"Mahesh"},
                {"id":"3","firstName":"Prakash","lastName":"Kamaraj"}
            ],
            employee:{},
            updateFlag:false

         };
    }

    handleRemove=(index)=>{                //use lower camel case for methods starting with verb
        const current  = {...this.state};
        let newstate = current.employees.filter((employee,ind)=>{
            return ind !== index;
        });
        this.setState(({employees: newstate}));
    }

    render() {
        return (
            <div>
                <h1>Student List</h1>
                {/* <button>Add Student</button> */}
                <table className="table table-dark">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            this.state.students.map((student,ind)=>{
                                return <tr key={ind}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.course}</td>
                                    <button onClick={()=>{this.handleEdit(ind)}} className="btn btn-info">Edit</button>
                                    <button onClick={()=>{this.handleRemove(ind)}} className="btn btn-danger"> Remove</button>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            {this.state.updateFlag?(<UpdateStudent student={this.state.student} addStudent={this.addStudent}/>):(<Addstudent addStudent={this.addStudent}/>)
            }
            </div>
        );
    }
}



const Button = ({text}) => {
    return <button>{text}</button>;
};



export default EmployeeList;