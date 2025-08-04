import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const ManagerForm = ({ user }) => {
    const [directReports, setDirectReports] = useState([]);
    const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDirectReports = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/assessment');
            const allEmployees = Array.isArray(res.data) ? res.data : [];

            const filteredAssociates = allEmployees.filter(
                (employee) =>
                    employee.role === 'associate' && employee.reportsTo === user.id
            );
            setDirectReports(filteredAssociates);

            const pending = [];
            filteredAssociates.forEach(associate => {
                if (associate['leave-history'] && Array.isArray(associate['leave-history'])) {
                    associate['leave-history'].forEach((leave, leaveIndex) => {
                        if (leave.status === 'pending') {
                            pending.push({
                                associateId: associate.id,
                                associateName: associate.name,
                                leaveRequest: leave,
                                leaveRequestId: `${associate.id}-${leave.startDate}-${leave.endDate}-${leave.type}-${leaveIndex}`
                            });
                        }
                    });
                }
            });
            setPendingLeaveRequests(pending);

        } catch (err) {
            console.error("Failed to fetch direct reports or leave requests:", err);
            setError("Failed to load direct reports or leave requests. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [user.id]);

    useEffect(() => {
        fetchDirectReports();
    }, [fetchDirectReports]);

    const handleLeaveAction = async (associateId, leaveRequestToUpdate, newStatus) => {
        setError(null);
        try {
            const associate = directReports.find(report => report.id === associateId);

            if (!associate) {
                setError("Associate not found for this leave action.");
                return;
            }

            const updatedLeaveHistory = associate['leave-history'].map(leave => {
                if (
                    leave.startDate === leaveRequestToUpdate.startDate &&
                    leave.endDate === leaveRequestToUpdate.endDate &&
                    leave.type === leaveRequestToUpdate.type &&
                    leave.reason === leaveRequestToUpdate.reason &&
                    leave.status === 'pending'
                ) {
                    return { ...leave, status: newStatus };
                }
                return leave;
            });

            let updatedLeaveBalances = { ...associate['paid-leave-balance'] };
            if (newStatus === 'rejected' && leaveRequestToUpdate.type !== 'unpaid-leave') {
                updatedLeaveBalances[leaveRequestToUpdate.type] =
                    (updatedLeaveBalances[leaveRequestToUpdate.type] || 0) + leaveRequestToUpdate.days;
            }

            const res = await api.patch(`/assessment/${associateId}`, {
                'leave-history': updatedLeaveHistory,
                'paid-leave-balance': updatedLeaveBalances
            });
            console.log(`Leave request ${newStatus} for ${associate.name}:`, res.data);

            fetchDirectReports();

        } catch (err) {
            console.error(`Failed to ${newStatus} leave request:`, err);
            setError(`Failed to ${newStatus} leave request. Please try again.`);
        }
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h3 className="mb-0">Manager: {user.name.toUpperCase()}</h3>
                <p className="mb-0"><small>Email: {user.email}</small></p>
            </div>

            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}


                <h5 className="mb-3 text-warning">Pending Leave Requests from Direct Reports</h5>
                {loading ? (
                    <p>Loading pending leave requests...</p>
                ) : pendingLeaveRequests.length === 0 ? (
                    <p className="text-muted">No pending leave requests at this time.</p>
                ) : (
                    <ul className="list-group">
                        {pendingLeaveRequests.map((request) => (
                            <li key={request.leaveRequestId} className="list-group-item d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <strong>{request.associateName}</strong> ({request.associateId}) - {request.leaveRequest.type.replace(/-/g, ' ').toUpperCase()}
                                    <br />
                                    <small>
                                        {request.leaveRequest.startDate} to {request.leaveRequest.endDate} ({request.leaveRequest.days} day{request.leaveRequest.days !== 1 ? 's' : ''})
                                    </small>
                                    <p className="mb-0 text-muted fst-italic">Reason: {request.leaveRequest.reason}</p>
                                </div>
                                <div className="d-flex flex-column flex-md-row">
                                    <button
                                        className="btn btn-success btn-sm me-md-2 mb-2 mb-md-0"
                                        onClick={() => handleLeaveAction(request.associateId, request.leaveRequest, 'approved')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleLeaveAction(request.associateId, request.leaveRequest, 'rejected')}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ManagerForm;