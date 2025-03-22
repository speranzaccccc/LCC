# 个人简历网站

这是一个响应式个人简历网站，支持中英文双语切换。

## 功能特点

- 响应式设计，适配各种设备屏幕
- 中英文语言切换
- 平滑滚动导航
- 技能进度条动画
- 时间轴动画效果
- 项目卡片展示
- 联系方式与社交媒体链接

## 技术栈

- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript (原生)
- Font Awesome 图标
- Google Fonts

## 如何使用

1. 克隆仓库到本地
2. 根据自己的信息修改HTML内容
3. 根据需要调整CSS样式
4. 部署到GitHub Pages或其他托管服务

## 许可证

MIT

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
