import React, { useState } from 'react';
import api from '../api/axios'; 

const AssociateForm = ({ user }) => { 
    const [newWork, setNewWork] = useState('');
    React.useEffect(() => {
        
    }, [user]);

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

        const updatedWorks = user.works ? [...user.works, newWork.trim()] : [newWork.trim()];
            const res = await api.patch(`/project/${user.id}`, { works: updatedWorks });
            console.log("Work added successfully:", res.data);
            user=res.data;

    };

  
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddWork();
        }
    };

    const tasks = Array.isArray(user.works) ? user.works : [];

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h3 className="mb-0">Associate: {user.name}</h3>
                <p className="mb-0"><small>Email: {user.email}</small></p>
            </div>
            <div className="card-body">
                <h4 className="card-title mb-3">Stars:</h4>
                <div className="mb-3">
                    {renderStars(user.star)}
                    {user.star === "0" && <span className="text-muted ms-2">No stars yet</span>}
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