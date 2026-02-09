# Portfolio Website

A modern, dark-themed portfolio built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern dark mode design
- 📱 Fully responsive
- ⚡ Fast performance with Vite
- 🎯 Clean component structure
- 🔄 Backend-ready data structure

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Customization

### Update Your Information

1. **Hero Section**: Edit `src/components/Hero.jsx`
   - Change name, title, and description

2. **About Section**: Edit `src/components/About.jsx`
   - Update bio and skills array

3. **Projects**: Edit `src/data/projects.js`
   - Add/remove projects
   - Update project details, tech stack, and links

4. **Contact**: Edit `src/components/Contact.jsx`
   - Update social media links and email

### Connect to Backend

The project is structured to easily connect to a backend:

```javascript
// In src/data/projects.js, replace static data with API call:
export const fetchProjects = async () => {
  const response = await fetch('YOUR_API_URL/projects');
  return response.json();
};

// Then in Projects.jsx:
const [projects, setProjects] = useState([]);

useEffect(() => {
  fetchProjects().then(setProjects);
}, []);
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Modern ES6+

## License

MIT
