# Lead Management System (Mini CRM)

A full-stack Lead Management System built for a real estate use case. This application enables users to capture, manage, and track leads efficiently with search, filters, status updates, and dashboard insights.

---
## Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

##  Features

### 1. Lead Capture (Create)

* Add new leads with:

  * Name *(required)*
  * Phone Number *(required)*
  * Email *(validated)*
  * Budget
  * Location
  * Property Type
  * Lead Source *(required)*
  * Notes
* Form validation implemented (frontend + backend)

---

### 2. Lead Listing (Read)

* Display all leads in table format

**Columns:**

* Name
* Contact
* Budget
* Location
* Source
* Status

**Functionalities:**

*  Search (by name / phone)
*  Filter (by source, status)
*  Sort (by date / budget)
*  Click row → View detailed lead
*  Pagination (server-side)

---

### 3. Lead Detail View

* View complete lead information

**Shows:**

* Name, Phone, Email, Budget, Location
* Property Type, Source, Status, Notes

---

### 4. Update Lead (Update)

* Update lead details from **Lead Detail Page**

**Modify:**

* Status:

  * New
  * Contacted
  * Site Visit
  * Closed
* Notes / Comments

✔ Real-time update using API
✔ UI refresh after update

---

### 5. Dashboard

* Total Leads
* Leads by Source
* Status Distribution
* Conversion Rate

 **Conversion Rate Formula:**
(Closed Leads / Total Leads) × 100

---

##  API Endpoints

| Method | Endpoint         | Description                                      |
| ------ | ---------------- | ------------------------------------------------ |
| POST   | /leads/addleads  | Create new lead                                  |
| GET    | /leads/getleads  | Get all leads (search, filter, sort, pagination) |
| GET    | /leads/dashboard | Get dashboard metrics                            |
| GET    | /leads/:id       | Get single lead details                          |
| PUT    | /leads/:id       | Update lead status and notes                     |

---

##  Installation & Setup

### 1. Clone Repository

git clone url
cd project-folder

---

### 2. Backend Setup

cd backend
npm install

#### Run Backend

npm start / nodemon

---

### 3. Frontend Setup

cd frontend
npm install
npm start

---

# Note: To Run Frontend Backend Should Run First  And Than Frontend Should Run Properly Than The Application will open 

###  Frontend Routes

*  **Main Page (Leads List)**
  http://localhost:3001/

* 📄 **Lead Detail / Update Page**
  http://localhost:3001/lead/:id
   Example: http://localhost:3001/lead/9

*  **Dashboard Page**
  http://localhost:3001/dashboard

---

### 🔹 Backend Base URL

* http://localhost:3000/leads

---

##  Error Handling

### Backend

* Input validation (name, phone, email)
* Duplicate lead prevention
* Parameterized queries (SQL injection protection)
* Try-catch blocks for all APIs

### Frontend

* Form validation before API calls
* API error handling using try-catch
* User-friendly error messages
* Safe rendering to avoid crashes

---

##  Author

**Prasad Patil**

---

##  Notes

* Full CRUD implemented (Create, Read, Update)
* Clean and modular code structure
* Backend and frontend fully integrated
* Designed for scalability and performance

---
