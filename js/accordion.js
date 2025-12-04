// ========== FAQ ACCORDION ==========
(function() {
    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const button = item.querySelector('.accordion-button');
            const content = item.querySelector('.accordion-content');
            
            if (!button || !content) return;
            
            // Set initial ARIA attributes
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', content.id || `accordion-${Math.random().toString(36).substr(2, 9)}`);
            
            if (!content.id) {
                content.id = button.getAttribute('aria-controls');
            }
            
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                // Close all other items (optional - remove if you want multiple open)
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherButton = otherItem.querySelector('.accordion-button');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        if (otherButton && otherContent) {
                            otherButton.setAttribute('aria-expanded', 'false');
                            otherContent.style.maxHeight = null;
                            otherItem.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current item
                button.setAttribute('aria-expanded', !isExpanded);
                
                if (isExpanded) {
                    content.style.maxHeight = null;
                    item.classList.remove('active');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    item.classList.add('active');
                }
            });
            
            // Keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccordion);
    } else {
        initAccordion();
    }
})();

