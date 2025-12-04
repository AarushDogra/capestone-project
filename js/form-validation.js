// ========== CONTACT FORM VALIDATION ==========
(function() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;
    
    const fields = {
        name: contactForm.querySelector('[name="name"]'),
        email: contactForm.querySelector('[name="email"]'),
        message: contactForm.querySelector('[name="message"]'),
        honeypot: contactForm.querySelector('[name="website"]') // Honeypot field
    };
    
    const errorMessages = {
        name: 'Please enter your name',
        email: 'Please enter a valid email address',
        message: 'Please enter a message (at least 10 characters)',
        honeypot: 'Spam detected'
    };
    
    function showError(field, message) {
        const errorEl = field.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        } else {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            field.parentElement.appendChild(error);
        }
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('error');
    }
    
    function clearError(field) {
        const errorEl = field.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.style.display = 'none';
        }
        field.removeAttribute('aria-invalid');
        field.classList.remove('error');
    }
    
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.trim());
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    // Real-time validation
    if (fields.name) {
        fields.name.addEventListener('blur', () => {
            if (fields.name.value && !validateName(fields.name.value)) {
                showError(fields.name, errorMessages.name);
            } else {
                clearError(fields.name);
            }
        });
    }
    
    if (fields.email) {
        fields.email.addEventListener('blur', () => {
            if (fields.email.value && !validateEmail(fields.email.value)) {
                showError(fields.email, errorMessages.email);
            } else {
                clearError(fields.email);
            }
        });
    }
    
    if (fields.message) {
        fields.message.addEventListener('blur', () => {
            if (fields.message.value && !validateMessage(fields.message.value)) {
                showError(fields.message, errorMessages.message);
            } else {
                clearError(fields.message);
            }
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Honeypot check
        if (fields.honeypot && fields.honeypot.value) {
            showError(fields.honeypot, errorMessages.honeypot);
            isValid = false;
        } else if (fields.honeypot) {
            clearError(fields.honeypot);
        }
        
        // Validate all fields
        if (!validateName(fields.name.value)) {
            showError(fields.name, errorMessages.name);
            isValid = false;
        }
        
        if (!validateEmail(fields.email.value)) {
            showError(fields.email, errorMessages.email);
            isValid = false;
        }
        
        if (!validateMessage(fields.message.value)) {
            showError(fields.message, errorMessages.message);
            isValid = false;
        }
        
        if (isValid) {
            // Show success message (no backend, so just visual feedback)
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! Your message has been sent. (Note: This is a demo - no backend configured)';
            successMessage.style.display = 'block';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            // Focus first error field
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
})();

