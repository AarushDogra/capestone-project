// ============================================
// SIMPLIFIED FAQ ACCORDION
// ============================================
//
// WHAT: Makes FAQ items expandable/collapsible
// HOW: Toggles max-height CSS property
// WHY: Better organization of FAQ content
//
// HTML STRUCTURE:
// <div class="accordion-item">
//   <button class="accordion-button">Question</button>
//   <div class="accordion-content">
//     <div class="accordion-content-inner">Answer</div>
//   </div>
// </div>
// ============================================

(function() {
    // Step 1: Find all accordion items
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Step 2: For each item, add click handler
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-content');
        
        // Skip if elements don't exist
        if (!button || !content) return;
        
        // Step 3: When button is clicked, toggle content
        button.addEventListener('click', () => {
            // Check if currently open
            const isOpen = item.classList.contains('active');
            
            // Close all other items first
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = null;  // Collapse
                    }
                }
            });
            
            // Toggle current item
            if (isOpen) {
                // Close it
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                // Open it
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';  // Expand to full height
            }
        });
    });
})();
