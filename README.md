Donation Processing API
Table of Contents

   1. Technology Stack
   2. File Structure
   3.  Authentication
   4.   How to Run Locally
    API Endpoints
       . User Registration and Creating Wallets
       . User Login
        .Create Wallet
        .Set Transaction PIN
        .Create Donation
       . Get Donation Counts
        .Get Single Donation
        .Get Donations in a Period
        .Process a Donation


   Deployed to render::::  https://fast-moni.onrender.com     

1. Technology Stack

    Node.js - Server-Side JavaScript Runtime
    Express.js - Web Application Framework for Node.js
    TypeScript
    MySQL - Relational Database Management System
    Sequelize - Object-Relational Mapping (ORM) for MySQL
    Render - Deployment and Hosting Platform

2. File Structure

The project's file structure is organized as follows:

    App.ts: Main application file
    Repository/: Interacting with the database
    Routes/: Express route definitions
    Controllers/: Controller functions for routes (Business logic)
    Models/: User, Donation, Wallet, TransactionPin models
    Middlewares/: Middleware for error handling and validation
    Utils/: Utility functions, e.g., Password check, password hashing, sendMail
    Env/: Environment variables
    Package.json: Project dependencies
    Package-lock.json: Dependency lock file

3. Authentication

Authentication is required for specific API endpoints, and actions are performed based on the authenticated user's context. The API uses JWT (JSON Web Tokens) authentication for secure user identification.
JWT Authentication

    Token Issuance: When a user logs in successfully, the API issues a JWT token that is included in the response.

    Token Expiration: JWT tokens have an expiration time, typically set to a specific duration after which the token becomes invalid. Users must re-authenticate once the token expires.

    Token Inclusion: To authenticate API requests, clients include the JWT token in the Authorization header of their HTTP requests.

4. How to Run Locally
  
[npm run dev]

5. API Endpoints
User Registration and Creating Wallets



POST [http://localhost:5001/api/v1/auth/register]
User Login

POST [http://localhost:5001/api/v1/auth/login]


Create Wallet

POST [http://localhost:5001/api/v1/wallets/2]


Set Transaction PIN

[http://localhost:5001/api/v1/pins/2]
Documentation for setting a transaction PIN endpoint.

Create Donation

[http://localhost:5001/api/v1/donations/2]
Get Donation Counts


POSTMAN DOC https://documenter.getpostman.com/view/29600681/2s9YJXakHX


This adjusted overview includes section headings and a structured format to make it easier for readers to navigate and understand your "Donation Processing API." You can fill in the specific details and 


