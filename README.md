# Finance Data processing Backend
As per the assessment detail this is a backend project built with Node.js, Express and MongoDB Atlas.


# About
I made this project to handle financial records with different user roles. Admin can manage everything, analyst can see the dashboard and viewer can only read the records.


# Tech Stack
- Node.js
- Express
- MongoDB Atlas
- JWT
- bcryptjs


# setup
Clone the project and run
...
npm install
...
npm run dev

Add a .env file with these values
PORT=3000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d


# user roles
- Admin can do everything - create, update, delete records and manage users.
- Analyst can view records and access the dashboard but cannot modify anything
- Viewer can only view records, nothing else.


# API endpoints
Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Records
- GET /api/records
- GET /api/records/:id
- POST /api/records
- PATCH /api/records/:id
- DELETE /api/records/:id

Dashboard
- GET /api/dashboard/summary
- GET /api/dashboard/categories
- GET /api/dashboard/trends
- GET /api/dashboard/recent

Users
- GET /api/users
- GET /api/users/:id
- POST /api/users
- PATCH /api/users/:id
- DELETE /api/users/:id

# Authentication
Send token in headers like this
Authorization: Bearer your_token


# Test Accounts
Admin - admin@finance.com / admin123
Analyst - analyst@finance.com / analyst123
Viewer - viewer@finance.com / viewer123


# Notes
- Records are soft deleted not permanently removed
- Pagination is added on records
- Records can be filtered by type, category and date


# Live API
Link will be added after deployment
