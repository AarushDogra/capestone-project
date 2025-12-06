// ============================================
// SIMPLIFIED LIGHTBOX FOR GALLERY
// ============================================
//
// WHAT: Opens images in full-screen when clicked
// HOW: Creates a modal overlay and shows the image
// WHY: Better viewing experience for gallery images
//
// USAGE: Add data-lightbox to gallery links
// <a href="image.jpg" data-lightbox>...</a>
// ============================================

(function() {
    // Step 1: Find all gallery items with data-lightbox attribute
    const galleryItems = document.querySelectorAll('[data-lightbox]');
    
    // Exit if no gallery items found
    if (galleryItems.length === 0) return;
    
    // Step 2: Create lightbox HTML structure
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <div class="lightbox-content">
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Step 3: When gallery item is clicked, open lightbox
    galleryItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();  // Prevent default link behavior
            
            // Get image source and caption
            const src = item.getAttribute('href') || item.querySelector('img')?.src;
            const caption = item.getAttribute('data-caption') || item.querySelector('img')?.alt || '';
            
            // Set image and caption
            lightbox.querySelector('.lightbox-image').src = src;
            lightbox.querySelector('.lightbox-image').alt = caption;
            lightbox.querySelector('.lightbox-caption').textContent = caption;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';  // Prevent scrolling
        });
    });
    
    // Step 4: Close lightbox when close button is clicked
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';  // Allow scrolling
    });
    
    // Step 5: Close lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Step 6: Close lightbox when pressing ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
})();
