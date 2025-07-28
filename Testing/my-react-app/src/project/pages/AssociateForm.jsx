import React, { useState ,useEffect} from 'react';
import api from '../api/axios'; 

const AssociateForm = ({ user}) => { 
    const [currentUser,setCurrentUser]=useState(user);
    const [newWork, setNewWork] = useState('');

   useEffect(() => {
       
            localStorage.setItem('user', JSON.stringify(currentUser));
             setNewWork('');
        
    }, [currentUser]);

    const renderStars = (starCount) => {
        const stars = [];
        const numStars = parseInt(starCount, 10) || 0;
        for (let i = 0; i < numStars; i++) {
            stars.push(<span key={i} style={{ color: 'gold', fontSize: '1.2em' }}>⭐</span>);
        }
        return stars;
    };

   
    const handleNewWorkChange = (e) => {
        setNewWork(e.target.value);
    };

    
    const handleAddWork = async () => {
        if (newWork.trim() === '') {
            alert('Please enter a task to add.');
            return;
        }

        const updatedWorks = currentUser.works ? [...currentUser.works, newWork.trim()] : [newWork.trim()];
            const res = await api.patch(`/project/${currentUser.id}`, { works: updatedWorks });
            console.log("Work added successfully:", res.data);
            setCurrentUser(res.data);
            
    };

  
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddWork();
        }
    };

    const tasks = Array.isArray(currentUser.works) ? currentUser.works : [];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h3 className="mb-0">Associate: {currentUser.name}</h3>
                <p className="mb-0"><small>Email: {currentUser.email}</small></p>
            </div>
            <div className="card-body">
                <h4 className="card-title mb-3">Stars:</h4>
                <div className="mb-3">
                    {renderStars(currentUser.star)}
                    {currentUser.star === "0" && <span className="text-muted ms-2">No stars yet</span>}
                </div>

                <h4 className="card-title mb-3">Tasks Performed:</h4>
                <ul className="list-group list-group-flush mb-3">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={index} className="list-group-item">
                                {task}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No tasks recorded.</li>
                    )}
                </ul>

              
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add new work task..."
                        value={newWork}
                        onChange={handleNewWorkChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="btn btn-outline-success"
                        onClick={handleAddWork}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssociateForm;