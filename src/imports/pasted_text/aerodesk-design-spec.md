Design a complete, premium, enterprise-grade Travel & Flight Booking Admin Dashboard called AeroDesk for a B2B airline and travel agency management system. The product is used by travel managers, booking supervisors, sub-agents, and airline back-office staff.

DESIGN STANDARD
The quality bar is Stripe, Linear, Notion, Framer, and HubSpot. Every screen must feel like a production-ready SaaS product — not a Bootstrap admin template, not a free dashboard kit. Clean, powerful, luxurious, and highly readable. Zero visual clutter. Zero legacy admin aesthetics.

COLOR SYSTEM
TokenHexUsagePrimary#4F46E5CTAs, active nav, key actionsPrimary Soft#EEF2FFSelected rows, input focus bgSecondary#7C3AEDBadges, secondary actionsAccent#06B6D4Links, highlights, tagsSuccess#22C55EApproved, positive statesWarning#F59E0BPending, caution statesDanger#EF4444Rejected, destructive actionsPage BG#F8FAFCApp backgroundSurface#FFFFFFCards, panels, modalsBorder#E2E8F0Default bordersText Primary#0F172AHeadings, bodyText Muted#94A3B8Labels, captions, placeholdersSidebar BG#0F172ADark sidebar
Gradients:

Primary gradient: 135deg, #4F46E5 → #7C3AED
Accent gradient: 135deg, #06B6D4 → #4F46E5
Success gradient: 135deg, #22C55E → #16A34A


TYPOGRAPHY
Font: Inter
StyleSizeWeightUseDisplay32px700Page titlesHeading24px600Section titlesSubheading18px600Card headersLabel15px600Table headersBody14px400Default UI textCaption11px500Badges, timestamps

SPACING & RADIUS
Base unit: 8px grid
Radii: 6px (inputs), 10px (buttons/badges), 14px (cards), 18px (large panels), 9999px (pills/avatars)
Shadows:

xs: 0 1px 2px rgba(15,23,42,0.04)
sm: 0 2px 8px rgba(15,23,42,0.06)
md: 0 4px 16px rgba(15,23,42,0.08)
lg: 0 8px 32px rgba(15,23,42,0.12)
xl: 0 16px 48px rgba(15,23,42,0.16)


GLOBAL LAYOUT
Frame size: 1440 × 900px (desktop primary)

Sidebar: 260px wide, dark (#0F172A), collapsible to 72px
Top Navbar: 64px tall, white, 1px bottom border
Content area: Remaining width, 32px padding, light gray background


SIDEBAR DESIGN
Dark sidebar with:

Top logo area: 32×32px rounded logo mark with primary gradient + "AeroDesk" wordmark in white
Navigation items: 44px tall, 12px horizontal padding, 10px radius, icon (20px) + label
Active state: #4F46E5 background, white text, white 3px left-edge indicator bar
Hover state: #1E293B background, white text
Default state: white text at 55% opacity
Section dividers: uppercase caption labels at 30% white opacity

Navigation structure:
Dashboard
Flights
  ├── Flight Bookings
  ├── Flight Management
  ├── Flight POS
  └── Segment Management
Sub Agents
Reports
Settings

Sub-items: indented 44px, 13px font, active state shows 2px left border in #06B6D4
Bottom: collapse toggle button with chevron icon


TOP NAVBAR
White bar, 64px height, 1px bottom border, horizontal padding 32px:

Left: Breadcrumb in muted text → current page in dark text
Center: Search bar, 360px wide, pill shape, placeholder "Search bookings, agents, flights…"
Right: Language dropdown → Bell icon with notification dot → User avatar with dropdown


SCREEN 1 — DASHBOARD HOME
KPI Cards Row (6 cards, equal-width grid, 16px gap):
Each card: white background, 1px border, 14px radius, 20px/24px padding, soft shadow, hover lifts 2px
Card content:

Icon in 40×40px rounded square with soft gradient tint background
Metric value in 24px/600 weight
Label in 13px muted text
Trend badge bottom-right: small green/red arrow + percentage + "vs last month"

Six cards: Total Bookings / Sales Revenue / Pending Approvals / Approved Bookings / Sub Agents / New Registrations
Main Content Row (below cards, 24px gap):

Left panel (8 cols): Booking Activity area chart — 12 months, primary color fill at 10% opacity, 2px stroke line, period selector tabs top-right (7D / 30D / 90D / 1Y)
Right panel (4 cols): Recent Approvals feed — avatar + name + booking ref + status pill + timestamp per row, dashed dividers

Bottom Row:

Left (8 cols): Top Sub-Agents mini table — 5 rows, agent name + city + bookings + revenue + status
Right (4 cols): Quick Actions card — 4 icon-button actions (New Booking, Add Agent, Reports, Settings)


SCREEN 2 — FLIGHT BOOKINGS
Page header: Title left + total count badge. Right: Export button + New Booking primary button with gradient.
Filter bar: White card, 1px border, 16px radius, 16px/20px padding

Search input (flex-grow) + date range picker + airline dropdown + More Filters button

Status tabs (pill toggle group below filter bar):
All · Pending · Approved · Rejected · Issued · Void
Active tab: #4F46E5 background, white text. Inactive: white, muted text, hover soft indigo bg.
Data table: White, 18px radius, soft shadow, 1px border, overflow hidden
Column headers: #F8FAFC background, 44px height, 15px/600 font, muted color, 1px bottom border, sort icons on hover
Columns: Checkbox · Ref# · Passenger · Route · Airline · Date · Class · Amount · Status · Actions (sticky right)
Rows: 56px height, 16px padding, alternating white / #FAFAFA zebra, hover soft indigo tint, 1px dashed bottom border
Status pills (pill shape, 11px/500 font):

Pending: #FFFBEB bg, #B45309 text, #FCD34D border
Approved: #F0FDF4 bg, #15803D text, #86EFAC border
Rejected: #FEF2F2 bg, #B91C1C text, #FCA5A5 border
Issued: #EEF2FF bg, #4338CA text, #A5B4FC border
Void: #F8FAFC bg, #64748B text, #CBD5E1 border

Action buttons (sticky right column, 32×32px icon buttons, 8px radius, tooltip on hover):
View (cyan tint) · Approve (green tint) · Reject (red tint) · Print (gray tint)
Pagination: Bottom right — "Showing 1–25 of 4,821" + Prev/Next/page number buttons + rows-per-page selector

SCREEN 3 — FLIGHT POS (SEARCH)
Hero section: Full-width primary gradient banner, 280px tall, subtle aviation silhouette pattern at 5% opacity
Trip type tabs centered at top of hero:
Round Trip · One Way · Multi City — glass-morphism pill tabs (white 15% opacity, active: white 100%, primary text)
Search widget card: White card, 18px radius, xl shadow, 32px padding, 900px wide, centered

Route row: Large FROM airport code (48px/700/primary) + city name below + swap button (40×40px circle, primary soft bg) + large TO airport code
Date row: Depart + Return date fields, 56px tall, 10px radius, calendar icon
Passengers + Class row: Adult/Child/Infant counter dropdowns + Economy/Business/First pill toggle
Promo code: Collapsible link "Have a promo code?"
Search button: Full width, 56px tall, primary gradient, white text, search icon, hover scale 1.01

Below card: Recent searches — horizontal scroll of route chips (e.g., "KHI → ISB · Jan 15 · 2 Pax")

SCREEN 4 — PASSENGER BOOKING FORM
Layout: Left column (form, 8 cols) + Right column (fare summary sticky card, 4 cols)
Progress stepper (top, full width):
Step 1: Search · Step 2: Select · Step 3: Passengers · Step 4: Review · Step 5: Confirm
Filled circle for active, check icon for completed, gray for upcoming, connecting line between steps.
Passenger card (per passenger, white, 14px radius, 1px border, 24px padding):

Header: "Passenger 1 — Adult" + collapse chevron
Title select: Mr / Mrs / Miss / Dr as radio pill group
First + Last name: 2-column grid, 52px input height, floating labels that shrink on focus
Date of birth: DD / MM / YYYY three dropdowns in a row
Nationality: Searchable dropdown
Passport number + expiry: Side by side pair
Passport upload zone: Dashed 2px border, upload icon, "Drag passport here or click to browse", accepts JPG/PNG/PDF
Gender: Icon-enhanced radio pills (male/female icons)

All inputs: 52px height, 10px radius, 1px border, focus state: primary color border + 3px primary soft glow
Sticky fare summary card (right col, 18px radius, lg shadow, 24px padding, sticky top 80px):

Header: "Fare Summary" + flight route badge
Breakdown rows: Base Fare / Taxes / Surcharge / Discount / Promo — dashed dividers between rows
Total row: 24px/700 weight, primary color, animated count-up on page load
Flight mini-card inside: airline logo + route + date/time + class, soft indigo background, 10px radius
CTA: Full-width "Continue to Review" button with primary gradient, 52px tall
Below: "Save Draft" ghost button


SCREEN 5 — SEGMENT MANAGEMENT
Page header: Title + segment count badge. Right: Search input + Add Segment button.
Filter row: Airline dropdown + Route filter + Date range + Status filter
Data table (same styling system as Flight Bookings):
Columns: Checkbox · Segment ID · Origin · Destination · Airline · Aircraft · Departure · Arrival · Duration · Seats · Status · Actions
Status pills: Active / Inactive / Cancelled (use same pill system)
Each row action: Edit (pencil) · Duplicate (copy) · Delete (trash, red tint)
Empty state (when no results): Centered illustration + "No segments found" heading + subtext + Add Segment button, dashed border card

SCREEN 6 — SUB AGENT MANAGEMENT
Page header: Title + "127 Active" badge. Right: Search + Add Sub Agent primary button.
Stats strip (4 mini cards, border-bottom divider below):
Total Agents · Active Today · Total Credit Extended · Pending KYC
Agents table:
Columns: Checkbox · Agent (avatar + name + company badge) · Email · Phone · City · Credit Limit + progress bar · Balance · Status · Actions
Avatar: 36×36px circle, colored initials, primary gradient background, white 14px/500 text
Credit limit cell: Value text above + thin 4px progress bar below (green under 60% used, amber 60–85%, red above 85%)
Company badge: Pill chip, secondary soft background, secondary text color
Status pills: Active (green) · Suspended (amber) · Blocked (red) · Pending KYC (gray)
Row actions: View profile · Edit · Call · More (three-dot menu)

COMPONENT SYSTEM
Buttons:

Primary: gradient bg, white text, sm shadow, hover lifts + deeper shadow
Secondary: white bg, 1px border, dark text, hover soft indigo bg
Ghost: transparent, primary text, hover soft indigo bg
Danger: red bg, white text
Sizes: 32px (sm) / 40px (default) / 48px (lg), all 10px radius

Modals: White, 18px radius, xl shadow, 560px default width, 32px padding, blurred dark overlay, header with close button, footer with action buttons
Loading skeletons: Shimmer animation on placeholder rows and cards
Toast notifications: Bottom-right stack, 340px wide, 14px radius, colored left border (3px) per type, 4s auto-dismiss with progress bar
Empty states: Centered in card, 80px icon, heading + subtext + CTA, dashed border

AUTO LAYOUT RULES (FIGMA SPECIFIC)

All components must use Figma Auto Layout
Use Hug contents for: buttons, badges, chips, labels
Use Fill container for: inputs, table cells, full-width cards
Use Fixed for: icons (20×20px), avatars (36×36px), button heights
Enable Clip content on: cards, table containers, modals, sidebar
All interactive components must have Default / Hover / Active / Focus / Disabled variants
Component naming: Category/Variant/State — e.g., Button/Primary/Hover, Badge/Status/Approved, Input/Text/Focus


RESPONSIVENESS

Desktop: 1440px — full sidebar + full table columns
Tablet: 1024px — collapsed sidebar (icons only), simplified tables
Mobile: 390px — bottom navigation bar, stacked cards, horizontally scrollable tables


Produce all 6 screens in a single Figma file with a shared component library, auto layout throughout, and a local styles panel containing all color, text, and effect tokens defined above.