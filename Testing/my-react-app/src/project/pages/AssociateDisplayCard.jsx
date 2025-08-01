import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AssociateDisplayCard = ({ associate}) => {
    const [isExpanded, setIsExpanded] = useState(false); 
    const [newStar, setNewStar] = useState('0');
    const [currentUser,setCurrentUser]=useState(associate);
     useEffect(() => {
       
           console.log("Hello")
          
            
        
    }, [currentUser]);

    const renderStars = (starCount) => {
        const stars = [];
        const numStars = parseInt(starCount, 10) || 0;
        for (let i = 0; i < numStars; i++) {
            stars.push(<span key={i} style={{ color: 'gold', fontSize: '1.2em' }}>⭐</span>);
        }
        return stars;
    };

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
                    <strong>{associate.name.toUpperCase()}  - </strong>
                    <span>{associate.id}</span>
                </div>

                

                
                <div className="d-flex align-items-center">
                    
                    {(associate.star==0)?<button
                        className="btn btn-info btn-sm ms-2"
                    onClick={handleUpdateStar}   
                    >
                       Rate Stars
                    </button>:renderStars(associate.star)}


                    <button
                        className="btn btn-info btn-sm ms-2"
                        onClick={toggleWorks}
                    >
                        {getButtonText()} 
                    </button>
                </div>
            </li>

           
            {isExpanded  && (
                <li className="list-group-item list-group-item-light">

                    <input type='number'
                    placeholder="Enter between 1 to 5..."
                        value={newStar}
                        onChange={handleNewWorkChange}
                        ></input>
                   
                    <h6 className="mt-2 mb-1">Works:</h6>
                    {associate.works && associate.works.length > 0 ? (
                        <ul className="list-unstyled mb-0 ms-3">
                            {associate.works.map((work, index) => (
                                <li key={index}>- {work}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted mb-0 ms-3">No works recorded.</p>
                    )}
                </li>
            )}
        </>
    );
};

export default AssociateDisplayCard;