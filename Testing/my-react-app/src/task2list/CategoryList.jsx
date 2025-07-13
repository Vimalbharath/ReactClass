
import { Component } from "react";

class CategoryList extends Component{
    state ={
        skills:["java","spring","react"
        
    ],
    skill:null,
    
    }
    
    // handleOnChange=(event)=>{
    //     this.setState({[event.target.name]:event.target.value})
    // }
     addSkill = (skill) => {
 
        let newState=[...this.state.skills,skill]
        this.setState({skills:newState})
    }
    

    

   removeSkills = () => {
    const updatedSkills = []

    this.setState({ skills: updatedSkills });
  }
  handleOnSubmit=(event)=>{
        event.preventDefault()
        this.addSkill(this.state.skill)
       
    }
    handleOnChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        return (<div>
            <h1>List-Example</h1>
            <h2>List of skills:</h2>
            
         {this.state.skills.map((skill,id) => (
  <div key={id}>{skill}</div> 
))}
            <input type="text" name="skill" onChange={this.handleOnChange} ></input>
            <button onClick={this.handleOnSubmit}>Add</button>
            <button onClick={this.removeSkills}>Remove all</button>
        </div>);
    }
}

export default CategoryList;
