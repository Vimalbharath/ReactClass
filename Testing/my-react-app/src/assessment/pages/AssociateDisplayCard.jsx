import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AssociateDisplayCard = ({ associate}) => {
    const [isExpanded, setIsExpanded] = useState(false); 
    const [newStar, setNewStar] = useState('0');
    const [currentUser,setCurrentUser]=useState(associate);
     useEffect(() => {
       
           console.log("Hello")
          
            
        
    }, [currentUser]);

   

    const toggleWorks = (e) => {
        e.stopPropagation(); 
        setIsExpanded(prev => !prev)
    };


     const handleNewWorkChange = (e) => {
        setNewStar(e.target.value);
    };

   
     const handleUpdateStar = async () => {
        if (newStar>5||newStar<1) {
            alert('Please enter between 1 to 5.');
            return;
        }

        console.log(parseInt(currentUser.star+newStar))

        const updatedStars =parseInt(currentUser.star+newStar) ;
            const res = await api.patch(`/project/${currentUser.id}`, { star: updatedStars });
            console.log("Star updated successfully:", res.data);
            setCurrentUser(res.data);
            console.log(currentUser)
            
    };

    const getButtonText = () => {
       
     return isExpanded ? 'Hide Details' : 'View Details';

    };

    return (
        <>
            <li
                className="list-group-item d-flex justify-content-between align-items-center"
            >
               
                <div>
                    <strong>{associate.name.toUpperCase()}   </strong>
                   
                </div>

                

                
               
            </li>

           
           
        </>
    );
};

export default AssociateDisplayCard;