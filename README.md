# Portfolio Website

A modern, interactive portfolio website featuring smooth animations and responsive design.

## Animations

### 1. Left-Right Animation
- Used for horizontal lines that grow from left to right
- Implemented using `transform: scaleX()` with `transform-origin: left`
- Triggers on scroll using Intersection Observer
- Applied to bottom horizontal line
- CSS class: `.bottom-hr`

### 2. Center Animation
- Used for horizontal lines that grow from center
- Implemented using width animation
- Triggers on scroll using Intersection Observer
- Applied to top horizontal line
- CSS class: `.animated-hr`

### 3. Line Animation
- Used for the "Know More" link underline effect
- Creates an animated line that grows from left to right on hover
- Implemented using pseudo-elements and transform
- Applied to elements with class: `.know-more`
- CSS properties: `::after` with `transform: scaleX()`

### 4. Name Typing Effect
- Animated typing effect for the main name display
- Uses JavaScript to type out characters one by one
- Adds a blinking cursor at the end
- Applied to element with ID: `#nameText`

### 5. Image Hover Effects
- Scale effect on image hover
- Overlay fade-in effect
- Applied to image cards
- CSS classes: `.image-container`, `.image-overlay`

### 6. Carousel Hover Effects
- Scale and lift effect on carousel items
- Description tooltip on hover
- Applied to carousel items
- CSS class: `.carousel-item`

## Components

### 1. Navigation
- Responsive navbar with hamburger menu for mobile
- Smooth transitions for menu items
- CSS classes: `.navbar`, `.hamburger`

### 2. Image Cards
- Full-width 16:9 image card
- Side-by-side 4:5 image cards
- Responsive layout adjustments
- CSS classes: `.fullwidth-image-card`, `.sidebyside-image-cards`

### 3. Carousel
- Horizontal scrolling carousel
- Responsive design
- Hover effects with descriptions
- CSS classes: `.carousel-section`, `.carousel-track`

### 4. Profile Card
- Fixed position on desktop
- Responsive layout for mobile
- CSS class: `.profile-card`

## Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 900px
- Flexible layouts using flexbox
- Responsive typography
- Touch-friendly targets for mobile

## Fonts
- Montserrat (900, 400)
- Roboto (300, 400, 700)
- JetBrains Mono (400, 700)
- Custom fonts: Akatab Bold, AdventPro medium

## Color Scheme
- Primary: #00fff7 (Cyan)
- Secondary: #01e875 (Green)
- Background: #000000 (Black)
- Text: #ffffff (White)
- Accent: #666666 (Gray)

## Usage
To use any of these animations or components in your own project:

1. Copy the relevant CSS classes
2. Include the required JavaScript for interactive elements
3. Ensure the necessary fonts are loaded
4. Adjust the colors and dimensions to match your design

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested on various devices
- Fallbacks for older browsers

## Setup

1. Clone the repository
2. Open `index.html` in your browser
3. That's it! No additional setup required.

## File Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `images/` - Image assets

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Google Fonts

## Customization

To customize the website:

1. Edit `index.html` to update content
2. Modify `styles.css` to change styling
3. Add your own images to the `images/` directory

## License

MIT License 