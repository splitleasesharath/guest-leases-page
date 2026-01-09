GUEST LEASES PAGE \- COMPREHENSIVE WORKFLOW ANALYSIS

\================================================================================  
OVERVIEW  
\================================================================================

The guest-leases page is a central hub for guests to manage their leases, including viewing lease details, reviewing documents, managing stays, handling check-in/check-out processes, submitting reviews, and requesting date changes. The page contains 37 workflows organized into several categories.

WORKFLOW CATEGORIES:

- Uncategorized: 22 workflows  
- \- Custom Events: 1 workflow  
- \- Do When Condition: 3 workflows  
- \- Navigation: 3 workflows  
- \- Page is Loaded: 2 workflows  
- \- Schedule Selector: 2 workflows  
- \- Show Elements: 4 workflows

\================================================================================  
KEY DATA TYPES REFERENCED  
\================================================================================

Based on workflow analysis, the following data types are managed by this page:

1. BOOKINGS \- LEASES: Primary data type for lease information  
2.    \- Fields: current week number, Reservation Period: Start, List of Stays  
3.      
4. 2\. BOOKINGS \- STAYS: Records of individual stays within a lease  
5.    \- Fields: Review Submitted by Host, photos-type, Storage Photos, Cleaning Photos  
6.      
7. 3\. ZFUT \- Storage Photos: Storage photo records  
8.    \- Fields: Associated Stay, Storage Photos (list)  
9.      
10. 4\. ZFUT \- Proof of Cleaning: Cleaning proof records  
11.    \- Fields: Associated Stay, Cleaning Photos (list)

5\. DATE CHANGE REQUESTS: Requests for modifying reservation dates

- Fields: request status, Requested by

\================================================================================  
CUSTOM STATES IDENTIFIED  
\================================================================================

The page uses several custom states to manage UI and workflow logic:

1. “Review for Stays NEW” element:  
2.    \- section: Controls which section is displayed (values: “reviewslisted”)  
3.    \- Step…: Tracks review status (“REVIEW NOT CREATED YET”, “REVIEW CREATED”)

2\. “P: Check in \- Check out Flow” element:

- Section: Controls flow section (values: “checkout”, “checkin”)  
-    \- stay sent: Stores the current Bookings \- Stays record  
-    \- message sent?: Tracks if message has been sent

3\. “G: sending message section CHECKIN FLOW” element:

- Initial text: Controls preset message text  
4. “Date-change-requests” element:  
5.    \- request to manage: Stores the current Date Change Request being managed

\================================================================================  
OPTION SETS IDENTIFIED  
\================================================================================

1. Alert Type: Used for the Alerts general custom event  
2.    \- Values: error, information, warning, success (implied from workflow conditions)

2\. Photos-type: Used for photo categorization

- Values: storage, cleaning (implied from workflow conditions)

\================================================================================  
DETAILED WORKFLOW ANALYSIS  
\================================================================================

—----------------------------------------  
CATEGORY: PAGE IS LOADED  
—----------------------------------------

WORKFLOW 1: Page is loaded \- Displays Select Leases Current week number  
Trigger: Page is loaded  
Steps:

1. Make changes to Bookings \- Leases  
2.      \- current week number \= (Current date/time \- This Bookings-Leases’s Reservation Period: Start) formatted as days / 7 : ceiling

Purpose: Calculates and stores which week number the guest is currently in their lease period.

—----------------------------------------  
CATEGORY: CUSTOM EVENTS  
—----------------------------------------

WORKFLOW: Alerts general  
Trigger: Custom event  
Parameters:

- Title (text, required)  
-   \- content (text, optional)  
-   \- time (ms) (number, optional)  
-   \- alert type (Alert Type option set, optional)  
-   \- Show on Live? (yes/no, optional)

Steps:

1. Custom Toast ERROR (Only when alert type is error AND Show on Live? Is yes)  
2.   2\. Custom Toast INFORMATION (Only when alert type is information AND Show on Live? Is yes)  
3.   3\. Custom Toast WARNING (Only when alert type is warning AND Show on Live? Is yes)  
4.   4\. Custom Toast SUCCESS (Only when alert type is success AND Show on Live? Is yes)  
5.   5\. Custom Toast EMPTY ALERT TYPE (Only when alert type is empty AND Show on Live? Is yes)  
6.   6\. Custom Toast Version-Test ONLY (Only when Isn’t live version is yes AND Show on Live? Formatted as number is 0\)

Purpose: Centralized alert/notification system that displays different toast messages based on alert type. Supports testing mode with version-specific toasts.

—----------------------------------------  
CATEGORY: REVIEW WORKFLOWS  
—----------------------------------------

WORKFLOW: B: See Review submitted by HOST is clicked  
Trigger: Button click  
Steps:

1. Display data in Review for Stays NEW (Data: Current cell’s Bookings \- Stays)  
2.   2\. Set states section of Review for Stays NEW \= “reviewslisted”  
3.   3\. Show Review for Stays NEW

Purpose: Opens the review popup to show a review that was submitted by the host.

—----------------------------------------

WORKFLOW: B: Submit review HOST from the GUEST copy is clicked  
Trigger: Button click  
Steps:

1. Set state section of P: Check in \- Check out Flow \= “checkout”  
2.   2\. Set state stay sent of P: Check in \- Check out Flow \= Current cell’s Bookings \- Stays  
3.   3\. Show P: Check in \- Check out Flow

Purpose: Opens the check-in/check-out flow popup in checkout mode, passing the current stay.

—----------------------------------------

WORKFLOW: B: Submit review HOST from the GUEST is clicked  
Trigger: Button click  
Steps:

1. Display data in Review for Stays NEW (Data: Current cell’s Bookings \- Stays)  
2.   2\. Set states Step… of Review for Stays \= “REVIEW NOT CREATED YET”  
3.      (Only when Current cell’s Bookings \- Stays’s Review Submitted by Host is empty)  
4.   3\. Set states Step… of Review for Stays \= “REVIEW CREATED”  
5.      (Only when Current cell’s Bookings \- Stays’s Review Submitted by Host is not empty)  
6.   4\. Show Review for Stays NEW

Purpose: Opens the review submission popup with conditional state based on whether a review has already been submitted.

—----------------------------------------  
CATEGORY: CHECK-IN/CHECK-OUT WORKFLOWS  
—----------------------------------------

WORKFLOW: G: i’m here is clicked  
Trigger: Button click  
Element: G: i’m here  
Steps:

1. Set state initial text of G: sending message section \= CHECKIN FLOW preset

Purpose: Sets up the messaging section with a check-in arrival message template.

—----------------------------------------

WORKFLOW: G: i’m on my way is clicked  
Trigger: Button click  
Purpose: Sets up the messaging section with an “on my way” message template.

—----------------------------------------

WORKFLOW: I: send is clicked (Check-in Message)  
Trigger: Button click  
Condition: MI: Message of check in sending’s value is not empty  
Steps:

1. Schedule API Workflow: sms-email-and-in-app-message-user-to-user  
2.      Parameters: message body, thread, proposal, to the guest?, sender, split-bot-warning, send email?, is forwarded by CHATGPT?, notify via email, mode, page, Sender, Receiver, Sender Name, Receiver Name, notify via sms  
3.   2\. Set states message sent?... of P: Check in \- Check out Flow  
4.   3\. AirAlert \- Custom (notification)  
5.   4\. Add a pause before next action  
6.   5\. Hide P: Check in \- Check out Flow  
7.   6\. Set states message sent?... of P: Check in \- Check out Flow  
8.   7\. Reset P: Check in \- Check out Flow  
9.   8\. Reset relevant inputs  
10.   9\. Set states initial text… of G: sending message section CHECKIN FLOW

Purpose: Sends a check-in notification message to the host via SMS, email, and in-app messaging system, then cleans up the UI state.

—----------------------------------------

WORKFLOW: I: send is clicked (Checkout Message)  
Trigger: Button click  
Condition: MI: Message of CHECKOUT sending’s value is not empty  
Purpose: Similar to check-in message but for checkout notifications.

—----------------------------------------  
CATEGORY: PHOTO SUBMISSION WORKFLOWS  
—----------------------------------------

WORKFLOW: Button Submit Cleaning Phot is clicked  
Trigger: Button click  
Steps:

1. Create a new ZFUT \- Storage Photos  
2.      \- Associated Stay \= Current page’s Bookings \- Leases’s List of Stays: filtered: first item  
3.      \- Storage Photos set list \= FIUP: cleaning and storage photos’s value  
4.      (Only when G: submit photos for checkout’s photos-type is “storage”)  
5.        
6.   2\. Create a new ZFUT \- Proof of Cleaning  
7.      (Only when G: submit photos for checkout’s photos-type is “cleaning”)  
8.        
9.   3\. Make changes to Bookings \- Stays (storage photos)  
10.      (Only when G: submit photos for checkout’s photos-type is “storage”)  
11.        
12.   4\. Make changes to Bookings \- Stays (cleaning photos)  
13.      (Only when G: submit photos for checkout’s photos-type is “cleaning”)  
14.        
15.   5\. Trigger Alerts general (success notification)  
16.     
17.   6\. Hide P: Check in \- Check out Flow  
18.     
19.   7\. Reset P: Check in \- Check out Flow  
20.     
21.   8\. Reset relevant inputs

Purpose: Handles photo submission for both storage and cleaning documentation. Creates appropriate records based on photo type and updates the stay record, then shows success notification and cleans up UI.

—----------------------------------------

WORKFLOW: G: cleaning photos is clicked  
Trigger: Button click  
Purpose: Opens/prepares the photo submission section for cleaning photos.

—----------------------------------------

WORKFLOW: G: photos of lodging stored is clicked  
Trigger: Button click  
Purpose: Opens/prepares the photo submission section for storage photos.

—----------------------------------------  
CATEGORY: DATE CHANGE REQUEST WORKFLOWS  
—----------------------------------------

WORKFLOW: T: Approve/Remove actions is clicked \- ACCEPT/REJECT request  
Trigger: Button click  
Condition: Parent group’s Date Change Request’s request status is “Waiting for answer” AND Current User is not Parent group’s Date Change Request’s Requested by  
Steps:

1. Run javascript (likely UI animation or preparation)  
2.   2\. Add a pause before next action  
3.   3\. Set state request to manage of date-change-requests \= Parent group’s Date Change Request  
4.   4\. Show date-change-requests popup

Purpose: Allows users to approve or reject date change requests. Only appears for users who are NOT the requester and when the request status is pending.

—----------------------------------------  
CATEGORY: LEASE CARD UI WORKFLOWS  
—----------------------------------------

WORKFLOW: G: Header of each Lease card is clicked (show details? Is no)  
Trigger: Button/Header click  
Condition: G: Lease card’s show details? Is no  
Purpose: Expands the lease card to show detailed information.

—----------------------------------------

WORKFLOW: G: Header of each Lease card is clicked (show details? Is yes)  
Trigger: Button/Header click  
Condition: G: Lease card’s show details? Is yes  
Purpose: Collapses the lease card to hide detailed information.

—----------------------------------------

WORKFLOW: G: leaving property message is clicked  
Trigger: Button click  
Purpose: Opens messaging interface for sending “leaving property” notification.

—----------------------------------------

WORKFLOW: G: submit a review is clicked  
Trigger: Button click  
Purpose: Opens the review submission interface.

—----------------------------------------  
CATEGORY: POPUP/MODAL MANAGEMENT  
—----------------------------------------

WORKFLOW: I: Close is clicked  
Trigger: Button click  
Purpose: Closes the currently open popup/modal (likely P: Check in \- Check out Flow).

—----------------------------------------  
CATEGORY: FLEXIBILITY & REPUTATION WORKFLOWS  
—----------------------------------------

WORKFLOW: T: Flexibility Score is clicked  
Trigger: Button click  
Purpose: Shows flexibility score information or popup.

—----------------------------------------

WORKFLOW: T: See reputation is clicked  
Trigger: Button click  
Purpose: Shows reputation/review information popup.

—----------------------------------------  
CATEGORY: STAYS TABLE WORKFLOWS  
—----------------------------------------

WORKFLOW: Text Show All Stays is clicked (multiple variations)  
Trigger: Text/Link click  
Condition: RG: Stays table’s show all stays? Is…  
Purpose: Toggles between showing all stays or filtered stays in the repeating group.

\================================================================================  
DATA FLOW SUMMARY  
\================================================================================

PAGE LOAD:

1. Page loads \-\> calculates current week number for the lease  
2. 2\. Current page receives Bookings \- Leases data type  
3. 3\. Lease card displays List of Stays from the lease

USER INTERACTIONS:

Check-in Flow:

1. User clicks “I’m here” or “I’m on my way” \-\> Sets message template  
2. 2\. User types/edits message  
3. 3\. User clicks send \-\> Triggers API workflow for multi-channel messaging  
4. 4\. System sends SMS, email, in-app notification  
5. 5\. UI resets and popup closes

Photo Submission Flow:

1. User clicks photo type button (storage or cleaning)  
2. 2\. User uploads photos  
3. 3\. User clicks submit  
4. 4\. System creates ZFUT record (Storage Photos or Proof of Cleaning)  
5. 5\. System updates Bookings \- Stays with photo references  
6. 6\. Success alert displays  
7. 7\. UI resets

Review Flow:

1. User clicks review button  
2. 2\. System checks if review already exists  
3. 3\. Popup displays with appropriate state (new vs existing review)  
4. 4\. User can view or submit review

Date Change Request Flow:

1. Request displayed with “Waiting for answer” status  
2. 2\. Non-requester users see Approve/Reject buttons  
3. 3\. User clicks approve/reject  
4. 4\. Management popup displays  
5. 5\. User confirms action

\================================================================================  
KEY OBSERVATIONS & PATTERNS  
\================================================================================

1. STATE-BASED UI CONTROL: The page heavily uses custom states to control which sections/views are visible and what mode the UI is in (e.g., checkout vs checkin, review created vs not created).  
2. MULTI-CHANNEL MESSAGING: The check-in/check-out messaging system uses a sophisticated API workflow that handles SMS, email, and in-app messaging simultaneously.  
3. CONDITIONAL BRANCHING: Many workflows have conditional steps that run only when specific conditions are met, allowing single workflows to handle multiple scenarios.  
4. CLEANUP PATTERN: Most interactive workflows follow a pattern of: perform action \-\> show notification \-\> pause \-\> hide popup \-\> reset state \-\> reset inputs.  
5. DATA TYPE RELATIONSHIPS:   
6.    \- Bookings \- Leases contains List of Stays  
7.    \- Each Stay can have associated Storage Photos and Proof of Cleaning records  
8.    \- Reviews are associated with Stays  
9.    \- Date Change Requests are standalone but reference users and presumably leases

6\. PERMISSION CHECKING: Date change request workflows include permission checks to ensure only appropriate users can approve/reject requests.

\================================================================================  
END OF ANALYSIS  
\================================================================================