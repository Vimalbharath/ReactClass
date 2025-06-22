import React, { Component } from 'react';
import Addstudent from './Addstudent';
import UpdateStudent from './UpdateStudent';

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            students:[
                {"id":"1049","name":"Prasath","course":"guidewire"},
                {"id":"1050","name":"Pradeep","course":"java"},
                {"id":"1051","name":"Prakash","course":"c"}
            ],
            student:{},
            updateFlag:false
         };
    }

    handleRemove=(index)=>{
        const current  = {...this.state};
        let newstate = current.students.filter((student,ind)=>{
            return ind !== index;
        });
        this.setState(({students: newstate}));
    }

    handleEdit=(index)=>{
        let emp = this.state.students.slice(index,index+1)
        let newstate = this.state.students.filter((student,ind)=>{
            return ind !== index;
        });
        this.setState({student:emp[0],students:newstate,updateFlag:true})
    }

    addStudent=(student)=>{
        let newState=[...this.state.students,student]
        this.setState({students:newState,updateFlag:false})
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

export default StudentList;