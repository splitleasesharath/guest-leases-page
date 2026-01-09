import React from 'react';
import { TrendingUp, Calendar, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { BookingLease, DateChangeRequest } from '../types/lease.types';
import { formatCurrency } from '../utils/formatters';
import './FlexibilityScore.css';

interface FlexibilityScoreProps {
  lease: BookingLease;
  dateChangeRequests: DateChangeRequest[];
  currentUserId: string;
  onSeeReputation: () => void;
}

export const FlexibilityScore: React.FC<FlexibilityScoreProps> = ({
  lease,
  dateChangeRequests,
  currentUserId,
  onSeeReputation,
}) => {
  // Calculate metrics
  const totalNights = lease.listOfBookedDates.length;
  const nightsUsed = lease.listOfStays.filter(
    (stay) => stay.stayStatus === 'completed' || stay.stayStatus === 'in_progress'
  ).length * 7; // Approximate 7 nights per stay
  const nightsRemaining = Math.max(0, totalNights - nightsUsed);

  const requestsByGuest = dateChangeRequests.filter(
    (req) => req.requestedBy.id === currentUserId
  ).length;
  const requestsByHost = dateChangeRequests.filter(
    (req) => req.requestedBy.id !== currentUserId
  ).length;
  const pendingRequests = dateChangeRequests.filter(
    (req) => req.requestStatus === 'waiting_for_answer'
  ).length;

  // Calculate extra fees/found money (simplified)
  const extraFees = dateChangeRequests
    .filter((req) => req.requestStatus === 'accepted')
    .reduce((sum, req) => sum + (req.pricePerNight || 0), 0);

  const flexibilityScore = lease.reputationScoreGuest;

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#EF4444';
    return '#6B7280';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="flexibility-score-container">
      <div className="score-header">
        <h4 className="score-title">
          <TrendingUp size={18} />
          Your Flexibility Score
        </h4>
        <button className="see-reputation-btn" onClick={onSeeReputation}>
          See your reputation
          <ExternalLink size={14} />
        </button>
      </div>

      <div className="score-main">
        <div className="score-circle">
          <svg viewBox="0 0 100 100" className="score-svg">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getScoreColor(flexibilityScore)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(flexibilityScore / 100) * 283} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="score-value">
            <span className="score-number">{flexibilityScore}</span>
            <span className="score-label">{getScoreLabel(flexibilityScore)}</span>
          </div>
        </div>

        <div className="score-stats">
          <div className="stat-group">
            <div className="stat-item">
              <Calendar size={16} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{nightsUsed}</span>
                <span className="stat-label">Nights Used</span>
              </div>
            </div>
            <div className="stat-item">
              <Calendar size={16} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{nightsRemaining}</span>
                <span className="stat-label">Nights Remaining</span>
              </div>
            </div>
          </div>

          <div className="stat-group">
            <div className="stat-item">
              <Clock size={16} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{totalNights}</span>
                <span className="stat-label">Original Nights</span>
              </div>
            </div>
            <div className="stat-item">
              <Clock size={16} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{totalNights}</span>
                <span className="stat-label">New Proposed Nights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="requests-summary">
        <div className="summary-row">
          <span className="summary-label">Requests done by you:</span>
          <span className="summary-value">{requestsByGuest}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Requests done by host:</span>
          <span className="summary-value">{requestsByHost}</span>
        </div>
        <div className="summary-row pending">
          <span className="summary-label">Pending Requests:</span>
          <span className="summary-value">{pendingRequests}</span>
        </div>
      </div>

      {extraFees > 0 && (
        <div className="found-money">
          <DollarSign size={18} />
          <div className="found-money-content">
            <span className="found-money-label">Extra Fees or "Found Money"</span>
            <span className="found-money-value">{formatCurrency(extraFees)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlexibilityScore;
