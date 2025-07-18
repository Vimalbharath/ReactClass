import { Component } from "react"


class BookApp extends Component{
  
    render(){
      return ( <div className="container p-5 my-5 border">
    <h1>My First Bootstrap Page</h1>
    <p>This part is inside a .container class.</p>
    <p>The .container class provides a responsive fixed width container.</p>
    <div className="container-fluid mt-3">
    <h1>Three equal width columns</h1>
    <p>Note: Try to add a new div with class="col" inside the row class - this will create four equal-width columns.</p>
    <div class="row">
        <div className="col p-3 bg-primary text-white">.col</div>
        <div className="col p-3 bg-dark text-white">.col</div>
        <div className="col p-3 bg-primary text-white">.col</div>
    </div>
</div>
     </div>);
    }
}

export default BookApp;