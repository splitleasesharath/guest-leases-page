import React, { useState } from 'react';
import {
  X,
  Car,
  Home,
  Trash2,
  Package,
  Star,
  LogOut,
  Send,
  Upload,
  ChevronDown,
} from 'lucide-react';
import { BookingStay, PhotoType } from '../types/lease.types';
import { formatDate } from '../utils/formatters';
import './CheckInCheckOutFlow.css';

interface CheckInCheckOutFlowProps {
  isOpen: boolean;
  mode: 'checkin' | 'checkout';
  stay?: BookingStay;
  stays?: BookingStay[];
  onClose: () => void;
  onSendMessage: (message: string, stay: BookingStay) => void;
  onImOnMyWay: (stay: BookingStay) => void;
  onImHere: (stay: BookingStay) => void;
  onSubmitPhotos: (photos: File[], type: PhotoType, stay: BookingStay) => void;
  onSubmitReview: (stay: BookingStay) => void;
  onLeavingProperty: (stay: BookingStay) => void;
}

export const CheckInCheckOutFlow: React.FC<CheckInCheckOutFlowProps> = ({
  isOpen,
  mode,
  stay,
  stays = [],
  onClose,
  onSendMessage,
  onImOnMyWay,
  onImHere,
  onSubmitPhotos,
  onSubmitReview,
  onLeavingProperty,
}) => {
  const [selectedStay, setSelectedStay] = useState<BookingStay | undefined>(stay);
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoType, setPhotoType] = useState<PhotoType>('cleaning');
  const [showStaySelector, setShowStaySelector] = useState(false);

  React.useEffect(() => {
    if (stay) {
      setSelectedStay(stay);
    }
  }, [stay]);

  React.useEffect(() => {
    if (mode === 'checkin') {
      setMessage("Hi! I'm on my way to the property.");
    } else {
      setMessage("Hi! I'm checking out now. Thank you for hosting me!");
    }
  }, [mode]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (selectedStay && message.trim()) {
      onSendMessage(message, selectedStay);
      setMessage('');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmitPhotos = () => {
    if (selectedStay && photos.length > 0) {
      onSubmitPhotos(photos, photoType, selectedStay);
      setPhotos([]);
    }
  };

  const availableStays = stays.length > 0 ? stays : (selectedStay ? [selectedStay] : []);

  return (
    <div className="checkin-checkout-overlay" onClick={onClose}>
      <div className="checkin-checkout-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Header with Animation */}
        <div className="modal-header">
          <div className="paper-airplane-animation">
            <div className="airplane">
              <Send size={48} />
            </div>
          </div>
          <h2 className="modal-title">
            {mode === 'checkin' ? 'Check-In Flow' : 'Check-Out Flow'}
          </h2>
        </div>

        {/* Stay Selector */}
        {availableStays.length > 1 && (
          <div className="stay-selector">
            <label className="selector-label">
              {mode === 'checkin' ? 'Check-In Day' : 'Check-Out Day'}
            </label>
            <div className="selector-dropdown" onClick={() => setShowStaySelector(!showStaySelector)}>
              <span>
                {selectedStay
                  ? `Week ${selectedStay.weekNumber} - ${formatDate(
                      mode === 'checkin' ? selectedStay.checkInDate : selectedStay.checkOutDate
                    )}`
                  : 'Select a stay'}
              </span>
              <ChevronDown size={16} />
            </div>
            {showStaySelector && (
              <div className="selector-options">
                {availableStays.map((s) => (
                  <div
                    key={s.id}
                    className={`selector-option ${selectedStay?.id === s.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedStay(s);
                      setShowStaySelector(false);
                    }}
                  >
                    Week {s.weekNumber} - {formatDate(mode === 'checkin' ? s.checkInDate : s.checkOutDate)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Check-In Section */}
        {mode === 'checkin' && (
          <div className="flow-section">
            <div className="quick-actions">
              <button
                className="quick-action-btn on-my-way"
                onClick={() => selectedStay && onImOnMyWay(selectedStay)}
                disabled={!selectedStay}
              >
                <Car size={20} />
                I'm on my way
              </button>
              <button
                className="quick-action-btn im-here"
                onClick={() => selectedStay && onImHere(selectedStay)}
                disabled={!selectedStay}
              >
                <Home size={20} />
                I'm here!
              </button>
            </div>

            <div className="message-section">
              <label className="message-label">Send a message to your host</label>
              <textarea
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
              />
              <button
                className="send-message-btn"
                onClick={handleSendMessage}
                disabled={!selectedStay || !message.trim()}
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        )}

        {/* Check-Out Section */}
        {mode === 'checkout' && (
          <div className="flow-section">
            <div className="quick-actions checkout-actions">
              <button
                className="quick-action-btn cleaning"
                onClick={() => setPhotoType('cleaning')}
              >
                <Trash2 size={20} />
                Submit cleaning photos
              </button>
              <button
                className="quick-action-btn storage"
                onClick={() => setPhotoType('storage')}
              >
                <Package size={20} />
                I'm leaving belongings at the...
              </button>
              <button
                className="quick-action-btn review"
                onClick={() => selectedStay && onSubmitReview(selectedStay)}
                disabled={!selectedStay}
              >
                <Star size={20} />
                Submit a Review
              </button>
              <button
                className="quick-action-btn leaving"
                onClick={() => selectedStay && onLeavingProperty(selectedStay)}
                disabled={!selectedStay}
              >
                <LogOut size={20} />
                I'm leaving the property
              </button>
            </div>

            {/* Photo Upload Section */}
            <div className="photo-upload-section">
              <label className="upload-label">
                {photoType === 'cleaning' ? 'Upload Cleaning Photos' : 'Upload Storage Photos'}
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="photo-upload"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="upload-input"
                />
                <label htmlFor="photo-upload" className="upload-btn">
                  <Upload size={24} />
                  <span>Click to upload photos</span>
                </label>
              </div>
              {photos.length > 0 && (
                <div className="uploaded-photos">
                  <p>{photos.length} photo(s) selected</p>
                  <button className="submit-photos-btn" onClick={handleSubmitPhotos}>
                    Submit Photos
                  </button>
                </div>
              )}
            </div>

            <div className="message-section">
              <label className="message-label">Send a message to your host</label>
              <textarea
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
              />
              <button
                className="send-message-btn"
                onClick={handleSendMessage}
                disabled={!selectedStay || !message.trim()}
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInCheckOutFlow;
