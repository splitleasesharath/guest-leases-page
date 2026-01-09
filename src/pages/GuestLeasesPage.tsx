import React, { useState } from 'react';
import { Header } from '../components/shared/Header';
import { Footer } from '../components/shared/Footer';
import { LeaseCard } from '../components/LeaseCard';
import { CheckInCheckOutFlow } from '../components/CheckInCheckOutFlow';
import { BookingLease, BookingStay, DateChangeRequest, PhotoType } from '../types/lease.types';
import { mockLeases, mockCurrentUser } from '../data/mockData';
import './GuestLeasesPage.css';

export const GuestLeasesPage: React.FC = () => {
  const [leases] = useState<BookingLease[]>(mockLeases);
  const [expandedLeaseId, setExpandedLeaseId] = useState<string | null>(
    mockLeases[0]?.id || null
  );
  const [checkInOutModal, setCheckInOutModal] = useState<{
    isOpen: boolean;
    mode: 'checkin' | 'checkout';
    stay?: BookingStay;
    stays?: BookingStay[];
  }>({
    isOpen: false,
    mode: 'checkin',
  });

  const currentUser = mockCurrentUser;

  const handleToggleExpand = (leaseId: string) => {
    setExpandedLeaseId(expandedLeaseId === leaseId ? null : leaseId);
  };

  const handleCheckInOut = (stay: BookingStay, mode: 'checkin' | 'checkout') => {
    setCheckInOutModal({
      isOpen: true,
      mode,
      stay,
    });
  };

  const handleCloseCheckInOutModal = () => {
    setCheckInOutModal({
      isOpen: false,
      mode: 'checkin',
    });
  };

  const handleSendMessage = (message: string, stay: BookingStay) => {
    console.log('Sending message:', message, 'for stay:', stay.id);
    // TODO: Implement API call
    alert(`Message sent: "${message}"`);
    handleCloseCheckInOutModal();
  };

  const handleImOnMyWay = (stay: BookingStay) => {
    console.log("I'm on my way for stay:", stay.id);
    // TODO: Implement API call
    alert("Notification sent: You're on your way!");
  };

  const handleImHere = (stay: BookingStay) => {
    console.log("I'm here for stay:", stay.id);
    // TODO: Implement API call
    alert("Notification sent: You've arrived!");
  };

  const handleSubmitPhotos = (photos: File[], type: PhotoType, stay: BookingStay) => {
    console.log('Submitting photos:', photos.length, 'type:', type, 'for stay:', stay.id);
    // TODO: Implement API call
    alert(`${photos.length} ${type} photos submitted successfully!`);
    handleCloseCheckInOutModal();
  };

  const handleSubmitReview = (stay: BookingStay) => {
    console.log('Submit review for stay:', stay.id);
    // TODO: Navigate to review page or open review modal
    alert('Opening review form...');
  };

  const handleSeeReview = (stay: BookingStay) => {
    console.log('See review for stay:', stay.id);
    // TODO: Open review modal
    if (stay.reviewSubmittedByHost) {
      alert(
        `Host Review:\nRating: ${stay.reviewSubmittedByHost.rating}/5\nComment: ${stay.reviewSubmittedByHost.comment}`
      );
    }
  };

  const handleLeavingProperty = (stay: BookingStay) => {
    console.log('Leaving property for stay:', stay.id);
    // TODO: Implement API call
    alert('Thank you! Safe travels!');
    handleCloseCheckInOutModal();
  };

  const handleDateChangeApprove = (request: DateChangeRequest) => {
    console.log('Approve date change request:', request.id);
    // TODO: Implement API call
    alert('Date change request approved!');
  };

  const handleDateChangeReject = (request: DateChangeRequest) => {
    console.log('Reject date change request:', request.id);
    // TODO: Implement API call
    alert('Date change request rejected.');
  };

  const handleRequestDateChange = () => {
    console.log('Request date change');
    // TODO: Open date change request modal
    alert('Opening date change request form...');
  };

  const handleDownloadDocument = (docType: string, url?: string) => {
    console.log('Download document:', docType, url);
    if (url) {
      // TODO: Implement actual download
      alert(`Downloading ${docType}...`);
    } else {
      alert('Document not available.');
    }
  };

  const handleEmergencyAssistance = () => {
    console.log('Emergency assistance requested');
    // TODO: Open emergency modal
    alert('Emergency assistance - Please call 911 for immediate emergencies.');
  };

  const handleSeeReputation = () => {
    console.log('See reputation');
    // TODO: Navigate to reputation page
    alert('Opening reputation details...');
  };

  return (
    <div className="guest-leases-page">
      <Header
        userName={`${currentUser.firstName} ${currentUser.lastName}`}
        onExploreRentals={() => console.log('Explore rentals')}
        onNotifications={() => console.log('Notifications')}
        onProfile={() => console.log('Profile')}
      />

      <main className="page-content">
        <div className="page-container">
          <div className="page-header">
            <h1 className="page-title">
              {currentUser.firstName}'s Proposals and Leases
            </h1>
          </div>

          <div className="leases-list">
            {leases.length === 0 ? (
              <div className="empty-state">
                <h2>No Leases Found</h2>
                <p>You don't have any active leases yet. Start by exploring available rentals.</p>
                <button className="explore-btn">Explore Rentals</button>
              </div>
            ) : (
              leases.map((lease) => (
                <LeaseCard
                  key={lease.id}
                  lease={lease}
                  isExpanded={expandedLeaseId === lease.id}
                  currentUserId={currentUser.id}
                  onToggleExpand={() => handleToggleExpand(lease.id)}
                  onCheckInOut={handleCheckInOut}
                  onSubmitReview={handleSubmitReview}
                  onSeeReview={handleSeeReview}
                  onDateChangeApprove={handleDateChangeApprove}
                  onDateChangeReject={handleDateChangeReject}
                  onRequestDateChange={handleRequestDateChange}
                  onDownloadDocument={handleDownloadDocument}
                  onEmergencyAssistance={handleEmergencyAssistance}
                  onSeeReputation={handleSeeReputation}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />

      <CheckInCheckOutFlow
        isOpen={checkInOutModal.isOpen}
        mode={checkInOutModal.mode}
        stay={checkInOutModal.stay}
        onClose={handleCloseCheckInOutModal}
        onSendMessage={handleSendMessage}
        onImOnMyWay={handleImOnMyWay}
        onImHere={handleImHere}
        onSubmitPhotos={handleSubmitPhotos}
        onSubmitReview={handleSubmitReview}
        onLeavingProperty={handleLeavingProperty}
      />
    </div>
  );
};

export default GuestLeasesPage;
