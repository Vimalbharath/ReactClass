import React from 'react';

const User = (props) => {
  let age = props.age >=0 ? props.age : "NA";
  if(props.name){
    return (
      <li>
        <span>  name: {props.name} | age: {age}  </span>
        <input onChange={props.changeEvent} value={props.name}/>
        <button onClick={props.delEvent}>Delete</button>
      </li>
    )
  } else {
    return(<li>Invalid Entry</li>)
  }
}

export default User;