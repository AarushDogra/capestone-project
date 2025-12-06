// ============================================
// NOVARIFT - SIMPLIFIED MAIN JAVASCRIPT
// ============================================
// 
// This file contains ONLY the essential JavaScript:
// 1. Theme toggle (dark/light mode) - REQUIRED
// 2. Basic mobile hamburger menu - REQUIRED
//
// All other features removed to keep code simple and easy to understand
// ============================================

// ========== THEME TOGGLE ==========
// WHAT: Switches between dark and light themes
// HOW: Changes data-theme attribute on <html> element
// WHY: CSS uses this attribute to apply different colors
(function() {
    // Step 1: Get the theme toggle button and HTML element
    const themeToggle = document.querySelector('.theme-toggle');  // Button in navbar
    const html = document.documentElement;                        // <html> tag
    
    // Step 2: Load saved theme from browser storage (or use 'dark' as default)
    // localStorage saves data even after browser closes
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Step 3: Apply the saved theme immediately when page loads
    html.setAttribute('data-theme', savedTheme);
    
    // Step 4: Only run if theme button exists (prevents errors)
    if (themeToggle) {
        // Step 5: Set the correct icon (☀️ for dark mode, 🌙 for light mode)
        updateThemeIcon(savedTheme);
        
        // Step 6: Listen for button clicks
        themeToggle.addEventListener('click', () => {
            // Get current theme
            const currentTheme = html.getAttribute('data-theme');
            
            // Toggle: if dark → light, if light → dark
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            html.setAttribute('data-theme', newTheme);
            
            // Save to browser storage so it persists
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeIcon(newTheme);
        });
    }
    
    // Helper function: Updates the icon emoji
    function updateThemeIcon(theme) {
        if (themeToggle) {
            // Show sun if dark mode (clicking will switch to light)
            // Show moon if light mode (clicking will switch to dark)
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
})();

// ========== BASIC MOBILE MENU ==========
// WHAT: Shows/hides navigation menu on mobile devices
// HOW: Toggles CSS classes when hamburger button is clicked
// WHY: Menu is hidden on mobile, shown on desktop
(function() {
    // Step 1: Get the hamburger button and menu
    const hamburger = document.querySelector('.hamburger');  // Hamburger button
    const navMenu = document.querySelector('nav ul');        // Navigation menu
    
    // Step 2: Exit if elements don't exist (prevents errors)
    if (!hamburger || !navMenu) return;
    
    // Step 3: When hamburger is clicked, toggle menu
    hamburger.addEventListener('click', () => {
        // Toggle 'active' class on button (CSS animates icon to X)
        hamburger.classList.toggle('active');
        
        // Toggle 'mobile-open' class on menu (CSS slides menu down)
        navMenu.classList.toggle('mobile-open');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('mobile-open')) {
            document.body.style.overflow = 'hidden';  // Lock scrolling
        } else {
            document.body.style.overflow = '';       // Allow scrolling
        }
    });
    
    // Step 4: Close menu when clicking any link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
            document.body.style.overflow = '';  // Allow scrolling
        });
    });
    
    // Step 5: Close menu when pressing ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
            document.body.style.overflow = '';
        }
    });
})();
