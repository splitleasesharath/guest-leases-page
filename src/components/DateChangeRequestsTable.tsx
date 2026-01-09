import React from 'react';
import { Check, X, Plus, Clock } from 'lucide-react';
import { DateChangeRequest } from '../types/lease.types';
import { formatDate, formatCurrency } from '../utils/formatters';
import './DateChangeRequestsTable.css';

interface DateChangeRequestsTableProps {
  requests: DateChangeRequest[];
  currentUserId: string;
  onApprove: (request: DateChangeRequest) => void;
  onReject: (request: DateChangeRequest) => void;
  onRequestChanges: () => void;
}

export const DateChangeRequestsTable: React.FC<DateChangeRequestsTableProps> = ({
  requests,
  currentUserId,
  onApprove,
  onReject,
  onRequestChanges,
}) => {
  const getStatusDisplay = (status: string): string => {
    const statusMap: Record<string, string> = {
      waiting_for_answer: 'Waiting for Answer',
      accepted: 'Accepted',
      rejected: 'Rejected',
      soon_to_expire: 'Soon to Expire',
      expired: 'Expired',
      cancelled: 'Cancelled',
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status: string): string => {
    const classMap: Record<string, string> = {
      waiting_for_answer: 'request-status-waiting',
      accepted: 'request-status-accepted',
      rejected: 'request-status-rejected',
      soon_to_expire: 'request-status-expiring',
      expired: 'request-status-expired',
      cancelled: 'request-status-cancelled',
    };
    return classMap[status] || '';
  };

  const canRespond = (request: DateChangeRequest): boolean => {
    return (
      request.requestStatus === 'waiting_for_answer' &&
      request.requestedBy.id !== currentUserId
    );
  };

  const formatRequestInfo = (request: DateChangeRequest): string => {
    const oldDates = request.listOfOldDates.map((d) => formatDate(d)).join(', ');
    const newDates = request.listOfNewDates.map((d) => formatDate(d)).join(', ');
    return `${oldDates} → ${newDates}`;
  };

  return (
    <div className="date-change-requests-container">
      <div className="date-change-header">
        <button className="request-changes-btn" onClick={onRequestChanges}>
          <Plus size={16} />
          Request Changes
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="no-requests">
          <Clock size={24} />
          <p>No date change requests</p>
        </div>
      ) : (
        <div className="requests-table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Requested by</th>
                <th>Request</th>
                <th>Status</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="requester-cell">
                    <div className="requester-info">
                      <span className="requester-name">
                        {request.requestedBy.firstName} {request.requestedBy.lastName}
                      </span>
                      <span className="request-date">
                        {formatDate(request.dateAdded)}
                      </span>
                    </div>
                  </td>
                  <td className="request-cell">
                    <div className="request-details">
                      <span className="request-type">{request.typeOfRequest}</span>
                      <span className="request-dates">{formatRequestInfo(request)}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`request-status-badge ${getStatusClass(
                        request.requestStatus
                      )}`}
                    >
                      {getStatusDisplay(request.requestStatus)}
                    </span>
                  </td>
                  <td className="price-cell">
                    {request.pricePerNight > 0 ? (
                      <span className="price-info">
                        {formatCurrency(request.pricePerNight)}/night
                        {request.percentComparedToRegularRate !== 100 && (
                          <span className="price-diff">
                            ({request.percentComparedToRegularRate}% of regular)
                          </span>
                        )}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="action-cell">
                    {canRespond(request) ? (
                      <div className="action-buttons">
                        <button
                          className="action-btn approve-btn"
                          onClick={() => onApprove(request)}
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          className="action-btn reject-btn"
                          onClick={() => onReject(request)}
                        >
                          <X size={14} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="no-action">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DateChangeRequestsTable;
