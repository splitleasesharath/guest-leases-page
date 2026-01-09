import React from 'react';
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { BookingLease, BookingStay, DateChangeRequest } from '../types/lease.types';
import { PaymentRecordsTable } from './PaymentRecordsTable';
import { StaysTable } from './StaysTable';
import { DateChangeRequestsTable } from './DateChangeRequestsTable';
import { FlexibilityScore } from './FlexibilityScore';
import { formatDate, formatCurrency } from '../utils/formatters';
import './LeaseCard.css';

interface LeaseCardProps {
  lease: BookingLease;
  isExpanded: boolean;
  currentUserId: string;
  onToggleExpand: () => void;
  onCheckInOut: (stay: BookingStay, mode: 'checkin' | 'checkout') => void;
  onSubmitReview: (stay: BookingStay) => void;
  onSeeReview: (stay: BookingStay) => void;
  onDateChangeApprove: (request: DateChangeRequest) => void;
  onDateChangeReject: (request: DateChangeRequest) => void;
  onRequestDateChange: () => void;
  onDownloadDocument: (docType: string, url?: string) => void;
  onEmergencyAssistance: () => void;
  onSeeReputation: () => void;
}

export const LeaseCard: React.FC<LeaseCardProps> = ({
  lease,
  isExpanded,
  currentUserId,
  onToggleExpand,
  onCheckInOut,
  onSubmitReview,
  onSeeReview,
  onDateChangeApprove,
  onDateChangeReject,
  onRequestDateChange,
  onDownloadDocument,
  onEmergencyAssistance,
  onSeeReputation,
}) => {
  const [showAllStays, setShowAllStays] = React.useState(false);

  const getStatusDisplay = (status: string): string => {
    const statusMap: Record<string, string> = {
      not_started: 'Not Started',
      active: 'Active',
      started: 'Started',
      completed: 'Completed',
      terminated: 'Terminated',
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status: string): string => {
    const classMap: Record<string, string> = {
      not_started: 'status-not-started',
      active: 'status-active',
      started: 'status-started',
      completed: 'status-completed',
      terminated: 'status-terminated',
    };
    return classMap[status] || '';
  };

  return (
    <div className={`lease-card ${isExpanded ? 'expanded' : ''}`}>
      {/* Header - Always Visible */}
      <div className="lease-card-header" onClick={onToggleExpand}>
        <div className="lease-header-left">
          <div className="listing-image">
            {lease.listing.images[0] ? (
              <img src={lease.listing.images[0]} alt={lease.listing.title} />
            ) : (
              <div className="image-placeholder">
                <MapPin size={24} />
              </div>
            )}
          </div>
          <div className="lease-header-info">
            <h3 className="listing-title">{lease.listing.title}</h3>
            <p className="listing-address">
              {lease.listing.address}, {lease.listing.city}, {lease.listing.state}
            </p>
            <div className="lease-dates">
              <Calendar size={14} />
              <span>
                {formatDate(lease.reservationPeriodStart)} - {formatDate(lease.reservationPeriodEnd)}
              </span>
            </div>
          </div>
        </div>

        <div className="lease-header-right">
          <div className={`lease-status ${getStatusClass(lease.leaseStatus)}`}>
            {getStatusDisplay(lease.leaseStatus)}
          </div>
          <div className="lease-week-info">
            <span className="week-label">Week</span>
            <span className="week-number">{lease.currentWeekNumber}</span>
            <span className="week-total">of {lease.totalWeekCount}</span>
          </div>
          <button className="expand-toggle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="lease-card-content">
          {/* Host Contact Information */}
          <div className="host-contact-section">
            <h4 className="section-title">Host Contact Information</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <a href={`tel:${lease.host.user.phoneNumber}`}>{lease.host.user.phoneNumber}</a>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <a href={`mailto:${lease.host.user.email}`}>{lease.host.user.email}</a>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{lease.listing.address}</span>
              </div>
            </div>
          </div>

          {/* PT Agreement Number */}
          <div className="agreement-section">
            <h4 className="agreement-number">PT Agreement # {lease.agreementNumber}</h4>
          </div>

          {/* Payment Records */}
          <div className="payment-records-section">
            <h4 className="section-title">Payment Records</h4>
            <PaymentRecordsTable
              records={lease.paymentRecordsGuest}
              onDownloadReceipt={(record) => onDownloadDocument('receipt', record.receiptUrl)}
            />
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="action-btn primary"
              onClick={() => onDownloadDocument('pta', lease.periodicTenancyAgreement)}
            >
              <FileText size={16} />
              Periodic Tenancy Agreement (PDF)
            </button>
            <button
              className="action-btn primary"
              onClick={() => onDownloadDocument('supplemental', lease.supplementalAgreement)}
            >
              <FileText size={16} />
              Supplemental Terms (PDF)
            </button>
            <button className="action-btn outline" onClick={onRequestDateChange}>
              <Calendar size={16} />
              View/Change Dates
            </button>
            <button
              className="action-btn primary"
              onClick={() => onDownloadDocument('credit-card', lease.creditCardAuthorizationForm)}
            >
              <CreditCard size={16} />
              Credit Card Auth Form
            </button>
            <button className="action-btn outline">
              <FileText size={16} />
              Payment Summary
            </button>
            <button className="action-btn outline">
              <FileText size={16} />
              Reservation Details
            </button>
          </div>

          {/* Stays Table */}
          <div className="stays-section">
            <h4 className="section-title">Your Stays</h4>
            <StaysTable
              stays={lease.listOfStays}
              showAll={showAllStays}
              onToggleShowAll={() => setShowAllStays(!showAllStays)}
              onSeeReview={onSeeReview}
              onSubmitReview={onSubmitReview}
              onLeavingProperty={(stay) => onCheckInOut(stay, 'checkout')}
              onCheckInOut={onCheckInOut}
            />
          </div>

          {/* Date Change Requests */}
          <div className="date-change-section">
            <h4 className="section-title">Date Change Requests</h4>
            <DateChangeRequestsTable
              requests={lease.dateChangeRequests}
              currentUserId={currentUserId}
              onApprove={onDateChangeApprove}
              onReject={onDateChangeReject}
              onRequestChanges={onRequestDateChange}
            />
          </div>

          {/* Flexibility Score */}
          <div className="flexibility-section">
            <FlexibilityScore
              lease={lease}
              dateChangeRequests={lease.dateChangeRequests}
              currentUserId={currentUserId}
              onSeeReputation={onSeeReputation}
            />
          </div>

          {/* Emergency Assistance */}
          <div className="emergency-section">
            <button className="emergency-btn" onClick={onEmergencyAssistance}>
              <AlertTriangle size={20} />
              Emergency Assistance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaseCard;
