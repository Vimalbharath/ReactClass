import React, { useState } from 'react';
import api from '../api/axios'; 

const AssociateForm = ({ user, onUpdate }) => { 
    const [newWork, setNewWork] = useState('');
    // State to hold local associate data, useful if parent doesn't immediately re-fetch
    // const [localUser, setLocalUser] = useState(user);

    // Update localUser if the 'user' prop changes (e.g., if parent re-fetches data)
    // React.useEffect(() => {
    //     setLocalUser(user);
    // }, [user]);

    // Helper function to render star icons
    const renderStars = (starCount) => {
        const stars = [];
        const numStars = parseInt(starCount, 10) || 0;
        for (let i = 0; i < numStars; i++) {
            stars.push(<span key={i} style={{ color: 'gold', fontSize: '1.2em' }}>⭐</span>);
        }
        return stars;
    };

    // Handler for new work input change
    const handleNewWorkChange = (e) => {
        setNewWork(e.target.value);
    };

    // Handler to add a new work task
    const handleAddWork = async () => {
        if (newWork.trim() === '') {
            alert('Please enter a task to add.');
            return;
        }

        const updatedWorks = user.works ? [...user.works, newWork.trim()] : [newWork.trim()];
        // const updatedAssociate = { ...user, works: updatedWorks };

        // try {
            // Optimistically update UI
            // setLocalUser(updatedAssociate); // Update local state immediately
            // setNewWork(''); // Clear the input field

            // Send PATCH request to update the 'works' array for this associate
            // JSON Server endpoint for a specific resource is /resource/:id
            const res = await api.patch(`/project/${user.id}`, { works: updatedWorks });
            console.log("Work added successfully:", res.data);

            // If there's an onUpdate prop, call it to notify parent
            // if (onUpdate) {
            //     onUpdate(res.data);
            // }

        // } catch (error) {
        //     console.error("Failed to add work:", error);
        //     alert("Failed to add work. Please try again.");
        //     // Rollback UI if update fails (optional, but good practice)
        //     setLocalUser(user); // Revert to original user prop state
        // }
    };

    // Handler for pressing Enter in the work input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddWork();
        }
    };


    // if (!localUser) {
    //     return <div className="alert alert-warning">No associate data available.</div>;
    // }

    // Ensure localUser.works is an array or default to empty
    const tasks = Array.isArray(user.works) ? user.works : [];

    return (
        <div className="card mb-4 shadow-sm"> {/* Added shadow for consistent look */}
            <div className="card-header bg-success text-white">
                <h3 className="mb-0">Associate: {user.name}</h3>
                <p className="mb-0"><small>Email: {user.email}</small></p>
            </div>
            <div className="card-body">
                {/* Display Stars as Images */}
                <h4 className="card-title mb-3">Stars:</h4>
                <div className="mb-3">
                    {renderStars(user.star)}
                    {user.star === "0" && <span className="text-muted ms-2">No stars yet</span>}
                </div>

                {/* Task Performed Section */}
                <h4 className="card-title mb-3">Tasks Performed:</h4>
                <ul className="list-group list-group-flush mb-3">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={index} className="list-group-item"> {/* Using index as key is fine here */}
                                {task}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No tasks recorded.</li>
                    )}
                </ul>

                {/* Add New Work Input */}
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add new work task..."
                        value={newWork}
                        onChange={handleNewWorkChange}
                        // onKeyDown={handleKeyDown}
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