import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AssociateForm = ({ user }) => {
    // currentUser state should reflect the 'user' prop and update based on local changes
    const [currentUser, setCurrentUser] = useState(user);
    const [error, setError] = useState(null); // For displaying API errors

    // State for the new leave application form
    const [leaveRequest, setLeaveRequest] = useState({
        type: '', // Default to empty, let user select from available types
        startDate: '',
        endDate: '',
        reason: ''
    });

    // --- Effects ---
    // Effect to synchronize currentUser state with the 'user' prop
    // This ensures if the 'user' prop changes from the parent, our internal state updates.
    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            // Set default leave type to the first available if not already set
            if (!leaveRequest.type && user['paid-leave-balance'] && Object.keys(user['paid-leave-balance']).length > 0) {
                setLeaveRequest(prev => ({
                    ...prev,
                    type: Object.keys(user['paid-leave-balance'])[0]
                }));
            }
        }
        setError(null); // Clear errors when user prop updates
    }, [user]); // Depend on the 'user' prop

    // Effect to update localStorage whenever currentUser changes.
    // Assuming 'user' in localStorage is the key where this user's data is stored.
    useEffect(() => {
        if (currentUser && currentUser.id) {
            localStorage.setItem('leave', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    // --- Handlers for Leave Request Form ---
    const handleLeaveRequestChange = (e) => {
        const { name, value } = e.target;
        setLeaveRequest(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApplyLeave = async () => {
        const { type, startDate, endDate, reason } = leaveRequest;

        // Basic validation
        if (!type || !startDate || !endDate || !reason.trim()) {
            setError('Please select a leave type and fill in all fields (start date, end date, reason).');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            setError('End date cannot be before start date.');
            return;
        }

        // Calculate number of days (simple calculation, adjust for weekends/holidays if needed)
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day

        // Check if associate has enough leave balance
        const leaveBalances = currentUser['paid-leave-balance'] || {};
        const availableBalance = leaveBalances[type] || 0;

        if (availableBalance < diffDays) {
            setError(`Insufficient ${type.replace(/-/g, ' ')} balance. Available: ${availableBalance} day(s), Requested: ${diffDays} day(s).`);
            return;
        }

        setError(null); // Clear previous errors

        try {
            // Prepare updated leave history
            const updatedLeaveHistory = currentUser['leave-history'] ?
                [...currentUser['leave-history'], { type, startDate, endDate, reason, status: 'pending' }] :
                [{ type, startDate, endDate, reason, status: 'pending' }];

            // Prepare updated leave balance (deducting the requested days)
            const updatedLeaveBalances = {
                ...leaveBalances,
                [type]: availableBalance - diffDays
            };

            // Optimistically update UI
            setCurrentUser(prevUser => ({
                ...prevUser,
                'leave-history': updatedLeaveHistory,
                'paid-leave-balance': updatedLeaveBalances
            }));
            // Reset leave request form
            setLeaveRequest({
                type: Object.keys(paidLeaveBalance).length > 0 ? Object.keys(paidLeaveBalance)[0] : '', // Reset to first available type
                startDate: '',
                endDate: '',
                reason: ''
            });


            // Send PATCH request to update the 'leave-history' and 'paid-leave-balance'
            const res = await api.patch(`/assessment/${currentUser.id}`, {
                'leave-history': updatedLeaveHistory,
                'paid-leave-balance': updatedLeaveBalances
            });
            console.log("Leave application successful:", res.data);
            // Confirm with data from server, ensuring local state matches backend
            setCurrentUser(res.data);

        } catch (err) {
            console.error("Failed to apply for leave:", err);
            setError("Failed to apply for leave. Please try again.");
            // Rollback optimistic update if API call fails
            setCurrentUser(user); // Revert to original user prop state
        }
    };

    // --- Derived Data ---
    const leaveHistory = Array.isArray(currentUser['leave-history']) ? currentUser['leave-history'] : [];
    const paidLeaveBalance = currentUser['paid-leave-balance'] || {};

    // --- Render Logic ---
    // If user prop is not valid initially, display a loading/error message
    if (!user || !user.id) {
        return <div className="alert alert-info">Associate data not available.</div>;
    }

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h3 className="mb-0">Associate: {currentUser.name}</h3>
                <p className="mb-0"><small>Email: {currentUser.email}</small></p>
            </div>

            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Leave Balance Section */}
                <div className="mb-4">
                    <h5 className="mb-3">Current Leave Balances:</h5>
                    <ul className="list-group list-group-flush">
                        {Object.keys(paidLeaveBalance).length > 0 ? (
                            Object.entries(paidLeaveBalance).map(([type, balance]) => (
                                <li key={type} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong>{type.replace(/-/g, ' ').toUpperCase()}:</strong>
                                    <span className="badge bg-primary rounded-pill">{balance} days</span>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item text-muted">No paid leave balances found. Contact HR.</li>
                        )}
                    </ul>
                </div>

                <hr />

                {/* Apply for Leave Section */}
                <h5 className="mb-3">Apply for Leave:</h5>
                <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                    <div className="mb-3">
                        <label htmlFor="leaveType" className="form-label">Leave Type:</label>
                        <select
                            id="leaveType"
                            name="type"
                            className="form-select"
                            value={leaveRequest.type}
                            onChange={handleLeaveRequestChange}
                            required
                        >
                            <option value="">-- Select Leave Type --</option> {/* Added a default empty option */}
                            {Object.keys(paidLeaveBalance).length > 0 ? (
                                Object.keys(paidLeaveBalance).map(type => (
                                    <option key={type} value={type}>{type.replace(/-/g, ' ').toUpperCase()}</option>
                                ))
                            ) : (
                                <option disabled>No leave types available</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="form-control"
                            value={leaveRequest.startDate}
                            onChange={handleLeaveRequestChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="form-control"
                            value={leaveRequest.endDate}
                            onChange={handleLeaveRequestChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reason" className="form-label">Reason:</label>
                        <textarea
                            id="reason"
                            name="reason"
                            className="form-control"
                            rows="3"
                            placeholder="Enter reason for leave..."
                            value={leaveRequest.reason}
                            onChange={handleLeaveRequestChange}
                            required
                        ></textarea>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleApplyLeave}>
                        Apply Leave
                    </button>
                </form>

                <hr />

                {/* Leave History Section */}
                <h5 className="mb-3">My Leave History:</h5>
                {leaveHistory.length > 0 ? (
                    <ul className="list-group">
                        {/* Sort leave history by start date, newest first (optional) */}
                        {leaveHistory.slice().sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).map((leave, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{leave.type.replace(/-/g, ' ').toUpperCase()}</strong> from {leave.startDate} to {leave.endDate}
                                <br />
                                Reason: {leave.reason}
                                <span className={`badge ms-2 ${leave.status === 'pending' ? 'bg-warning text-dark' : leave.status === 'approved' ? 'bg-success' : 'bg-danger'}`}>
                                    {leave.status ? leave.status.toUpperCase() : 'PENDING'}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">No leave history recorded yet.</p>
                )}
            </div>
        </div>
    );
};

export default AssociateForm;