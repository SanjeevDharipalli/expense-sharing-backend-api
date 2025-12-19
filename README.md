# Expense Sharing Backend API

A simple backend API for managing shared expenses between users, similar to Splitwise.

## Features Implemented

- Create groups
- Add shared expenses
- Supported split types:
  - Equal split
  - Exact amount split
  - Percentage split
- Track who owes whom
- User-wise balance view
- Balance simplification
- Settle dues between users

## Tech Stack

- Node.js
- Express.js
- UUID
- In-memory data store

## Project Structure

src/
├── app.js
├── server.js
├── data/
│ └── store.js
├── controllers/
│ ├── groupController.js
│ ├── expenseController.js
│ └── settlementController.js
├── routes/
│ ├── groupRoutes.js
│ ├── expenseRoutes.js
│ └── settlementRoutes.js
├── services/
│ └── balanceService.js

## API Endpoints

### Create Group
**POST** `/groups`

```json
{
  "name": "Friends Trip",
  "members": ["rahul", "sriya", "tony"]
}
```Response
{
    "id": "c44c63d4-e7c0-499f-b783-01fcced84909",
    "name": "Friends Trip",
    "members": [
        "rahul",
        "sriya",
        "tony"
    ]
}
### Add Expense (Equal Split)
 **POST** `/expenses`

 ```json
 {
  "groupId": "<c44c63d4-e7c0-499f-b783-01fcced84909>",
  "paidBy": "rahul",
  "amount": 300,
  "splitType": "equal",
  "splits": ["rahul", "sriya", "tony"]
}
```Response
{
    "id": "8e4e8f0f-07b5-41ca-9ec7-344e1fa02d62",
    "groupId": "c44c63d4-e7c0-499f-b783-01fcced84909",
    "paidBy": "rahul",
    "amount": 300,
    "splitType": "equal",
    "splits": [
        {
            "userId": "rahul",
            "share": 100
        },
        {
            "userId": "sriya",
            "share": 100
        },
        {
            "userId": "tony",
            "share": 100
        }
    ]
}

### Add Expense (Exact Split)
**POST** `/expenses`
 ```json
 {
  "groupId": "<c44c63d4-e7c0-499f-b783-01fcced84909>",
  "paidBy": "rahul",
  "amount": 300,
  "splitType": "exact",
  "splits": [
    { "userId": "rahul", "share": 100 },
    { "userId": "sriya", "share": 100 },
    { "userId": "tony", "share": 100 }
  ]
}
```Response
{
    "id": "f8d666b3-a6be-48d5-bbdb-70f56c6d93e6",
    "groupId": "<c44c63d4-e7c0-499f-b783-01fcced84909>",
    "paidBy": "rahul",
    "amount": 300,
    "splitType": "exact",
    "splits": [
        {
            "userId": "rahul",
            "share": 100
        },
        {
            "userId": "sriya",
            "share": 100
        },
        {
            "userId": "tony",
            "share": 100
        }
    ]
}
### Add Expense (Percentage Split)
**POST** `/expenses`
 ```json
{
  "groupId": "c44c63d4-e7c0-499f-b783-01fcced84909",
  "paidBy": "tony",
  "amount": 400,
  "splitType": "percentage",
  "splits": [
    { "userId": "rahul", "percentage": 50 },
    { "userId": "sriya", "percentage": 25 },
    { "userId": "tony", "percentage": 25 }
  ]
}
```Response
{
    "id": "e7c8760e-adeb-4649-bffa-314cd5fde5dc",
    "groupId": "c44c63d4-e7c0-499f-b783-01fcced84909",
    "paidBy": "tony",
    "amount": 400,
    "splitType": "percentage",
    "splits": [
        {
            "userId": "rahul",
            "share": 200
        },
        {
            "userId": "sriya",
            "share": 100
        },
        {
            "userId": "tony",
            "share": 100
        }
    ]
}
### View All Balances
**GET** `/settlements` 
```Response
{
    "rahul": {
        "tony": 100
    },
    "sriya": {
        "rahul": 100,
        "tony": 100
    }
}
### View User-Wise Balances
**GET** `/settlements/UserId`
```Response
{
    "tony": 200
}
### Settle Dues

**POST** `/settlements/settle`
```json
{
  "from": "rahul",
  "to": "tony"
}
```Response
{
    "message": "No dues to settle"
}

## HOW TO RUN
npm install
npm start
```Server runs on:
http://localhost:3000

 




