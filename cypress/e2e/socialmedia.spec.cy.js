describe('Testing Social Media app: index page and redirect links', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5000/index.html') // 
  });

  it('Test Case 1: Verify Start page loads with correct title and content', () => {
    // Verify page heading text
    cy.get('h1').should('contain.text', 'Welcome to Test Application');
    // Verify description text
    cy.get('p').should('contain.text', 'You can create a new user or log in with an existing user here!');
    // Verify Sign Up button is visible
    cy.get('a[href="/signup.html"] button').should('be.visible');
    // Verify Login button is visible 
    cy.get('a[href="/login.html"] button'). should('be.visible');
  });

  it('Test Case 2: Verify that Signup button redirects to Signup page', () => {
    // Verify Sign Up button is visible
    cy.get('a[href="/signup.html"] button').should('be.visible');
    // Click Signup button
    cy.get('a[href="/signup.html"] button').click();
    // Verify URL of Signup page
    cy.url().should('include', '/signup.html');
  });

    it('Test Case 3: Verify that Login button redirects to Login page', () => {
      // Verify Login button is visible
      cy.get('a[href="/login.html"] button').should('be.visible');
      // Click Login button
      cy.get('a[href="/login.html"] button').click();
      // Verify URL of Login page
      cy.url().should('include', '/login.html');
    });

    describe('Testing Social Media app: Signup page', () => {
      beforeEach(() => {
        cy.visit('http://localhost:5000/signup.html') // 
    });

  it('Test Case 4: Verify that user can enter username and password in input fields on Signup page', () => {
    // Generate unique username
    const uniqueUsername = `testuser_${Date.now()}`;
    const password = 'Password123';
    // Verify that the username input field is visible
    cy.get('input[name="username"]').should('be.visible');
    // Verify that the username input field label is visible
    cy.get('label[for="signupUsername"]').should('be.visible');
    // Enter username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Verify that the password input field is visible
    cy.get('input[name="password"]').should('be.visible');
    // Verify that the password input field label is visible
    cy.get('label[for="password"]').should('be.visible');
    // Enter password
    cy.get('input[name="password"]').type(password);
    // Verify that all fields contain the entered information
    cy.get('input[name="username"]').should('have.value', uniqueUsername);
    cy.get('input[name="password"]').should('have.value', password);
  });

  it('Test Case 5: Verify that Signup button creates a new user and redirects to the Login page', () => {
    // Generate unique username
    const uniqueUsername = `testuser_${Date.now()}`;
    // Enter username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter password
    cy.get('input[name="password"]').type('Password123');
    // Click Signup button
    cy.get('button[type="submit"]').click();
    // Verify success message is displayed, get success message by id
    cy.get('#success-message').should('contain.text', 'Your user was created successfully!');
    cy.wait(3000)
    // Verify user is redirected to the Login page 
    cy.url().should('include', '/login.html');  
    });
     
  it('Test Case 6: Verify error messages for missing/invalid fields on Signup page', () => {
    // Generate unique username
    const uniqueUsername = `testuser_${Date.now()}`;
     // Click on the Signup button without entering username or password
     cy.get('button[type="submit"]').click();
     // Verify Username cannot be empty!' error message
     cy.get('#error-message').should('contain.text', 'Username cannot be empty!');
     // Enter only username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Click on the Signup button without entering password
    cy.get('button[type="submit"]').click();
    // Verify Username cannot be empty!' error message
    cy.get('#error-message').should('be.visible').and('contain.text', 'Password cannot be empty!');
  });

  it('Test case 7: Verify existing username error message on Signup page', () => {
    // Posts username 'existinuser' to database prior to executing test case
    const existingUsername = 'existinguser';
    // Enter existing username
    cy.get('input[name="username"]').type(existingUsername);
    // Enter password
    cy.get('input[name="password"]').type('Password123');
    // Click on the Signup button 
    cy.get('button[type="submit"]').click();
     // Verify that the error message for existing username is displayed
    cy.get('#error-message').should('be.visible').and('contain.text', 'Hmm, it seems that username is already taken. Please choose another one!');
  });

  it('Test Case 8: Verify invalid password error message on Signup page: no uppercase letters', () => {
    // Generate unique username
    const uniqueUsername = `testuser_${Date.now()}`;
    // Enter username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter invalid password: no uppercase letters
    cy.get('input[name="password"]').type('password1');
    cy.get('button[type="submit"]').click();
    // Verify that the error message for invalid passord is displayed
    cy.get('#error-message').should('be.visible').and('contain.text', 'Password must be at least 8 characters long, contain an uppercase letter, and a number.');
    // Clear the password field
    cy.get('input[name="password"]').clear();
  });

  it('Test Case 9: Verify invalid password error message on Signup page: no numbers', () => {
    // Generate unique username
    const uniqueUsername = `testuser_${Date.now()}`;
    // Enter username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter invalid password: no numbers
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    // Verify that the error message for invalid passord is displayed
    cy.get('#error-message').should('be.visible').and('contain.text', 'Password must be at least 8 characters long, contain an uppercase letter, and a number.');
    // Clear the password field
    cy.get('input[name="password"]').clear();
  });

  it('Test Case 10: Verify invalid password error message on Signup page: no letters', () => {
    // Generate unique username
    const uniqueUsername = `testuser_${Date.now()}`;
    // Enter username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter invalid password: no letters
    cy.get('input[name="password"]').type('12345678');
    cy.get('button[type="submit"]').click();
    // Verify that the error message for invalid passord is displayed
    cy.get('#error-message').should('be.visible').and('contain.text', 'Password must be at least 8 characters long, contain an uppercase letter, and a number.');
    // Clear the password field
    cy.get('input[name="password"]').clear();
  });

  it('Test Case 11: Verify invalid password error message on Signup page: less than 8 characters', () => {
    // Generate unique username
    const uniqueUsername = `testuser_${Date.now()}`;
    // Enter username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter invalid password: less than 8 characters
    cy.get('input[name="password"]').type('Pass1');
    cy.get('button[type="submit"]').click();
    // Verify that the error message for invalid passord is displayed
    cy.get('#error-message').should('be.visible').and('contain.text', 'Password must be at least 8 characters long, contain an uppercase letter, and a number.');
    // Clear the password field
    cy.get('input[name="password"]').clear();
  });
});
});

describe('Testing Social Media app: Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/login.html') // 
});

it('Test Case 12: Verify that user can enter username and password in input fields on Login page', () => {
  const username = 'TestUser1';
  const password = 'Password123';
  // Verify that the username input field is visible
  cy.get('input[name="username"]').should('be.visible');
  // Verify that the username input field label is visible
  cy.get('label[for="username"]').should('be.visible');
  // Enter username 
  cy.get('input[name="username"]').type(username);
  // Verify that the password input field is visible
  cy.get('input[name="password"]').should('be.visible');
  // Verify that the password input field label is visible
  cy.get('label[for="password"]').should('be.visible');
  // Enter password
  cy.get('input[name="password"]').type(password);
  // Verify that all fields contain the entered information
  cy.get('input[name="username"]').should('have.value', username);
  cy.get('input[name="password"]').should('have.value', password);
});

it('Test Case 13: Verify that Login button signs in user and redirects to the Dashboard page', () => {
  const username = 'TestUser1'
  const password = 'Password123'
  // Enter username 
  cy.get('input[name="username"]').type(username);
  // Enter password
  cy.get('input[name="password"]').type(password);
  // Click Signup button
  cy.get('button[type="submit"]').click();
  // Verify success message is displayed, get success message by id
  cy.get('#success-message').should('contain.text', 'Logged in successfully!');
  cy.wait(3000)
  // Verify user is redirected to the Dashboard page 
  cy.url().should('include', '/dashboard.html'); 
  // Verify the dashboard heading is visible  
  cy.get('.dashboard-content').should('contain.text', 'Welcome to your dashboard!')
  // Verify the logout button is visible
  cy.get('#logoutButton').should('be.visible').and('contain.text', 'Log Out');
});

it('Test Case 14: Verify error messages for missing/invalid fields on Login page', () => {
    const username = 'TestUser1'
    // Click on the Login button without entering username or password
    cy.get('button[type="submit"]').click();
    // Verify Username cannot be empty!' error message
    cy.get('#error-message').should('contain.text', 'Username cannot be empty!');
     // Enter only username 
    cy.get('input[name="username"]').type(username);
    // Click on the Signup button without entering password
    cy.get('button[type="submit"]').click();
    // Verify Username cannot be empty!' error message
    cy.get('#error-message').should('be.visible').and('contain.text', 'Password cannot be empty!');
  });

  it('Test Case 15: Verify error message for incorrect password on Login page', () => {
    const username = 'TestUser1'
    // Enter username
    cy.get('input[name="username"]').type(username);
    // Enter invalid password
    cy.get('input[name="password"]').type('wrongPassword123');
    cy.get('button[type="submit"]').click();
    // Verify Incorrect password error message
    cy.get('#error-message').should('be.visible').and('contain.text', 'Incorrect password');
  });

  it('Test Case 16: Verify error messages for non-existent user on Login page', () => {
    const uniqueUsername = `testuser_${Date.now()}`;
    const uniquePassword = `testuser_${Date.now()}`;
    // Enter non-existant username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter random password
    cy.get('input[name="password"]').type(uniquePassword);
    // Click on the Signup button without entering password
    cy.get('button[type="submit"]').click();
    // Verify User not found error message
    cy.get('#error-message').should('be.visible').and('contain.text', 'User not found');
  });

  describe('Testing Social Media app: Dashboard page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5000/dashboard.html') // 
  });

  it('Test Case 17: Verify Dashboard page loads with correct title and content', () => {
    // Verify page heading text
    cy.get('.dashboard-content').should('contain.text', 'Welcome to your dashboard!')
    // Verify description text
    cy.get('p').should('contain.text', 'If you want to change your password you can do it here.')
    // Verify label for Current Password
    cy.get('label[for="currentPassword"]').should('be.visible');
    // Verify that the Current Password input field is visible
    cy.get('input[name="currentPassword"]').should('be.visible');
    // Verify label for New Password
    cy.get('label[for="newPassword"]').should('be.visible');
    // Verify that the New Password input field is visible
    cy.get('input[name="newPassword"]').should('be.visible');
    // Verify label for Confirm New Password
    cy.get('label[for="confirmNewPassword"]').should('be.visible');
    // Verify that the Confirm New Password input field is visible
    cy.get('input[name="confirmNewPassword"]').should('be.visible');
  })

  it('Test Case 18: Verify Logout button on Dashboard page redirects to Start page', () => {
    cy.get('#logoutButton').should('be.visible').and('contain.text', 'Log Out');
    cy.get('#logoutButton').click();
     // Verify user is redirected to the Login page 
     cy.url().should('include', '/index.html');
  })
}); 
describe('Change Password Tests', () => {
  beforeEach(() => {
    // Generate a unique user for change password test
    const changePasswordUser = `changePasswordUser_${Date.now()}`;
    cy.request({
      method: 'POST',
      url: '/api/users/register',
      body: {
        username: changePasswordUser,
        password: 'Password123'
      }
    }).then(() => {
      // Log in with the new user
      cy.visit('/login.html');
      cy.get('input[name="username"]').type(changePasswordUser);
      cy.get('input[name="password"]').type('Password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard.html');
    });
  });

  it('Test Case 19: Verify password change for unique user', () => {
    // Enter current password
    cy.get('input[name="currentPassword"]').type('Password123');
    // Enter a simple valid new password that meets all requirements
    const newPassword = 'NewPass1';
    cy.get('input[name="newPassword"]').type(newPassword);
    // Confirm new password
    cy.get('input[name="confirmNewPassword"]').type(newPassword);
    // Click on the "Change Password" button
    cy.get('button[type="submit"]').click();
    // Verify success message is displayed
    cy.get('#change-password-success').should('contain.text', 'Password updated successfully!');
  });

  it('Test Case 20: Verify error message for mismatching passwords', () => {
    // Enter current password
    cy.get('input[name="currentPassword"]').type('Password123');
    // Enter a simple valid new password that meets all requirements
    const newPassword = 'NewPass1';
    cy.get('input[name="newPassword"]').type(newPassword);
    // Enter new invalid password 
    cy.get('input[name="confirmNewPassword"]').type('newpass1');
    // Click on the "Change Password" button
    cy.get('button[type="submit"]').click();
    // Verify error message is displayed
    cy.get('#change-password-error').should('contain.text', 'New passwords do not match!');
  });

  it('Test Case 21: Verify error message for invalid new password: no uppercase letters', () => {
    // Enter current password
    cy.get('input[name="currentPassword"]').type('Password123');
    // Enter a new invalid password 
    const newInvalidPassword = 'newpass1';
    cy.get('input[name="newPassword"]').type(newInvalidPassword);
    // Enter new invalid password 
    cy.get('input[name="confirmNewPassword"]').type(newInvalidPassword);
    // Click on the "Change Password" button
    cy.get('button[type="submit"]').click();
    // Verify error message is displayed
    cy.get('#change-password-error').should('contain.text', 'New password must be at least 8 characters long, contain an uppercase letter, and a number.');
  });

  it('Test Case 22: Verify error message for invalid new password: no numbers', () => {
    // Enter current password
    cy.get('input[name="currentPassword"]').type('Password123');
    // Enter a new invalid password 
    const newInvalidPassword = 'NewPassword';
    cy.get('input[name="newPassword"]').type(newInvalidPassword);
    // Enter new invalid password 
    cy.get('input[name="confirmNewPassword"]').type(newInvalidPassword);
    // Click on the "Change Password" button
    cy.get('button[type="submit"]').click();
    // Verify error message is displayed
    cy.get('#change-password-error').should('contain.text', 'New password must be at least 8 characters long, contain an uppercase letter, and a number.');
  });

  it('Test Case 23: Verify error message for invalid new password: no letters', () => {
    // Enter current password
    cy.get('input[name="currentPassword"]').type('Password123');
    // Enter a new invalid password 
    const newInvalidPassword = '12345678';
    cy.get('input[name="newPassword"]').type(newInvalidPassword);
    // Enter new invalid password 
    cy.get('input[name="confirmNewPassword"]').type(newInvalidPassword);
    // Click on the "Change Password" button
    cy.get('button[type="submit"]').click();
    // Verify error message is displayed
    cy.get('#change-password-error').should('contain.text', 'New password must be at least 8 characters long, contain an uppercase letter, and a number.');
  });

  it('Test Case 24: Verify error message for invalid new password: less than 8 characters', () => {
    // Enter current password
    cy.get('input[name="currentPassword"]').type('Password123');
    // Enter a new invalid password 
    const newInvalidPassword = 'Pass123';
    cy.get('input[name="newPassword"]').type(newInvalidPassword);
    // Enter new invalid password 
    cy.get('input[name="confirmNewPassword"]').type(newInvalidPassword);
    // Click on the "Change Password" button
    cy.get('button[type="submit"]').click();
    // Verify error message is displayed
    cy.get('#change-password-error').should('contain.text', 'New password must be at least 8 characters long, contain an uppercase letter, and a number.');
  });

  it('Test Case 25: Verify error message for missing field', () => {
    // Enter current password
    cy.get('input[name="currentPassword"]').type('Password123');
    // Enter a new password password 
    const newPassword = 'Pass123';
    cy.get('input[name="newPassword"]').type(newPassword);
    // Click on the "Change Password" button without confirming password
    cy.get('button[type="submit"]').click();
    // Verify error message is displayed
    cy.get('#change-password-error').should('contain.text', 'All fields are required!');
});

describe('Testing Social Media app: End-2-End Happy Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/index.html') // 
});

  it('Test Case 26: End-2-End Happy Flow: Signup > Login > Change Password > Logout', () => {
    const uniqueUsername = `testuser_${Date.now()}`;
    const password = 'Password123';
    const newPassword = 'NewPass1';
    // Verify Sign Up button is visible
    cy.get('a[href="/signup.html"] button').should('be.visible');
    // Click Signup button
    cy.get('a[href="/signup.html"] button').click();
    cy.wait(3000)
    // Verify URL of Signin page
    cy.url().should('include', '/signup.html');
    // Generate unique username
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter password
    cy.get('input[name="password"]').type(password);
    // Click Signup button
    cy.get('button[type="submit"]').click();
    // Verify success message is displayed, get success message by id
    cy.get('#success-message').should('contain.text', 'Your user was created successfully!');
    cy.wait(3000)
    // Verify user is redirected to the Login page 
    cy.url().should('include', '/login.html'); 
    // Enter username 
    cy.get('input[name="username"]').type(uniqueUsername);
    // Enter password
    cy.get('input[name="password"]').type(password);
    // Click Login button
    cy.get('button[type="submit"]').click();
    // Verify success message is displayed, get success message by id
    cy.get('#success-message').should('contain.text', 'Logged in successfully!');
    cy.wait(3000)
    // Verify user is redirected to the Dashboard page 
    cy.url().should('include', '/dashboard.html'); 
    // Enter current password
    cy.get('input[name="currentPassword"]').type(password);
    // Enter new password
    cy.get('input[name="newPassword"]').type(newPassword);
    // Confirm new password
    cy.get('input[name="confirmNewPassword"]').type(newPassword);
    // Click on the "Change Password" button
    cy.get('button[type="submit"]').click();
    // Verify success message is displayed
    cy.get('#change-password-success').should('contain.text', 'Password updated successfully!');
    // Verify Logout button is visible
    cy.get('#logoutButton').should('be.visible').and('contain.text', 'Log Out');
    // Click on the Logout button
    cy.get('#logoutButton').click();
    cy.wait(3000)
    // Verify user is redirected to the Login page 
    cy.url().should('include', '/index.html');  
    // Verify page heading text
    cy.get('h1').should('contain.text', 'Welcome to Test Application');
   });
  });
 });
});
