// ============================================
// SIMPLIFIED CONTACT FORM VALIDATION
// ============================================
//
// WHAT: Validates form fields before submission
// HOW: Checks if fields are filled correctly
// WHY: Prevents submitting invalid data
//
// VALIDATION RULES:
// - Name: At least 2 characters
// - Email: Must contain @ and .
// - Message: At least 10 characters
// ============================================

(function() {
    // Step 1: Get the contact form
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;  // Exit if form doesn't exist
    
    // Step 2: Get all form fields
    const nameField = contactForm.querySelector('[name="name"]');
    const emailField = contactForm.querySelector('[name="email"]');
    const messageField = contactForm.querySelector('[name="message"]');
    const honeypotField = contactForm.querySelector('[name="website"]');  // Hidden spam trap
    
    // Step 3: Validation functions
    function isValidName(name) {
        return name.trim().length >= 2;  // At least 2 characters
    }
    
    function isValidEmail(email) {
        return email.includes('@') && email.includes('.');  // Simple email check
    }
    
    function isValidMessage(message) {
        return message.trim().length >= 10;  // At least 10 characters
    }
    
    // Step 4: Show error message
    function showError(field, message) {
        // Remove old error if exists
        const oldError = field.parentElement.querySelector('.error-message');
        if (oldError) oldError.remove();
        
        // Create new error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        field.parentElement.appendChild(error);
        
        // Add error class to field
        field.classList.add('error');
    }
    
    // Step 5: Remove error message
    function clearError(field) {
        const error = field.parentElement.querySelector('.error-message');
        if (error) error.remove();
        field.classList.remove('error');
    }
    
    // Step 6: When form is submitted, validate all fields
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent form from submitting normally
        
        let hasErrors = false;
        
        // Check honeypot (spam trap - should be empty)
        if (honeypotField && honeypotField.value) {
            showError(honeypotField, 'Spam detected');
            hasErrors = true;
        }
        
        // Validate name
        if (!isValidName(nameField.value)) {
            showError(nameField, 'Please enter your name (at least 2 characters)');
            hasErrors = true;
        } else {
            clearError(nameField);
        }
        
        // Validate email
        if (!isValidEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            hasErrors = true;
        } else {
            clearError(emailField);
        }
        
        // Validate message
        if (!isValidMessage(messageField.value)) {
            showError(messageField, 'Please enter a message (at least 10 characters)');
            hasErrors = true;
        } else {
            clearError(messageField);
        }
        
        // If no errors, show success message
        if (!hasErrors) {
            const success = document.createElement('div');
            success.className = 'success-message';
            success.textContent = 'Thank you! Your message has been sent.';
            contactForm.appendChild(success);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                success.remove();
            }, 5000);
        }
    });
})();
