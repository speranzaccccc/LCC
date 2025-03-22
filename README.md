# Personal Resume Website

A professional, clean, and responsive personal resume website for Tianle Huang. This website showcases education, work experience, projects, and skills in an attractive and user-friendly format.

## Features

- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean and professional design with smooth animations
- **Interactive Elements**: Contact form and social media links
- **Downloadable CV**: Option to download PDF version of the resume
- **Section Navigation**: Easy navigation to different sections of the resume

## Project Structure

```
├── index.html            # Main HTML file
├── css/
│   └── styles.css        # Stylesheet
├── js/
│   └── script.js         # JavaScript functionality
├── img/
│   └── hero-bg.jpg       # Background image for hero section
└── CV.pdf                # Downloadable resume
```

## How to Use

1. **View the Website**:
   - Open `index.html` in any modern web browser

2. **Modify Content**:
   - Edit `index.html` to update your personal information, education, work experience, projects, and skills
   - Customize styling in `css/styles.css`
   - Modify animations and interactions in `js/script.js`

3. **Replace Images**:
   - Replace `img/hero-bg.jpg` with your preferred background image
   - Add a professional profile photo in the About section

4. **Update CV**:
   - Replace `CV.pdf` with your updated resume when needed

## Customization Options

- **Colors**: Change the color scheme by modifying CSS variables in the `:root` section of `styles.css`
- **Fonts**: Update font families in `styles.css` and the link to Google Fonts in `index.html`
- **Sections**: Add or remove sections by editing the HTML structure
- **Social Links**: Update social media links in the Contact section

## Implementation Steps

1. **Project Setup**:
   - Created basic directory structure with HTML, CSS, and JavaScript files
   - Set up responsive meta tags and linked necessary resources

2. **Layout Development**:
   - Implemented a clean, single-page design with navigation
   - Created responsive sections for all resume content

3. **Styling**:
   - Designed a modern UI with a professional color scheme
   - Added responsive styling for all screen sizes
   - Implemented CSS animations for improved user experience

4. **Functionality**:
   - Added smooth scrolling navigation
   - Implemented mobile-friendly hamburger menu
   - Created form validation for the contact section
   - Added scroll animations for skills and timeline sections

5. **Optimization**:
   - Ensured accessibility standards compliance
   - Optimized performance for fast loading

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Future Enhancements

- Add a blog/articles section
- Implement dark/light mode toggle
- Add language selection for international audience
- Create project portfolio gallery with detailed case studies

## Notes for Maintenance

- Regularly update your information to keep the resume current
- Check form functionality if integrating with a backend service
- Update your skills and proficiency levels as you grow professionally

## Deployment Options

### GitHub Pages (Free)
1. Create a GitHub account if you don't have one
2. Create a new repository named `username.github.io` (replace 'username' with your GitHub username)
3. Initialize Git in your local project folder:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```
4. Your website will be available at `https://username.github.io`

### Netlify (Free)
1. Create a Netlify account
2. Click "New site from Git"
3. Connect your GitHub/GitLab/Bitbucket account
4. Select your repository
5. Deploy with default settings
6. Your site will be available at a Netlify subdomain (e.g., `https://your-site-name.netlify.app`)
7. You can set up a custom domain in the Netlify settings

### Vercel (Free)
1. Create a Vercel account
2. Import your project from Git
3. Deploy with default settings
4. Your site will be available at a Vercel subdomain (e.g., `https://your-site-name.vercel.app`)

### Traditional Web Hosting
1. Purchase a domain name from a domain registrar
2. Sign up for a web hosting service
3. Upload your website files to the hosting server using FTP
4. Configure your domain to point to your hosting service
