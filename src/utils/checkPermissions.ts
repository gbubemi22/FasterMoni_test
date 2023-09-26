// import { Response, NextFunction, Request } from 'express';

// import { StatusCodes } from 'http-status-codes';

// const checkPermission = (allowedTypes: string[]) => {
//   return (req: any, res: Response, next: NextFunction) => {
//     const requestUser = req.user as User;
//     const resourceUserId = req.params.userId;

//     console.log(requestUser);
//     console.log(resourceUserId);
//     console.log(typeof resourceUserId);

//     if (
//       allowedTypes.includes(requestUser.type) 
//     ) {
//       next();
//     } else {
//       res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ message: 'Not authorized to access this route' });
//     }
//   };
// };


// export default checkPermission;



Donation Processing API
Table of Contents

    Technology Stack
    File Structure
    Authentication
    How to Run Locally
    API Endpoints
        User Registration and Creating Wallets
        User Login
        Create Wallet
        Set Transaction PIN
        Create Donation
        Get Donation Counts
        Get Single Donation
        Get Donations in a Period
        Process a Donation

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

[Provide instructions on how to run your API locally.]
5. API Endpoints
User Registration and Creating Wallets

[Documentation for user registration and wallet creation endpoints.]
User Login

[Documentation for user login endpoint.]
Create Wallet

[Documentation for creating a wallet endpoint.]
Set Transaction PIN

[Documentation for setting a transaction PIN endpoint.]
Create Donation

[Documentation for creating a donation endpoint.]
Get Donation Counts

[Documentation for getting donation counts endpoint.]
Get Single Donation

[Documentation for getting a single donation endpoint.]
Get Donations in a Period

[Documentation for getting donations within a specified time period.]
Process a Donation

[Documentation for processing a donation endpoint.]

This adjusted overview includes section headings and a structured format to make it easier for readers to navigate and understand your "Donation Processing API." You can fill in the specific details and 
