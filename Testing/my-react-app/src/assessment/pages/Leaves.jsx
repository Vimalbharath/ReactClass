import AssociateForm from "./AssociateForm";
import ManagerForm from "./ManagerForm";

const Leaves=({user})=>{
    const role=user.role;
    return (
        <div>
        <h2>Rating</h2>
        {role==='associate'&& <AssociateForm user={user}/>}
        {role==='manager'&& <ManagerForm  user={user}/>} 
        </div>
       
    )
}

export default Leaves;