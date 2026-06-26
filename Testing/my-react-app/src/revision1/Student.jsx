import React from "react";

class Student extends React.Component{
    render() {
        return (
             <div>
            The Student name is : {this.props.name}
        </div>
        )
       
    }
        
    
}

export default Student;