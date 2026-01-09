// Option Set Types
export type LeaseStatus = 'not_started' | 'active' | 'started' | 'completed' | 'terminated';

export type DateChangeRequestStatus =
  | 'waiting_for_answer'
  | 'accepted'
  | 'rejected'
  | 'soon_to_expire'
  | 'expired'
  | 'cancelled';

export type StayStatus = 'not_started' | 'started' | 'in_progress' | 'completed';

export type AlertType = 'error' | 'information' | 'warning' | 'success';

export type PhotoType = 'storage' | 'cleaning';

// Core Data Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
}

export interface Host {
  id: string;
  user: User;
  companyName?: string;
}

export interface Listing {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  images: string[];
  rentalType: string;
}

export interface PaymentRecord {
  id: string;
  scheduledDate: Date;
  actualDateOfPayment?: Date;
  rent: number;
  maintenanceFee: number;
  damageDeposit: number;
  totalPaidToHost: number;
  bankTransactionNumber?: string;
  receiptUrl?: string;
}

export interface ProofOfCleaning {
  id: string;
  associatedStay: string;
  cleaningPhotos: string[];
  createdAt: Date;
}

export interface StoragePhotos {
  id: string;
  associatedStay: string;
  storagePhotos: string[];
  createdAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  categories?: string[];
}

export interface BookingStay {
  id: string;
  leaseId: string;
  guest: User;
  host: User;
  listing: Listing;
  weekNumber: number;
  checkInDate: Date;
  checkOutDate: Date;
  lastNightDate: Date;
  nights: Date[];
  datesList: Date[];
  firstIndex: number;
  lastIndex: number;
  stayStatus: StayStatus;
  reviewSubmittedByGuest?: Review;
  reviewSubmittedByHost?: Review;
  cleaningPhotos?: ProofOfCleaning;
  storagePhotos?: StoragePhotos;
  cleaningComment?: string;
  amendmentMessages?: string[];
  cardUsedLast4Digits?: string;
}

export interface DateChangeRequest {
  id: string;
  leaseId: string;
  requestedBy: User;
  requestReceiver: User;
  requestStatus: DateChangeRequestStatus;
  dateAdded: Date;
  expirationDate: Date;
  answerDate?: Date;
  answerToRequest?: string;
  messageFromRequester?: string;
  listOfNewDates: Date[];
  listOfOldDates: Date[];
  stayAssociated1?: BookingStay;
  stayAssociated2?: BookingStay;
  typeOfRequest: string;
  pricePerNight: number;
  percentComparedToRegularRate: number;
  decisionOutcomeScore?: number;
  onTimeScore?: number;
  leadTimeOfRequest?: number;
  responseTimeMinutes?: number;
  visibleToGuest: boolean;
}

export interface BookingLease {
  id: string;
  guest: User;
  host: Host;
  listing: Listing;
  agreementNumber: string;
  leaseStatus: LeaseStatus;
  leaseSigned: boolean;
  reservationPeriodStart: Date;
  reservationPeriodEnd: Date;
  currentWeekNumber: number;
  totalWeekCount: number;

  // Financial Information
  totalRent: number;
  totalCompensation: number;
  totalAmountOfPayments: number;
  currentPaymentNumber: number;
  nextPayment: number;
  nextPaymentDueDate: Date;
  paidToDateFromGuest: number;
  paidToDateToHost: number;
  receivedToDate: number;
  datesForPayment: Date[];
  firstPaymentDate: Date;

  // Payment Records
  paymentRecordsGuest: PaymentRecord[];
  paymentRecordsSLHost: PaymentRecord[];

  // Documents
  periodicTenancyAgreement?: string;
  supplementalAgreement?: string;
  creditCardAuthorizationForm?: string;
  creditCardAuthorization?: string;
  hostPayoutSchedule?: string;
  documentsGenerated: boolean;

  // Related Data
  listOfStays: BookingStay[];
  dateChangeRequests: DateChangeRequest[];
  listOfBookedDates: Date[];

  // Scores & Reputation
  reputationScoreGuest: number;
  reputationScoreHost: number;

  // Communication
  threadId?: string;
  checkInCode?: string;

  // Throttling Controls
  throttlingGuestAbility: boolean;
  throttlingGuestNotShow: boolean;
  throttlingHostAbility: boolean;
  throttlingHostNotShow: boolean;
}

// UI State Types
export interface LeaseCardState {
  showDetails: boolean;
}

export interface StaysTableState {
  showAllStays: boolean;
}

export interface CheckInCheckOutFlowState {
  section: 'checkin' | 'checkout';
  staySent?: BookingStay;
  messageSent: boolean;
  initialText: string;
}

export interface DateChangeRequestsState {
  requestToManage?: DateChangeRequest;
}

// Alert/Toast Types
export interface AlertConfig {
  title: string;
  content?: string;
  timeMs?: number;
  alertType?: AlertType;
  showOnLive?: boolean;
}

// Props Types for Components
export interface LeaseCardProps {
  lease: BookingLease;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onCheckInOut: (stay: BookingStay, mode: 'checkin' | 'checkout') => void;
  onSubmitReview: (stay: BookingStay) => void;
  onSeeReview: (stay: BookingStay) => void;
  onDateChangeRequest: (request: DateChangeRequest) => void;
  onEmergencyAssistance: () => void;
}

export interface PaymentRecordsProps {
  records: PaymentRecord[];
  onDownloadReceipt: (record: PaymentRecord) => void;
}

export interface StaysTableProps {
  stays: BookingStay[];
  showAll: boolean;
  onToggleShowAll: () => void;
  onSeeReview: (stay: BookingStay) => void;
  onSubmitReview: (stay: BookingStay) => void;
  onLeavingProperty: (stay: BookingStay) => void;
  onCheckInOut: (stay: BookingStay, mode: 'checkin' | 'checkout') => void;
}

export interface DateChangeRequestsTableProps {
  requests: DateChangeRequest[];
  currentUserId: string;
  onApprove: (request: DateChangeRequest) => void;
  onReject: (request: DateChangeRequest) => void;
  onRequestChanges: () => void;
}

export interface FlexibilityScoreProps {
  lease: BookingLease;
  dateChangeRequests: DateChangeRequest[];
  currentUserId: string;
  onSeeReputation: () => void;
}

export interface CheckInCheckOutFlowProps {
  isOpen: boolean;
  mode: 'checkin' | 'checkout';
  stay?: BookingStay;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onImOnMyWay: () => void;
  onImHere: () => void;
  onSubmitCleaningPhotos: (photos: File[], type: PhotoType) => void;
  onSubmitReview: () => void;
  onLeavingProperty: () => void;
}
