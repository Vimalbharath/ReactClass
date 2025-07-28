import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AssociateDisplayCard = ({ associate}) => {
    const [isExpanded, setIsExpanded] = useState(false); 
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