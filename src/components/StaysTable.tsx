import React from 'react';
import { Eye, Edit, LogOut, Car, Home } from 'lucide-react';
import { BookingStay } from '../types/lease.types';
import { formatDate } from '../utils/formatters';
import './StaysTable.css';

interface StaysTableProps {
  stays: BookingStay[];
  showAll: boolean;
  onToggleShowAll: () => void;
  onSeeReview: (stay: BookingStay) => void;
  onSubmitReview: (stay: BookingStay) => void;
  onLeavingProperty: (stay: BookingStay) => void;
  onCheckInOut: (stay: BookingStay, mode: 'checkin' | 'checkout') => void;
}

export const StaysTable: React.FC<StaysTableProps> = ({
  stays,
  showAll,
  onToggleShowAll,
  onSeeReview,
  onSubmitReview,
  onLeavingProperty,
  onCheckInOut,
}) => {
  const displayedStays = showAll ? stays : stays.slice(0, 4);

  const getStatusDisplay = (status: string): string => {
    const statusMap: Record<string, string> = {
      not_started: 'Not Started',
      started: 'Started',
      in_progress: 'In Progress',
      completed: 'Completed',
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status: string): string => {
    const classMap: Record<string, string> = {
      not_started: 'stay-status-not-started',
      started: 'stay-status-started',
      in_progress: 'stay-status-in-progress',
      completed: 'stay-status-completed',
    };
    return classMap[status] || '';
  };

  const canSeeReview = (stay: BookingStay): boolean => {
    return !!stay.reviewSubmittedByHost;
  };

  const canSubmitReview = (stay: BookingStay): boolean => {
    return (
      (stay.stayStatus === 'completed' || stay.stayStatus === 'in_progress') &&
      !stay.reviewSubmittedByGuest
    );
  };

  const canCheckIn = (stay: BookingStay): boolean => {
    return stay.stayStatus === 'not_started' || stay.stayStatus === 'started';
  };

  const canCheckOut = (stay: BookingStay): boolean => {
    return stay.stayStatus === 'in_progress';
  };

  if (!stays || stays.length === 0) {
    return (
      <div className="stays-table-empty">
        <p>No stays available.</p>
      </div>
    );
  }

  return (
    <div className="stays-table-container">
      <div className="stays-table-wrapper">
        <table className="stays-table">
          <thead>
            <tr>
              <th>Week #</th>
              <th>Period</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedStays.map((stay) => (
              <tr key={stay.id}>
                <td className="week-cell">Week {stay.weekNumber}</td>
                <td className="period-cell">
                  {formatDate(stay.checkInDate)} - {formatDate(stay.checkOutDate)}
                </td>
                <td>
                  <span className={`stay-status-badge ${getStatusClass(stay.stayStatus)}`}>
                    {getStatusDisplay(stay.stayStatus)}
                  </span>
                </td>
                <td className="actions-cell">
                  <div className="stay-actions">
                    {canSeeReview(stay) && (
                      <button
                        className="stay-action-btn see-review"
                        onClick={() => onSeeReview(stay)}
                      >
                        <Eye size={14} />
                        See Review
                      </button>
                    )}
                    {canSubmitReview(stay) && (
                      <button
                        className="stay-action-btn submit-review"
                        onClick={() => onSubmitReview(stay)}
                      >
                        <Edit size={14} />
                        Review
                      </button>
                    )}
                    {canCheckIn(stay) && (
                      <>
                        <button
                          className="stay-action-btn checkin"
                          onClick={() => onCheckInOut(stay, 'checkin')}
                        >
                          <Car size={14} />
                          I'm on my way
                        </button>
                        <button
                          className="stay-action-btn checkin"
                          onClick={() => onCheckInOut(stay, 'checkin')}
                        >
                          <Home size={14} />
                          I'm here!
                        </button>
                      </>
                    )}
                    {canCheckOut(stay) && (
                      <button
                        className="stay-action-btn leaving"
                        onClick={() => onLeavingProperty(stay)}
                      >
                        <LogOut size={14} />
                        Leaving Property
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {stays.length > 4 && (
        <button className="show-all-btn" onClick={onToggleShowAll}>
          {showAll ? 'Show Less' : `Show All Stays (${stays.length})`}
        </button>
      )}
    </div>
  );
};

export default StaysTable;
