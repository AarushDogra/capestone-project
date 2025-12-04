// ============================================
// NOVARIFT - MAIN JAVASCRIPT
// ============================================
// 
// This file handles:
// 1. Theme toggle (dark/light mode)
// 2. Mobile hamburger menu
// 3. Link prefetching on hover
// 4. Smooth scroll for anchor links
//
// All code is wrapped in IIFE (Immediately Invoked Function Expression)
// to avoid polluting the global scope
// ============================================

// ========== THEME TOGGLE FUNCTIONALITY ==========
/*
   WHAT IT DOES:
   - Allows users to switch between dark and light themes
   - Saves preference in browser's localStorage
   - Persists theme choice across page reloads
   - Updates the icon (☀️ for dark mode, 🌙 for light mode)
   
   HOW IT WORKS:
   1. Checks localStorage for saved theme preference
   2. Sets data-theme attribute on <html> element
   3. CSS uses this attribute to apply correct color scheme
   4. When button clicked, toggles theme and saves to localStorage
*/
(function() {
    // Get references to DOM elements
    const themeToggle = document.querySelector('.theme-toggle');  // The toggle button
    const html = document.documentElement;                        // <html> element
    
    // Load saved theme from browser storage, or default to 'dark'
    // localStorage persists data even after browser closes
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme immediately on page load
    // CSS uses [data-theme="light"] selector to override colors
    html.setAttribute('data-theme', savedTheme);
    
    // Only run if theme toggle button exists
    if (themeToggle) {
        // Set the correct icon based on current theme
        updateThemeIcon(savedTheme);
        
        // Listen for clicks on the theme toggle button
        themeToggle.addEventListener('click', () => {
            // Get current theme from HTML attribute
            const currentTheme = html.getAttribute('data-theme');
            
            // Toggle: if dark, switch to light; if light, switch to dark
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            html.setAttribute('data-theme', newTheme);
            
            // Save to localStorage so it persists
            localStorage.setItem('theme', newTheme);
            
            // Update the icon to match new theme
            updateThemeIcon(newTheme);
        });
    }
    
    // Helper function to update the icon emoji
    function updateThemeIcon(theme) {
        if (themeToggle) {
            // If in dark mode, show sun icon (clicking will switch to light)
            // If in light mode, show moon icon (clicking will switch to dark)
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            
            // Update aria-label for screen readers
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        }
    }
})();

// ========== MOBILE HAMBURGER MENU ==========
/*
   WHAT IT DOES:
   - Shows/hides navigation menu on mobile devices
   - Animates hamburger icon (3 lines → X)
   - Prevents body scrolling when menu is open
   - Closes menu when clicking a link or pressing ESC
   - Implements focus trap for keyboard accessibility
   
   HOW IT WORKS:
   1. Hamburger button toggles 'active' class (CSS animates icon)
   2. Menu toggles 'mobile-open' class (CSS slides it down)
   3. Body overflow is hidden when menu is open
   4. Focus trap keeps keyboard focus within menu
*/
(function() {
    // Get references to DOM elements
    const hamburger = document.querySelector('.hamburger');      // Hamburger button
    const navMenu = document.querySelector('nav ul');             // Navigation menu
    const navLinks = document.querySelectorAll('nav ul li a');   // All menu links
    
    // Exit early if elements don't exist (prevents errors)
    if (!hamburger || !navMenu) return;
    
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', () => {
        // Toggle 'active' class - CSS transforms hamburger to X
        hamburger.classList.toggle('active');
        
        // Toggle 'mobile-open' class - CSS slides menu down
        navMenu.classList.toggle('mobile-open');
        
        // Prevent body from scrolling when menu is open
        // This prevents background content from scrolling behind menu
        if (navMenu.classList.contains('mobile-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';  // Restore scrolling
        }
    });
    
    // Close menu when user clicks any navigation link
    // This provides better UX - menu closes after navigation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
            document.body.style.overflow = '';  // Restore scrolling
        });
    });
    
    // Close menu when user presses ESC key
    // Standard keyboard shortcut for closing modals/menus
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
            document.body.style.overflow = '';
            hamburger.focus();  // Return focus to hamburger button
        }
    });
    
    // FOCUS TRAP - Accessibility feature
    // Keeps keyboard focus within the menu when it's open
    // Prevents users from tabbing to elements behind the menu
    const firstFocusable = navLinks[0];           // First link in menu
    const lastFocusable = navLinks[navLinks.length - 1];  // Last link in menu
    
    navMenu.addEventListener('keydown', (e) => {
        // Only trap focus when menu is open
        if (!navMenu.classList.contains('mobile-open')) return;
        
        // If user presses Tab key
        if (e.key === 'Tab') {
            // Shift+Tab (going backwards)
            if (e.shiftKey) {
                // If focus is on first item and going backwards, wrap to last
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();  // Stop default Tab behavior
                    lastFocusable.focus();  // Move focus to last item
                }
            } 
            // Regular Tab (going forwards)
            else {
                // If focus is on last item and going forwards, wrap to first
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();  // Stop default Tab behavior
                    firstFocusable.focus();  // Move focus to first item
                }
            }
        }
    });
})();

// ========== LINK PREFETCHING ON HOVER ==========
/*
   WHAT IT DOES:
   - Preloads linked pages when user hovers over a link
   - Makes navigation feel instant when user clicks
   - Only prefetches once per link (performance optimization)
   
   HOW IT WORKS:
   1. Finds all links with data-prefetch attribute
   2. When user hovers, creates a <link rel="prefetch"> tag
   3. Browser downloads the page in background
   4. When user clicks, page loads instantly
   
   USAGE:
   Add data-prefetch attribute to any link: <a href="page.html" data-prefetch>
*/
(function() {
    // Find all links that should be prefetched
    const prefetchLinks = document.querySelectorAll('[data-prefetch]');
    
    prefetchLinks.forEach(link => {
        // Listen for mouse hover
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            
            // Only prefetch if href exists and hasn't been prefetched already
            if (href && !document.querySelector(`link[href="${href}"]`)) {
                // Create a prefetch link tag
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';  // Tells browser to prefetch
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);  // Add to page head
            }
        }, { once: true });  // Only run once per link (performance)
    });
})();

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
/*
   WHAT IT DOES:
   - Makes clicking anchor links (like #section) scroll smoothly
   - Instead of instant jump, page smoothly scrolls to target
   
   HOW IT WORKS:
   1. Finds all links that start with # (anchor links)
   2. Prevents default jump behavior
   3. Uses scrollIntoView with smooth behavior
   
   EXAMPLE:
   <a href="#about">Go to About</a> will smoothly scroll to <section id="about">
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" (empty anchor)
        if (href === '#') return;
        
        // Prevent default instant jump
        e.preventDefault();
        
        // Find the target element
        const target = document.querySelector(href);
        
        if (target) {
            // Smoothly scroll to target
            target.scrollIntoView({
                behavior: 'smooth',  // Smooth animation instead of instant
                block: 'start'      // Align to top of viewport
            });
        }
    });
});

