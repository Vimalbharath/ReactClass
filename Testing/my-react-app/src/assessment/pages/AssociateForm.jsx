import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AssociateForm = ({ user }) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [error, setError] = useState(null);

    const [leaveRequest, setLeaveRequest] = useState({
        type: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            if (!leaveRequest.type) {
                const firstPaidLeaveType = Object.keys(user['paid-leave-balance'] || {})[0];
                setLeaveRequest(prev => ({
                    ...prev,
                    type: firstPaidLeaveType || ''
                }));
            }
        }
        setError(null);
    }, [user]);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const handleLeaveRequestChange = (e) => {
        const { name, value } = e.target;
        setLeaveRequest(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApplyLeave = async () => {
        const { type, startDate, endDate, reason } = leaveRequest;

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

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        let updatedLeaveBalances = { ...currentUser['paid-leave-balance'] };

        if (type !== 'unpaid-leave') {
            const availableBalance = updatedLeaveBalances[type] || 0;
            if (availableBalance < diffDays) {
                setError(`Insufficient ${type.replace(/-/g, ' ')} balance for paid leave. Available: ${availableBalance} day(s), Requested: ${diffDays} day(s). Please choose 'Unpaid Leave' if you wish to proceed.`);
                return;
            }
            updatedLeaveBalances[type] = availableBalance - diffDays;
        }

        setError(null);

        try {
            // --- FIX APPLIED HERE ---
            // Ensure 'days: diffDays' is always included in the leave history object
            const newLeaveEntry = { type, startDate, endDate, reason, status: 'pending', days: diffDays };

            const updatedLeaveHistory = currentUser['leave-history'] ?
                [...currentUser['leave-history'], newLeaveEntry] :
                [newLeaveEntry];
            // --- END FIX ---

            setCurrentUser(prevUser => ({
                ...prevUser,
                'leave-history': updatedLeaveHistory,
                'paid-leave-balance': updatedLeaveBalances
            }));

            setLeaveRequest(prev => ({
                ...prev,
                startDate: '',
                endDate: '',
                reason: ''
            }));

            const res = await api.patch(`/assessment/${currentUser.id}`, {
                'leave-history': updatedLeaveHistory,
                'paid-leave-balance': updatedLeaveBalances
            });
            console.log("Leave application successful:", res.data);
            setCurrentUser(res.data);

        } catch (err) {
            console.error("Failed to apply for leave:", err);
            setError("Failed to apply for leave. Please try again.");
            setCurrentUser(user);
        }
    };

    const leaveHistory = Array.isArray(currentUser['leave-history']) ? currentUser['leave-history'] : [];
    const paidLeaveBalance = currentUser['paid-leave-balance'] || {};

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

                <h5 className="mb-3">Apply for Leave:</h5>
                <form onSubmit={(e) => e.preventDefault()}>
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
                            <option value="">-- Select Leave Type --</option>
                            {Object.keys(paidLeaveBalance).length > 0 && (
                                <optgroup label="Paid Leaves">
                                    {Object.keys(paidLeaveBalance).map(type => (
                                        <option key={type} value={type}>{type.replace(/-/g, ' ').toUpperCase()}</option>
                                    ))}
                                </optgroup>
                            )}
                            <optgroup label="Unpaid Leave">
                                <option value="unpaid-leave">UNPAID LEAVE</option>
                            </optgroup>
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

                <h5 className="mb-3">My Leave History:</h5>
                {leaveHistory.length > 0 ? (
                    <ul className="list-group">
                        {leaveHistory.slice().sort((a, b) => new Date(b.startDate) - new Date(a.startDate)).map((leave, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{leave.type.replace(/-/g, ' ').toUpperCase()}</strong> from {leave.startDate} to {leave.endDate} ({leave.days} day{leave.days !== 1 ? 's' : ''})
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