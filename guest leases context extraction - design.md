GUEST LEASES PAGE \- COMPREHENSIVE DESIGN & FUNCTIONALITY GUIDE

\=================================================================

1. PAGE OVERVIEW  
2. \=================================================================

Page Name: guest-leases  
Page Title: Current User’s Name \- First’s Proposals and Leases  
Mobile Version: guest-leases-mobile  
Type of Content: Bookings \- Leases  
Page Folder: Guests  
Background Color: \#F7F8F9 (light gray)  
Container Layout: Column  
Container Alignment: Top-center  
Default Builder Width: 1440px

Purpose: This page displays a repeating group of leases that a guest has, allowing them to view lease details, review documents, manage stays, request date changes, and perform various actions related to their leases.

\=================================================================  
2\. PAGE STRUCTURE HIERARCHY  
\=================================================================

The page is organized into these main sections:

1. OVERLAYS (Popup elements that appear on top of the page)  
2.    \- \*P: emergency-report A (Emergency report popup)  
3.    \- Header A (Reusable header element)  
4.    \- \*P: Check in \- Check out Flow (Check-in/checkout popup)  
5.      \- I: Close (Close icon)  
6.      \- G: Schedule and Calendar (Schedule picker)  
7.      \- G: checkout flow  
8.        \- G: animation of… (Animation group)  
9.        \- T: Text Check-out

B. LAYERS (Main page content)

- G: Leases (Main leases container)  
-      \- Group EZ  
-      \- T: Guest Leases Label  
-      \- RG: Each Lease (Main repeating group for leases)  
-        \- G: Header of each Lease card  
-    \- footer-hypo1 A (Footer element)

\=================================================================  
3\. MAIN REPEATING GROUP: RG: Each Lease  
\=================================================================

This is the primary element showing all guest leases.

APPEARANCE SETTINGS:

- Type of content: Bookings \- Leases  
- \- Data source: Current User’s Leases:filtered  
- \- Style: None (Custom)  
- \- Opacity: 100%  
- \- Background style: None  
- \- Border style: Solid  
- \- Border width: 1  
- \- Border color: \#6B6B6B  
- \- Roundness: 0  
- \- Shadow style: None  
- \- Width: 100%  
- \- Height: 0px \- inf (auto height)

LAYOUT SETTINGS:

- Cell’s container layout: Column  
- \- Container alignment: Top-left  
- \- Visible on page load: Yes  
- \- Collapse when hidden: Yes  
- \- Fixed width: Yes (100%)  
- \- Min height: 0px  
- \- Max height: infinite  
- \- Fit height to content: Yes  
- \- Margins: 0px all sides

REPEATING GROUP SPECIFIC SETTINGS:

- Fixed number of rows: No  
- \- Min height of row: 100px  
- \- Stretch rows to fill vertical space: No  
- \- Fixed number of columns: Yes  
- \- Columns: 1  
- \- Show all items immediately: Yes  
- \- Separators: Solid, Width 1, Color \#000000 (Heading Color)  
- \- Display as masonry grid: No

CONDITIONALS:

- When: This RepeatingGroup is visible → Border style: None

\=================================================================  
4\. LEASE CARD STRUCTURE (Inside RG: Each Lease)  
\=================================================================

Each lease card contains:

G: Header of each Lease card

- Type of content: Bookings \- Leases  
- \- Data source: Current cell’s Bookings \- Leases  
- \- Not clickable: No  
- \- Style: None (Custom)  
- \- Width: 100%  
- \- Height: auto

Inside the header:

- G: legend check in ch… (Check-in/checkout legend)  
- \- Group Bookings \- Leases (Main content group)  
- \- G: Lease card (Expandable details)

INSIDE LEASE CARD:

1. G: Display Host Contact Info  
2.    \- Phone number (with phone icon)  
3.    \- Email (with envelope icon)  
4.    \- Address (with location icon)

2\. PT Agreement Section

- Text: “PT Agreement \# \[Agreement Number\]”  
-    \- Font: DM Sans, 700 weight, 18px  
-    \- Color: \#4D4D4D

3\. RG: Payment Records (Payment history table)

- Columns: Scheduled Date, Actual Date, Rent, Maint. Fee, Damage Deposit, Total, Bank Transaction \#, Receipt  
-    \- Download icons for receipts

4\. G: Buttons \-\> 1200 (Action buttons row)

- Periodic Tenancy Agreement (PDF) \- Purple button  
-    \- Supplemental Terms (PDF) \- Purple button  
-    \- View/Change Dates \- White button with purple border  
-    \- Credit Card Auth Form \- Purple button  
-    \- Payment Summary \- White button  
-    \- Reservation Details \- White button  
5. RG: Stays table (Stays information)  
6.    \- Columns: Week \#, Period, Status  
7.    \- Buttons: See Review, Review, Leaving Property  
8.    \- “Show All Stays” link

6\. Date Change Section

- Columns: Requested by, Request, Status, Price, Action  
-    \- “Request Changes” button  
-    \- Approve/Reject actions

7\. Flexibility Score Section

- Your Flexibility Score display  
-    \- “See your reputation” link  
-    \- Score percentage indicator  
-    \- Stats: Nights Used, Nights Remaining, Original nights, New proposed nights  
-    \- Requests done by guest/host counts  
-    \- Pending Requests count  
-    \- Extra Fees or “Found Money”

8\. Emergency Assistance Button

\=================================================================  
5\. STYLES AND TYPOGRAPHY  
\=================================================================

PRIMARY FONT: DM Sans

FONT SIZES USED:

- Headers/Titles: 18px (weight 700\)  
- \- Body text: Standard  
- \- Labels: Smaller sizes

COLORS:

- Primary Purple: \#7C3AED (buttons)  
- \- Text Dark: \#4D4D4D  
- \- Background Gray: \#F7F8F9  
- \- Border Gray: \#6B6B6B  
- \- Separator: \#000000 (Heading Color)

BUTTON STYLES:

Purple Filled Buttons (e.g., Periodic Tenancy Agreement, Credit Card Auth):

- Background: Purple (\#7C3AED approximately)  
- \- Text: White  
- \- Border radius: Rounded corners

White/Outline Buttons (e.g., View/Change Dates, Payment Summary):

- Background: White  
- \- Border: Purple  
- \- Text: Purple or dark

Icon Buttons (e.g., See Review, Review, Leaving Property):

- Include icons alongside text  
- \- Purple background with white text

\=================================================================  
6\. ICONS USED  
\=================================================================

- Phone icon (for host phone number)  
- \- Envelope icon (for host email)  
- \- Location/Pin icon (for address)  
- \- Download icon (for receipts)  
- \- Car icon (I’m on my way button)  
- \- House icon (I’m here button)  
- \- Trash icon (cleaning photos)  
- \- Various action icons

\=================================================================  
7\. CONDITIONALS AND VISIBILITY LOGIC  
\=================================================================

Key conditional elements:

1. RG: Each Lease  
2.    \- When visible: Border style changes to None

2\. G: Header of each Lease card

- Click toggles “show details?” state  
-    \- Controls expansion/collapse of lease details  
3. G: Lease card  
4.    \- Custom state: “show details?” (yes/no)  
5.    \- Controls visibility of detailed sections

4\. Button visibility conditionals based on:

- Lease status  
-    \- Stay status  
-    \- Date change request status  
-    \- Payment status

5\. Cleaning photos section

- Conditional: When FIUP: cleaning and storage photos’s value:count is 0  
-    \- This element is visible: controlled by photo upload state

\=================================================================  
8\. FRONTEND WORKFLOWS (37 total)  
\=================================================================

WORKFLOW CATEGORIES:

1. Uncategorized (22 workflows):  
2. \- B: See Review submitted by HOST  
3. \- B: Submit review HOST from the…  
4. \- Button Submit Cleaning Phot is clicked  
5. \- G: cleaning photos is clicked  
6. \- G: Header of each Lease card is clicked (show details? \= no)  
7. \- G: Header of each Lease card is clicked (show details? \= yes)  
8. \- G: I’m here is clicked  
9. \- G: I’m on my way is clicked  
10. \- G: leaving property message is clicked  
11. \- G: photos of lodging stored is clicked  
12. \- G: submit a review is clicked  
13. \- I: Close is clicked  
14. \- I: send is clicked (check-in message)  
15. \- I: send is clicked (checkout message)  
16. \- T: Approve/Remove actions is clicked (multiple for date changes)  
17. \- T: Flexibility Score is clicked  
18. \- T: See reputation is clicked  
19. \- Text Show All Stays is clicked

B. Custom Events (1)

C. Do When Condition (3)

D. Navigation (3)

E. Page is Loaded (2)

F. Schedule Selector (2)

G. Show Elements (4)

KEY WORKFLOW BEHAVIORS:

1. Lease Card Toggle:  
2.    \- Trigger: G: Header of each Lease card is clicked  
3.    \- Condition: G: Lease card’s show details? Is no  
4.    \- Action: Set states show details?... of G: Lease card  
5.    \- Result: Expands/collapses lease details

2\. Check-in Flow:

- “I’m on my way” button triggers notification  
-    \- “I’m here\!” button confirms arrival  
-    \- Sends message to host with check-in status

3\. Checkout Flow:

- Submit cleaning photos  
-    \- Submit review option  
-    \- “I’m leaving the property” confirmation

4\. Date Change Requests:

- Request Changes button initiates flow  
-    \- Approve/Reject actions for pending requests  
-    \- Updates flexibility score

\=================================================================  
9\. DATA BINDINGS  
\=================================================================

Key data sources:

1. Page Data Type: Bookings \- Leases  
2. RG: Each Lease  
3.    \- Data source: Current User’s Leases:filtered

3\. Host Information:

- Parent group’s Bookings \- Leases’s Host’s User’s Phone Number  
-    \- Parent group’s Bookings \- Leases’s Host’s User’s email  
-    \- Parent group’s Bookings \- Leases’s Listing’s Location \- Address  
4. Payment Records:  
5.    \- Current cell’s Payment Records’s Scheduled Date  
6.    \- Current cell’s Payment Records’s Actual Date of Payment  
7.    \- Current cell’s Payment Records’s Rent  
8.    \- Current cell’s Payment Records’s Maintenance Fee  
9.    \- Current cell’s Payment Records’s Damage Deposit  
10.    \- Current cell’s Payment Records’s Total Paid to Host  
11.    \- Current cell’s Payment Records’s Bank Transaction Number

5\. Stays:

- Parent group’s Bookings \- Stays’s Week Number  
-    \- Parent group’s Bookings \- Stays’s Check In (night)  
-    \- Parent group’s Bookings \- Stays’s Stay Status’s Display

6\. Date Change Requests:

- Parent group’s Date Change Request’s date added  
-    \- Parent group’s Date Change Request’s Price/Rate of the night  
-    \- Status fields

7\. Flexibility Score:

- Parent group’s Bookings \- Leases’s Reputation Score (GUEST)  
-    \- Date Change Requests counts (filtered by requester)

\=================================================================  
10\. REUSABLE ELEMENTS  
\=================================================================

Header A:

- Floating element  
- \- Vertically float: Top  
- \- Horizontally float: Left  
- \- Floating zindex: Above elements  
- \- Width: 100%  
- \- Height: 70px  
- \- Contains: Split Lease logo, navigation menus, Explore Rentals button

Footer (footer-hypo1 A):

- For Hosts section links  
- \- For Guests section links  
- \- Company section links  
- \- Refer a friend section  
- \- Import listing section  
- \- App download links  
- \- Alexa skill promotion  
- \- Legal links and copyright

\=================================================================  
11\. CHECK-IN/CHECKOUT POPUP STRUCTURE  
\=================================================================

\*P: Check in \- Check out Flow

Components:

1. Animation/Video element showing paper airplane  
2. 2\. Check-in section:  
3.    \- Day selector dropdown (Check-In Day)  
4.    \- “I’m on my way” button (car icon)  
5.    \- “I’m here\!” button (house icon, purple)  
6.    \- Message input area  
7.    \- Send button

3\. Check-out section:

- Day selector dropdown (Check-Out Day)  
-    \- “Submit cleaning photos” button (trash icon, purple)  
-    \- “I’m leaving belongings at the…” button  
-    \- “Submit a Review” button  
-    \- “I’m leaving the property” button  
-    \- Message input area  
-    \- Send button

\=================================================================  
12\. INFORMATIONAL TEXT ELEMENT  
\=================================================================

Element: Informational text (Reusable)

- Shows dynamic informational messages  
- \- Text source: Parent group’s Informational Texts’s Desktop copy  
- \- Extra text field available  
- \- “show more” link for expandable content  
- \- Close button

\=================================================================  
13\. EMERGENCY ASSISTANCE  
\=================================================================

Button: Emergency Assistance

- Prominent red/coral colored button  
- \- Located at bottom of lease card  
- \- Links to emergency reporting popup (\*P: emergency-report A)

\=================================================================  
END OF GUIDE  
\=================================================================