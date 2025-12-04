# NovaRift Website

A modern, responsive static website for NovaRift - a tactical arena shooter game. Built with vanilla HTML, CSS, and JavaScript.

## Features

- 🎨 **Modern Design**: Valorant-inspired UI with dark/light theme toggle
- 📱 **Fully Responsive**: Mobile-first design with hamburger menu
- ♿ **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- 🚀 **Performance**: Lazy loading images, CSS-only animations
- 🎭 **Interactive Components**: Lightbox gallery, accordion FAQ, form validation
- 🎬 **Video Hero**: Autoplaying background video with fallback

## Project Structure

```
capestone/
├── index.html          # Homepage with hero video
├── agents.html         # Agent showcase
├── maps.html           # Map gallery
├── weapons.html        # Weapon arsenal
├── about.html          # About page with trailer
├── gallery.html        # Image gallery with lightbox
├── contact.html        # Contact form
├── faq.html            # FAQ accordion
├── css/                # Stylesheets
│   ├── style.css       # Global styles & CSS variables
│   ├── navbar.css      # Navigation & hamburger menu
│   ├── home.css        # Hero section
│   ├── agents.css      # Agent cards
│   ├── maps.css        # Map cards
│   ├── weapons.css     # Weapon cards
│   ├── about.css       # About page styles
│   ├── gallery.css     # Gallery grid
│   ├── lightbox.css    # Lightbox modal
│   ├── contact.css     # Contact form
│   ├── faq.css         # FAQ accordion
│   └── footer.css      # Footer component
├── js/                 # JavaScript modules
│   ├── main.js         # Theme toggle, hamburger menu, prefetch
│   ├── lightbox.js     # Gallery lightbox functionality
│   ├── form-validation.js  # Contact form validation
│   └── accordion.js    # FAQ accordion
├── assets/             # Media assets
│   ├── images/         # Image files
│   ├── video/          # Video files
│   └── icons/          # Icons & favicon
├── manifest.json       # PWA manifest
└── README.md           # This file
```

## Local Development

### Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser
   - For best results, use a local server (see below)

### Using a Local Server

#### Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Node.js (http-server)
```bash
npx http-server -p 8000
```

#### VS Code Live Server
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

Then visit `http://localhost:8000` in your browser.

## Customization

### Hero Video

To replace the hero video on the homepage:

1. Place your video file in `assets/video/hero-loop.mp4`
2. Update `index.html`:
   ```html
   <video class="hero-video" autoplay muted loop playsinline poster="assets/images/hero-poster.jpg">
       <source src="assets/video/hero-loop.mp4" type="video/mp4">
   </video>
   ```

### Theme Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --color-accent: #ff4655;
    --color-bg-primary: #05060a;
    /* ... more variables */
}
```

### Images

All images use Unsplash URLs. To use local images:

1. Place images in `assets/images/`
2. Update image `src` attributes in HTML files
3. Ensure responsive `srcset` attributes are included

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Theme Toggle
- Persists preference in `localStorage`
- Smooth transitions between themes
- Accessible with keyboard navigation

### Mobile Menu
- Hamburger animation
- Slide-down menu
- Focus trap for accessibility
- ESC key to close

### Lightbox Gallery
- Click any gallery image to open
- Arrow keys to navigate
- ESC to close
- Touch-friendly on mobile

### Form Validation
- Real-time validation
- Accessible error messages
- Honeypot spam protection
- Client-side only (no backend)

### Responsive Design
- Breakpoints: 480px, 768px, 1024px
- Fluid grid layouts
- Mobile-optimized navigation

## Performance

- Lazy loading images (`loading="lazy"`)
- Responsive images with `srcset`
- CSS-only animations (no JS for animations)
- Minimal JavaScript footprint
- Optimized asset loading

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly
- Proper heading hierarchy

## License

This project is for demonstration purposes. All images are from Unsplash (free to use).

## Credits

- **Images**: Unsplash
- **Videos**: Pexels Videos
- **Design Inspiration**: Valorant website

---

**Note**: This is a static website with no backend. The contact form provides visual feedback but doesn't actually send emails. For production use, integrate with a backend service or email API.
