// ============================================
// LIGHTBOX MODAL FOR GALLERY
// ============================================
//
// WHAT IT DOES:
// - Opens images in a full-screen modal when clicked
// - Allows navigation between images with arrow buttons
// - Supports keyboard navigation (Arrow keys, ESC)
// - Prevents body scrolling when lightbox is open
//
// HOW IT WORKS:
// 1. Finds all gallery items with [data-lightbox] attribute
// 2. Creates lightbox HTML structure dynamically
// 3. On click, opens image in modal overlay
// 4. Arrow buttons navigate between images
// 5. ESC key or clicking outside closes the modal
//
// USAGE:
// Add data-lightbox attribute to gallery links:
// <a href="image.jpg" data-lightbox data-caption="Image description">
// ============================================
(function() {
    let currentIndex = 0;
    let items = [];
    
    function initLightbox() {
        const galleryItems = document.querySelectorAll('[data-lightbox]');
        if (galleryItems.length === 0) return;
        
        items = Array.from(galleryItems);
        
        // Create lightbox structure
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
            <button class="lightbox-next" aria-label="Next image">&#8250;</button>
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add click handlers
        items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        });
        
        // Close handlers
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Navigation handlers
        lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
        
        lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
    }
    
    function openLightbox(index) {
        currentIndex = index;
        const lightbox = document.querySelector('.lightbox');
        const item = items[index];
        const src = item.getAttribute('href') || item.querySelector('img')?.src;
        const alt = item.getAttribute('data-caption') || item.querySelector('img')?.alt || '';
        
        lightbox.querySelector('.lightbox-image').src = src;
        lightbox.querySelector('.lightbox-image').alt = alt;
        lightbox.querySelector('.lightbox-caption').textContent = alt;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        lightbox.querySelector('.lightbox-close').focus();
    }
    
    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateLightbox(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        } else if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        
        openLightbox(currentIndex);
    }
    
    function handleKeyboard(e) {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();

