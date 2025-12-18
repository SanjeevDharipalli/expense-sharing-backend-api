Expense Sharing Backend API:

A simple backend REST API for an Expense Sharing Application (similar to Splitwise) built using Node.js and Express.js.
This API allows users to create groups, add expenses, track balances, and settle payments.

Features:-

=>Create expense groups.
=>Add expenses within a group.
=>Automatically calculate balances.
=>Settle payments between users.
=>RESTful API structure.
=>In-memory data storage (no database required).


Tech Stack:-
=>Node.js
=>Express.js
=>UUID
=>Postman (for API testing)



PROJECT STRUCTURE:-
expense-sharing-backend/
│
├── src/
│   ├── controllers/
│   │   ├── groupController.js
│   │   ├── expenseController.js
│   │   └── settlementController.js
│   │
│   ├── routes/
│   │   ├── groupRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── settlementRoutes.js
│   │
│   ├── services/
│   │   └── balanceService.js
│   │
│   ├── data/
│   │   └── store.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
├── README.md
└── package-lock.json

INSTALLATION AND SETUP:-
  1.Clone the Repository:-
   git clone https://github.com/SanjeevDharipalli/expense-sharing-backend-api.git
   cd expense-sharing-backend-api
  2.Install dependencies:-
   npm install
  3.Start the server:-
   npm start
   server will run on:
   http://localhost:3000
API ENDPOINTS:-
 =>GET /
  Expense Sharing Backend API is running
 =>Create Group
  POST /groups
   Request Body (JSON):
    {
  "name": "Friends Trip",
  "members": ["rahul", "sriya", "tony"]
}
=>Response:
  json:
  {
  "id": "uuid",
  "name": "Friends Trip",
  "members": ["rahul", "sriya", "tony"]
}
=>Add Expense
  POST /expenses
   Request Body (JSON):
    {
  "groupId": "group-id",
  "paidBy": "rahul",
  "amount": 3000,
  "splitType": "equal",
  "splits": [
    { "userId": "rahul", "share": 1000 },
    { "userId": "sriya", "share": 1000 },
    { "userId": "tony", "share": 1000 }
  ]
}
 Response:
 json:
  {
  "id": "expense-id",
  "groupId": "group-id",
  "paidBy": "rahul",
  "amount": 3000,
  "splitType": "equal",
  "splits": [...]
}
=>Settle Payment
  POST /settlements
   Request Body (JSON):
    {
  "from": "sriya",
  "to": "rahul"
   }
 Response:
  json:
  {
  "message": "Settlement completed"
}


API TESTING:
 =>APIs were tested using Postman.
=>Testing is not required to be submitted.
=>Used only to verify correct API behavior.







 





