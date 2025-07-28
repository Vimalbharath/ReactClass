// src/components/AssociateDisplayCard.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AssociateDisplayCard = ({ associate, onUpdateAssociate }) => {
    // State to manage the editing value of stars for this specific associate
    const [editingStar, setEditingStar] = useState(associate.star || "0");
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState(null); // For displaying local errors

    // Effect to update internal editingStar state if the 'associate' prop changes from parent
    useEffect(() => {
        setEditingStar(associate.star || "0");
    }, [associate.star]); // Only re-run if the associate's star count actually changes

    // Helper function to render star icons
    const renderStars = (starCount) => {
        const stars = [];
        const numStars = parseInt(starCount, 10) || 0;
        for (let i = 0; i < numStars; i++) {
            stars.push(<span key={i} style={{ color: 'gold', fontSize: '1.2em' }}>⭐</span>);
        }
        return stars;
    };

    // Handler for star input change
    const handleStarChange = (e) => {
        let value = e.target.value;
        // Ensure value is a number string between 0 and 5
        let numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0) numValue = 0;
        if (numValue > 5) numValue = 5;

        setEditingStar(numValue.toString()); // Store as string to match db.json
    };

    // Handler to save stars when input loses focus or Enter is pressed
    const saveStars = async () => {
        // Only save if the star value has actually changed from the original prop
        if (editingStar === associate.star) {
            return;
        }
        setError(null); // Clear previous errors

        try {
            // Optimistically update the parent's state immediately for responsiveness
            // This is crucial: the parent (ManagerForm) will get the updated associate object
            if (onUpdateAssociate) {
                onUpdateAssociate({ ...associate, star: editingStar });
            }

            // Send PATCH request to update only the 'star' field
            const res = await api.patch(`/project/${associate.id}`, { star: editingStar });
            console.log(`Stars updated for ${associate.name} to ${res.data.star}`);

        } catch (error) {
            console.error(`Failed to update stars for ${associate.name}:`, error);
            setError(`Failed to save stars for ${associate.name}.`);
            // Rollback UI if update fails: revert to the original star value
            if (onUpdateAssociate) {
                onUpdateAssociate(associate); // Pass back the original associate prop
            }
            setEditingStar(associate.star || "0"); // Revert local input
        }
    };

    // Handler for 'Enter' key press on the star input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur(); // Trigger onBlur to save the stars
        }
    };

    // Toggle expansion of associate details
    const toggleExpansion = () => {
        setIsExpanded(prev => !prev);
        setError(null); // Clear errors when toggling
    };

    return (
        <React.Fragment>
            <li
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={toggleExpansion} // Click anywhere on the item to expand/collapse
                style={{ cursor: 'pointer' }}
            >
                <div>
                    <strong>{associate.name}</strong>
                    {error && ( // Display error specific to this associate
                        <small className="text-danger ms-2">{error}</small>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    {renderStars(associate.star)} {/* Display actual stars from prop */}
                    <input
                        type="number"
                        min="0"
                        max="5"
                        value={editingStar} // Bind input value to internal state
                        onChange={handleStarChange}
                        onBlur={saveStars} // Save on blur
                        onKeyDown={handleKeyDown} // Save on Enter
                        onClick={(e) => e.stopPropagation()} // Prevent list item click from firing when input is clicked
                        className="form-control form-control-sm ms-2"
                        style={{ width: '60px' }}
                        title="Edit Stars (0-5)"
                    />
                </div>
            </li>
            {isExpanded && (
                <li className="list-group-item list-group-item-light">
                    <strong>Email:</strong> {associate.email}
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
        </React.Fragment>
    );
};

export default AssociateDisplayCard;
