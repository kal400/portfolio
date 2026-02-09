import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import { api } from '../services/api';

const Home = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Fetch SEO settings
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
        
        // Track page view
        await api.trackView();
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();

    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with fade-in class
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title={settings?.seoTitle || 'Portfolio'}
        description={settings?.seoDescription || 'Professional portfolio showcasing projects and skills'}
        keywords={settings?.seoKeywords || 'portfolio, web developer, projects'}
        image={settings?.ogImage || ''}
      />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Blog />
      <Contact />
    </div>
  );
};

export default Home;
