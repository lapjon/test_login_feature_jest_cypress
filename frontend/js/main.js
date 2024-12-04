document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();


    const username = document.getElementById('signupUsername')?.value.trim();
    //const storedUsername = localStorage.getItem('username');
    console.log('Username for Change Password:', username); // Debugging log
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    console.log('Signup Data:', { username, password }); // Debug log

    errorDiv.textContent = "";
    successDiv.textContent = "";

    // Validation
    if (!username) {
        errorDiv.textContent = "Username cannot be empty!";
        return;
    }

    if (!password) {
        errorDiv.textContent = "Password cannot be empty!";
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorDiv.textContent = "Password must be at least 8 characters long, contain an uppercase letter, and a number.";
        return;
    }

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error);
        }

       // Display success message in the UI
       successDiv.textContent = result.message;
       setTimeout(() => {
           window.location.href = '/login.html'; // Redirect after 2 seconds
       }, 2000);
    } catch (error) {
        errorDiv.textContent = error.message;
    }
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');

    errorDiv.textContent = "";
    successDiv.textContent = "";

    if (!username) {
        errorDiv.textContent = "Username cannot be empty!";
        return;
    }

    if (!password) {
        errorDiv.textContent = "Password cannot be empty!";
        return;
    }

    try { 
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error);
        }
        // Save username to localStorage
        localStorage.setItem('username', username); // Store the logged-in user's username
        
        // Display success message in the UI
        successDiv.textContent = result.message;
        setTimeout(() => {
            window.location.href = '/dashboard.html'; // Redirect after 2 seconds
        }, 2000);
    } catch (error) {
        errorDiv.textContent = error.message;
    }
});
document.getElementById('logoutButton')?.addEventListener('click', () => {
    // Redirect to the index.html page
    window.location.href = '/index.html';
});

document.getElementById('changePasswordForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Change Password form submitted"); // Debugging log

    const username = localStorage.getItem('username'); // Retrieve from localStorage
    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();
    //console.log({ currentPassword, newPassword, confirmNewPassword }); // Debugging log
    const successDiv = document.getElementById('change-password-success');
    const errorDiv = document.getElementById('change-password-error');
    

    successDiv.textContent = "";
    errorDiv.textContent = "";
    
    if (!username) {
        errorDiv.textContent = "You are not logged in. Redirecting to login page.";
        window.location.href = '/login.html';
        return;
    }
    // Validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        errorDiv.textContent = "All fields are required!";
        return;
    }

    if (newPassword !== confirmNewPassword) {
        errorDiv.textContent = "New passwords do not match!";
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        errorDiv.textContent = "New password must be at least 8 characters long, contain an uppercase letter, and a number.";
        return;
    }

    try {
        const response = await fetch('/api/users/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, currentPassword, newPassword }),
            
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error);
        }

        successDiv.textContent = result.message;
        // Clear the input fields
    
        document.getElementById('currentPassword').value = "";
        document.getElementById('newPassword').value = "";
        document.getElementById('confirmNewPassword').value = "";

    } catch (error) {
        errorDiv.textContent = error.message;
    }
});