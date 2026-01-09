GUEST LEASES PAGE \- DATA SCHEMA ANALYSIS  
Split Lease Bubble App

\================================================

1. PAGE OVERVIEW  
2. \================================================

Page Name: guest-leases  
Page Type of Content: Bookings \- Leases  
Page Title: Current User’s Name \- First’s Proposals and Leases  
Mobile Version: guest-leases-mobile  
Time Zone: User’s current timezone  
This page is a native app: Yes

PURPOSE: This page displays a repeating group of leases belonging to the guest user. Guests can view their leases, review documents, manage stays, request date changes, view payment information, and see their flexibility scores.

\================================================  
2\. PRIMARY DATA TYPES USED  
\================================================

1. BOOKINGS \- LEASES (Main Data Type)  
2. —----------------------------------------  
3. This is the primary data type for the page. Key fields include:

Identity & Participants:

- Guest (User) \- The guest user who has the lease  
- \- Host (Account \- Host) \- The host/landlord  
- \- Participants (List of Users) \- All users involved  
- \- Listing (Listing) \- The property being leased

Lease Details:

- Agreement Number (text) \- Unique agreement identifier  
- \- Lease Status (Status \- Leases option set) \- Current status of lease  
- \- Lease signed? (yes/no, default: no)  
- \- Reservation Period (date range)  
- \- Reservation Period : Start (date)  
- \- Reservation Period : End (date)  
- \- current week number (number) \- Calculated on page load  
- \- total week count (number)

Financial Information:

- Total Rent (number)  
- \- Total Compensation (number)  
- \- Total Amount of Payments (number)  
- \- Current Payment Number (number)  
- \- Next Payment (number)  
- \- Next Payment Due Date (date)  
- \- Paid to Date from Guest (number)  
- \- Paid to Date to Host (number)  
- \- Received To Date (number)  
- \- Dates for Payment (List of dates)  
- \- First Payment Date (date)

Payment Records:

- Payment Records Guest (List of Payment Records)  
- \- Payment Records SL-Host (List of Payment Records)  
- \- Payments from date changes (List of Payments from Date Changes)

Documents:

- Periodic Tenancy Agreement (file) \- PDF agreement  
- \- Supplemental Agreement (file)  
- \- Contracts (List of texts)  
- \- Form Credit Card Authorization (file)  
- \- Credit Card Authorization (text)  
- \- were documents generated (yes/no, default: no)

Related Data:

- List of Stays (List of Bookings \- Stays) \- Weekly stays within the lease  
- \- Date Change Requests (List of Date Change Requests)  
- \- List of Booked Dates (List of dates)  
- \- List of Booked Dates after Requests (List of dates)  
- \- Blocked nights (List of Nights)  
- \- Flexible nights (List of Nights)

Scores & Reputation:

- Reputation Score (GUEST) (number)  
- \- Reputation Score (HOST) (number)

Communication:

- Thread (\~Thread / Conversation) \- Chat thread  
- \- Check-in Code (text)

Throttling Controls:

- Throttling \- guest ability (yes/no, default: yes)  
- \- Throttling \- guest NOT show (yes/no, default: no)  
- \- Throttling \- host ability (yes/no, default: yes)  
- \- Throttling \- host NOT show (yes/no, default: no)

Related Objects:

- Proposal (Proposal) \- Original proposal  
- \- Cancellation Policy (ZAT-Features \- Cancellation Policy)  
- \- Host Payout Schedule (file)

B. BOOKINGS \- STAYS  
—----------------------------------------  
Represents individual weekly stays within a lease.

Key Fields:

- Lease (Bookings \- Leases) \- Parent lease  
- \- Guest (User)  
- \- Host (User)  
- \- listing (Listing)  
- \- Check In (night) (date)  
- \- Check-out day (date)  
- \- Last Night (night) (date)  
- \- Nights (List of Nights)  
- \- Dates \- List of dates in this stay (List of dates)  
- \- first index (number)  
- \- last index (number)  
- \- Stay Status (Stay \- Status option set)  
- \- Review Submitted by Guest (MAIN Review)  
- \- Review Submitted by Host (MAIN Review)  
- \- Photos \- Cleaning (ZFUT \- Proof of Cleaning)  
- \- Storage Photos (ZFUT \- Storage Photos)  
- \- Cleaning Comment (text)  
- \- Amendment Messages (List of texts)  
- \- Card Used \- Last 4 Digits (text)  
- \- Status \- Scheduled Payment  
- \- Type \- Scheduled Payment

C. DATE CHANGE REQUEST  
—----------------------------------------  
Handles requests to modify lease dates.

Key Fields:

- Lease (Bookings \- Leases) \- Associated lease  
- \- Requested by (User) \- Who made the request  
- \- Request receiver (User) \- Who needs to respond  
- \- request status (Date Change Request Status option set, default: Waiting for answer)  
- \- date added (date) \- When request was created  
- \- expiration date (date) \- When request expires  
- \- answer date (date) \- When answered  
- \- Answer to Request (text)  
- \- Message from Requester (text)  
- \- LIST of NEW Dates in the stay (List of dates)  
- \- LIST of OLD Dates in the stay (List of dates)  
- \- Stay Associated 1 (Bookings \- Stays)  
- \- Stay Associated 2 (Bookings \- Stays)  
- \- type of request (text)  
- \- Price/Rate of the night (number)  
- \- %compared to regular rate (number)

Scoring Fields:

- Decision Outcome Score (number)  
- \- On Time Score (number)  
- \- lead time of the request (number)  
- \- response time (minutes) (number)

Technical Fields:

- expiration\_workflowID (text)  
- \- notification\_expiration\_ (text)  
- \- visible to the guest? (yes/no, default: yes)

\================================================  
3\. OPTION SETS  
\================================================

1. STATUS \- LEASES  
2. Purpose: Tracks the lifecycle status of a lease  
3. Attributes: usual order (number), Display (text)  
4. Options:  
5. \- Not Started  
6. \- Active  
7. \- Started  
8. \- Completed/Finished  
9. \- Terminated

B. DATE CHANGE REQUEST STATUS  
Purpose: Tracks the status of date change requests  
Attributes: Display (text)  
Options:

- Waiting for answer  
- \- Accepted  
- \- Rejected  
- \- Soon to expire  
- \- Expired  
- \- Cancelled

C. STAY \- STATUS  
Purpose: Tracks the status of individual stays  
Attributes: usual order (number), Display (text)  
Options:

- Not Started  
- \- Started  
- \- In Progress  
- \- Completed

D. STATUS \- PROPOSAL  
Purpose: Tracks proposal status through negotiation  
Attributes: Displayed on screen (text), Guest Action 1 (text), Guest Action 2 (text), Host Action 1 (text), Host Action 2 (text), Usual Order (number), Display (text)  
Options:

- Proposal Submitted for  
- \- Proposal Submitted by  
- \- Host Review  
- \- Host Counteroffer Submitted  
- \- Proposal or Counteroffer  
- \- Lease Documents Sent  
- (and more…)

E. CATEGORIES OF STAYS REVIEWS  
Purpose: Categories for stay reviews

F. RENTAL TYPE  
Purpose: Type of rental property

G. STAY PERIODS (RESERVATION SPAN)  
Purpose: Define reservation period spans

\================================================  
4\. CUSTOM STATES  
\================================================

PAGE-LEVEL CUSTOM STATES (guest-leases):

- Focus picture (image, List) \- Likely for image gallery/viewer  
- \- option.sections\_host\_ (List) \- Section visibility control

ELEMENT-LEVEL CUSTOM STATES:

G: Lease card:

- Show details? (yes/no) \- Controls expanded/collapsed state of lease details

RG: Stays table:

- Show all stays? (yes/no) \- Controls whether all stays are shown

Date-change-requests (Reusable Element):

- Request to manage (Date Change Request) \- Currently selected request

\================================================  
5\. DATA SOURCES & SEARCHES  
\================================================

MAIN REPEATING GROUP (RG: Each Lease):  
Type of Content: Bookings \- Leases  
Data Source: Current User’s Leases:filtered

This displays all leases where the current user is the guest.

STAYS REPEATING GROUP:  
Type of Content: Bookings \- Stays  
Data Source: Parent group’s Bookings \- Leases’s List of Stays:count  
Shows all stays associated with the current lease.

DATE CHANGE REQUESTS:  
Accessed via: Parent group’s Bookings \- Leases’s Date Change Requests  
Filtered by request status for different displays.

PAYMENT RECORDS:  
Current cell’s Payment Records  
Displays payment history for the lease.

\================================================  
6\. KEY CONDITIONALS  
\================================================

1. G: Lease card Conditionals (4 conditions):  
1. When This Group is visible → Border style: None  
2.    (Visual styling when group appears)

2\. When This Group’s show details? Is yes → This element is visible (checked)  
   (Shows expanded details when toggled open)

3. When This Group’s show details? Is no → This element is visible (unchecked)  
4.    (Hides details when collapsed)

4\. When Current cell’s Bookings \- Leases is Current page’s Bookings \- Leases → This element is visible (checked)  
   (Highlights the current page’s lease if passed via URL)

B. Date Change Request Conditionals:

- Status-based visibility for Approve/Reject buttons  
- \- When request status is “Waiting for answer” AND Current User is not the Requested by user → Show approve/reject options

C. Review Button Conditionals:

- Based on Stay Status and whether reviews have been submitted

\================================================  
7\. WORKFLOWS  
\================================================

Total Workflows on Page: 37

WORKFLOW CATEGORIES:

1. Page is Loaded (2 workflows):  
1. “Page is loaded \- Displays Select Leases Current week number”  
2.    \- No condition (runs always)  
3.    \- Action: Make changes to Bookings \- Leases  
4.    \- Sets: current week number \= (Current date/time \- Reservation Period:Start):formatted as days / 7:ceiling  
5.    \- Purpose: Calculates which week of the lease the user is currently in

2\. “Page is loaded \- set request to answer”

- Only when: Get request from page URL is not empty  
-    \- Steps:  
-      A. Run JavaScript  
-      B. Display data in date-change-requests reusable  
-      C. Set state request to manage of date-change-requests  
-      D. Show date-change-requests popup  
-    \- Purpose: Opens date change request popup when navigated with URL parameter

B. Do When Condition (3 workflows):

1. “Do when Current User is logged out”  
2.    \- Redirects logged-out users

2\. “Do when user device has width \< 900”

- Responsive design handling  
3. “Just once condition” (date-change-requests related)  
4.    \- Initialization logic

C. Show Elements (4 workflows):

- Controlling visibility of popups and overlays

D. Navigation (3 workflows):

- Page navigation logic

E. Custom Events (1 workflow):

- Reusable event triggers

F. Schedule Selector (2 workflows):

- Date/time selection handling

G. Button Click Handlers (Multiple):

“T: Approve/Remove actions is clicked \- ACCEPT/REJECT request”

- Element: T: Approve / Reject button  
- \- Only when: Parent group’s Date Change Request’s request status is “Waiting for answer” AND Current User is not Parent group’s Date Change Request’s Requested by  
- \- Steps:  
-   A. Run JavaScript  
-   B. Add pause  
-   C. Set state request to manage of date-change-requests  
-   D. Show date-change-requests  
- \- Purpose: Handle approval/rejection of date changes

“G: Header of each Lease card is clicked” (2 versions):

- Toggle show details? State for expand/collapse

“G: submit a review is clicked”

- Opens review submission interface

“Text Show All Stays is clicked”

- Toggle show all stays? State

“T: Flexibility Score is clicked”

- Display flexibility score details

“T: See reputation is clicked”

- Display reputation details

\================================================  
8\. REUSABLE ELEMENTS  
\================================================

The page uses several reusable elements (popups/overlays):

1. Emergency-report A \- Emergency reporting  
2. 2\. Header A \- Main navigation header  
3. 3\. Check in \- Check out \- Check-in/out flow  
4. 4\. Sign up & Login A \- Authentication  
5. 5\. Informational text \- Display messages  
6. 6\. Host\_review guest A \- Host reviews guest  
7. 7\. Date-change-requests \- Date change request management  
8. 8\. Review for Stays \- Review submission interface

\================================================

9. KEY DATA RELATIONSHIPS  
10. \================================================

User → Bookings \- Leases (via User’s Leases field)  
     ↓  
Bookings \- Leases → Bookings \- Stays (via List of Stays)  
                  → Date Change Requests (via Date Change Requests field)  
                  → Payment Records (via Payment Records Guest)  
                  → Listing (via Listing field)  
                  → Account \- Host (via Host field)  
                  → Proposal (via Proposal field)  
     ↓  
Bookings \- Stays → MAIN Review (via Review Submitted by Guest/Host)  
                 → Stay Status option set  
     ↓  
Date Change Request → Date Change Request Status option set  
                    → Bookings \- Stays (via Stay Associated fields)

\================================================  
10\. FLEXIBILITY SCORE & REPUTATION  
\================================================

The page displays and calculates user reputation scores based on:

Bookings \- Leases fields:

- Reputation Score (GUEST) \- Guest’s score on this lease  
- \- Reputation Score (HOST) \- Host’s score on this lease

Date Change Request scoring fields:

- Decision Outcome Score \- Score based on decision  
- \- On Time Score \- Score based on response time  
- \- lead time of the request \- How far in advance request was made  
- \- response time (minutes) \- How quickly user responded

The Flexibility Score shown on the page appears to aggregate these metrics to give guests feedback on their responsiveness and cooperation with date change requests.

\================================================

11. DOCUMENT MANAGEMENT  
12. \================================================

The page provides access to multiple lease documents:

Buttons/Links:

- Periodic Tenancy Agreement (PDF) \- Main lease agreement  
- \- Supplemental Terms (PDF) \- Additional terms  
- \- View/Change Dates \- Date modification interface  
- \- Credit Card Auth Form \- Authorization form  
- \- Payment Summary \- Payment overview  
- \- Reservation Details \- Booking details

Documents stored in Bookings \- Leases:

- Periodic Tenancy Agreement (file)  
- \- Supplemental Agreement (file)  
- \- Form Credit Card Authorization (file)  
- \- Host Payout Schedule (file)

\================================================  
12\. STAY STATUS LIFECYCLE  
\================================================

Individual stays progress through these statuses:

Not Started → Started → In Progress → Completed

The page shows:

- Week \# (position in lease)  
- \- Period (Check In \- Check Out dates)  
- \- Status (current Stay Status)  
- \- Actions: See Review, Review, Leaving Property, Request Changes

\================================================

13. DATE CHANGE REQUEST FLOW  
14. \================================================

Request Status Lifecycle:  
Waiting for answer → Accepted/Rejected/Expired/Cancelled

When a date change is requested:

1. Request created with status “Waiting for answer”  
2. 2\. Receiver gets notification  
3. 3\. Receiver can Approve or Reject  
4. 4\. Request may expire if not answered  
5. 5\. Status updates accordingly  
6. 6\. Scores are calculated based on response

Visibility controlled by “visible to the guest?” field.

\================================================  
SUMMARY  
\================================================

The guest-leases page is a comprehensive lease management interface that:

1. Displays all leases for the current user in a repeating group  
2. 2\. Shows detailed information for each lease including dates, payments, and documents  
3. 3\. Lists all stays within each lease with their statuses  
4. 4\. Provides date change request functionality with approval workflow  
5. 5\. Tracks and displays flexibility/reputation scores  
6. 6\. Offers document access and review capabilities  
7. 7\. Uses custom states for UI state management (expand/collapse, show all)  
8. 8\. Employs conditionals for dynamic content display based on data status  
9. 9\. Integrates with multiple reusable elements for complex interactions

Key data types: Bookings \- Leases, Bookings \- Stays, Date Change Request  
Key option sets: Status \- Leases, Date Change Request Status, Stay \- Status  
Main data source: Current User’s Leases:filtered