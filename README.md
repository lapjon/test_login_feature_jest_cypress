**Social Media Login Feature with Jest and Cypress**

This project is a simple social media application login feature that allows users to register, log in, and change their passwords. It is built using Node.js, Express and SQLite, with testing implemented through Jest (unit tests) and Cypress (end-to-end tests).
The main objective is to demonstrate Cypress end-to-end implementation for front-end testing. 

Key features:
- User registration: Users can register with a unique username and password, with password requirements.
- User login: Users can log in after registering.
- Password change functionality: Users who are logged in can change their password.
- Unit testing with Jest for database communication using mock data.
- End-to-end testing with Cypress for UI interaction.

**Project Structure Summary**

This project is structured around a few core components:
- Server: The main server (`server.js`) is built with **Express.js**, handling HTTP requests and serving frontend files.
- Models: The **Sequelize** models (e.g., `user.js`) define the schema for user data and include helper functions (`userFunctions.js`) to interact with the SQLite database.
- Routes: The **routes** (`userRoutes.js`) handle user-related API requests, such as registration, login, and password change.
- Frontend: The **views** folder contains HTML files for registration (`signup.html`), login (`login.html`), and dashboard (`dashboard.html`). It also includes CSS (`styles.css`) and JavaScript (`main.js`) for client-side logic.
- Tests: Testing is done using **Jest** for unit tests (`user.test.js`) to verify server-side logic, and **Cypress** for end-to-end tests of the user interface.
- Continuous Integration: A **GitHub Actions** workflow (`ci.yml`) is used to automate testing on each push.


**Technologies Used**
- Node.js: JavaScript runtime environment.
- Express.js: Web framework for Node.js.
- SQLite: Lightweight database.
- Sequelize: ORM for working with the SQLite database.
- Jest: Unit testing framework.
- Cypress: End-to-end testing framework.

  
**Cypress Test cases:**
- TC1: Verify Start page loads with correct title and content 
- TC2: Verify that Signup button redirects to Signup page 
- TC3: Verify that Login button redirects to Login page 
- TC4: Verify that user can enter username and password input fields on Signup page
- TC5: Verify that Signup button creates a new user and redirects to the Login page
- TC6: Verify error messages for missing/invalid fields on Signup page 
- TC7: Verify existing username error message on Signup page
- TC8: Verify invalid password error message on Signup page: no uppercase letters
- TC9: Verify invalid password error message on Signup page: no numbers
- TC10: Verify invalid password error message on Signup page: no letters
- TC11: Verify invalid password error message on Signup page: less than 8 characters
- TC12: Verify that user can enter username and password in input fields on Login page
- TC13: Verify that Login button signs in user and redirects to the Dashboard page 
- TC14: Verify error messages for missing/invalid fields on Login page 
- TC15: Verify error message for incorrect password on Login page 
- TC16: Verify error message for non-existent user on Login page 
- TC17: Verify Dashboard page loads with correct title and content 
- TC18: Verify Logout button on Dashboard page redirects to Start page
- TC19: Verify change password flow for unique user
- TC20: Verify error message for mismatching passwords 
- TC21: Verify error message for invalid new password: no uppercase letter
- TC22: Verify error message for invalid new password: no numbers
- TC23: Verify error message for invalid new password: no letters
- TC24: Verify error message for invalid new password: less than 8 characters
- TC25: Verify error message for missing fields
- TC26: End-2-End Happy Flow: Signup > Login > Change Password > Logout 

**Prerequisites and dependencies required for running the project in your IDE:**

Make sure you have the following installed:
- Node.js (v14 or higher)
- Git (for cloning the repository)
- Express: For creating the server and handling HTTP requests.
- Sequelize: For interacting with the SQLite database.
- SQLite: For storing user data.
- Jest: For unit testing the server-side functionality.
- Cypress: For end-to-end testing the user interface.

**Running the Application**

To start the server, run:
- npm start

The server will start on `http://localhost:5000`. You can then access the homepage to register or log in.

To run unit tests with Jest:
- npm run test

To open the Cypress GUI for local testing:
- npx cypress open

This command will open the Cypress Test Runner, where you can manually run and observe each test. The current setup with GitHub actions will allow for Cypress to run in headless mode. 

