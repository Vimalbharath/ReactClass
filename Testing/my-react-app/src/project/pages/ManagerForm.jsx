import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const ManagerForm = ({ user }) => { 
    const [directReports, setDirectReports] = useState([]);
    const [expandedAssociateId, setExpandedAssociateId] = useState(null);
    const [editingStars, setEditingStars] = useState({});
    useEffect(() => {
        const fetchDirectReports = async () => {

                const res = await api.get('/project');
                const allEmployees = Array.isArray(res.data) ? res.data : [];

                const filteredAssociates = allEmployees.filter(
                    (employee) =>
                        employee.role === 'associate' && employee.reportsTo === user.id
                );
                setDirectReports(filteredAssociates);

                // // Initialize editingStars state with current star values
                // const initialEditingStars = {};
                // filteredAssociates.forEach(assoc => {
                //     initialEditingStars[assoc.id] = assoc.star || "0";
                // });
                // setEditingStars(initialEditingStars);

        //     } catch (err) {
        //         console.error("Error fetching direct reports:", err);
        //         setErrorReports("Failed to load direct reports.");
        //     } finally {
        //         setLoadingReports(false);
        //     }
        };

        fetchDirectReports();
    }, [user]); // Dependency on user.id to refetch if manager changes

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
    // const handleStarChange = (associateId, value) => {
    //     // Ensure value is a number string between 0 and 5
    //     let numValue = parseInt(value, 10);
    //     if (isNaN(numValue) || numValue < 0) numValue = 0;
    //     if (numValue > 5) numValue = 5;

    //     setEditingStars(prevStars => ({
    //         ...prevStars,
    //         [associateId]: numValue.toString() // Store as string to match db.json
    //     }));
    // };

    // Handler to save stars when input loses focus or Enter is pressed
    // const saveStars = async (associateId) => {
    //     const newStarValue = editingStars[associateId];
    //     const associateToUpdate = directReports.find(assoc => assoc.id === associateId);

    //     if (!associateToUpdate || associateToUpdate.star === newStarValue) {
    //         // No change or associate not found
    //         return;
    //     }

    //     try {
    //         // Optimistically update UI
    //         setDirectReports(prevReports =>
    //             prevReports.map(report =>
    //                 report.id === associateId ? { ...report, star: newStarValue } : report
    //             )
    //         );

    //         // Send PATCH request to update only the 'star' field
    //         // The JSON Server endpoint for a specific resource is /resource/:id
    //         await api.patch(`/project/${associateId}`, { star: newStarValue });
    //         console.log(`Stars updated for ${associateToUpdate.name} to ${newStarValue}`);
    //     } catch (error) {
    //         console.error(`Failed to update stars for ${associateToUpdate.name}:`, error);
    //         setErrorReports(`Failed to save stars for ${associateToUpdate.name}.`);
    //         // Rollback UI if update fails
    //         setDirectReports(prevReports =>
    //             prevReports.map(report =>
    //                 report.id === associateId ? { ...report, star: associateToUpdate.star } : report
    //             )
    //         );
    //     }
    // };

    const handleKeyDown = (e, associateId) => {
        if (e.key === 'Enter') {
            e.target.blur(); // Trigger onBlur to save the stars
        }
    };

    const toggleAssociateDetails = (associateId) => {
        setExpandedAssociateId(prevId => (prevId === associateId ? null : associateId));
    };

    // if (!user) {
    //     return <div className="alert alert-info">No manager data provided.</div>;
    // }

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h3 className="mb-0">Manager: {user.name.toUpperCase()}</h3>
                <p className="mb-0"><small>Email: {user.email}</small></p>
            </div>

            <div className="card-body">
                <h5 className="mb-3 text-primary">Your Direct Reports (Associates)</h5>
                {/* {loadingReports ? (
                    <p className="text-muted">Loading direct reports...</p>
                ) : errorReports ? (
                    <div className="alert alert-danger">{errorReports}</div>
                ) : } */}
                
                {directReports.length === 0 ? (
                    <p className="text-muted">You currently have no direct reports.</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {directReports.map((associate) => (
                            <React.Fragment key={associate.id}>
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    // Make the whole area clickable except the input itself
                                    onClick={() => toggleAssociateDetails(associate.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div>
                                        <strong>{associate.name}</strong>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        {renderStars(associate.star)} {/* Display actual stars */}
                                        <input
                                            type="number"
                                            min="0"
                                            max="5"
                                            value={editingStars[associate.id] || "0"} // Bind input value to state
                                            onChange={(e) => handleStarChange(associate.id, e.target.value)}
                                            onBlur={() => saveStars(associate.id)} // Save on blur
                                            onKeyDown={(e) => handleKeyDown(e, associate.id)} // Save on Enter
                                            onClick={(e) => e.stopPropagation()} // Prevent list item click from firing when input is clicked
                                            className="form-control form-control-sm ms-2"
                                            style={{ width: '60px' }}
                                            title="Edit Stars (0-5)"
                                        />
                                    </div>
                                </li>
                                {expandedAssociateId === associate.id && (
                                    <li className="list-group-item list-group-item-light">
                                        <strong>Works:</strong>
                                        {associate.works && associate.works.length > 0 ? (
                                            <ul className="list-unstyled mb-0">
                                                {associate.works.map((work, index) => (
                                                    <li key={index}>- {work}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-muted mb-0">No works recorded.</p>
                                        )}
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ManagerForm;