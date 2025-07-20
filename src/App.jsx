import React, { useState, useEffect, useRef } from 'react'; // Import useRef
// Importing icons from lucide-react for a modern look
import { Home, User, BookOpen, Briefcase, Mail, Github, Linkedin, Instagram, Sparkles, Sun, Moon, Menu, X, ChevronDown, Award, Users, CheckCircle, Zap, TrendingUp, Layout, Globe, Lightbulb, ShieldCheck, Cpu, BarChart2, Headphones, Laptop, Handshake, Figma, Database, Cloud, GitBranch, Terminal, Shield, Eye, Server, Layers, Package, Rocket, Activity, Dribbble, PenTool, Palette, Wand2, ExternalLink, Phone, MapPin } from 'lucide-react'; // Changed Code to BookOpen

// Typewriter effect component
const Typewriter = ({ words, speed = 150, delay = 1000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      const updatedText = isDeleting
        ? fullWord.substring(0, currentText.length - 1)
        : fullWord.substring(0, currentText.length + 1);

      setCurrentText(updatedText);

      const typingSpeed = isDeleting ? speed / 2 : speed;

      if (!isDeleting && updatedText === fullWord) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return <span>{currentText}</span>;
};

// Custom Hook for Scroll Reveal Animation
const useScrollReveal = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible to prevent re-triggering
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]); // Re-run effect if options change

  return [elementRef, isVisible];
};


// Main App component for the portfolio
const App = () => {
  // State to manage the active section for navigation highlighting (if implemented later)
  const [activeSection, setActiveSection] = useState('home');

  // Theme is now fixed to 'dark'
  const theme = 'dark';
  // State for mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for scroll reveal
  const [aboutRef, isAboutVisible] = useScrollReveal({ threshold: 0.1 });
  const [skillsRef, isSkillsVisible] = useScrollReveal({ threshold: 0.1 });
  const [projectsRef, isProjectsVisible] = useScrollReveal({ threshold: 0.1 });
  const [contactRef, isContactVisible] = useScrollReveal({ threshold: 0.1 });
  const [statsRef, isStatsVisible] = useScrollReveal({ threshold: 0.2 }); // New ref for stats section
  const [aboutFeaturesRef, isAboutFeaturesVisible] = useScrollReveal({ threshold: 0.1 }); // New ref for about me features


  // Function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id); // Update active section for navigation highlighting
      setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  // Determine base classes for the overall app based on theme (now fixed to dark)
  const appBgClass = 'bg-gray-950 text-gray-100'; // Darker background for dark mode
  // Updated navBgClass for glassmorphism effect
  const navBgClass = 'bg-white/10 backdrop-blur-lg border border-gray-700'; // Glassmorphism effect
  const navTextClass = 'text-gray-300';
  // Updated navHoverTextClass for a more special hover effect
  const navHoverTextClass = 'hover:text-blue-400 hover:bg-blue-800/30 rounded-full px-3 py-2 transition-all duration-300'; // Changed to blue
  const nameColorClass = 'text-blue-400'; // Changed to blue accent for dark mode
  const heroGradientClass = 'from-blue-950 to-blue-900'; // Dark blue gradient for hero
  const heroTextClass = 'text-white';
  const heroSubTextClass = 'text-gray-300';
  const heroAccentColor = 'text-blue-400'; // Changed to blue accent for hero
  const heroButtonBgClass = 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400'; // Blue buttons for dark mode
  const heroButtonBorderClass = 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white focus:ring-blue-400'; // Blue buttons for dark mode
  const sectionBgClass1 = 'bg-gray-900'; // Adjusted section backgrounds for dark mode
  const sectionBgClass2 = 'bg-gray-950'; // Adjusted section backgrounds for dark mode
  const sectionTitleClass = 'text-blue-400'; // Changed to blue title for dark mode
  // Updated card classes for About Me feature boxes to match image_011337.png
  const aboutMeCardBgClass = 'bg-[#1a222d] border border-[#2b3c4c] hover:border-blue-500 p-6 rounded-lg shadow-xl transition-all duration-150 transform hover:-translate-y-2'; // Changed to blue shades
  const aboutMeCardTextColor = 'text-[#e0f2f7]'; // Light blue text for cards
  const aboutMeIconColor = 'text-blue-400'; // Bright blue for icons
  // Skill card specific classes to match image_00ae3a.png and image_f2a236.png
  const skillCardBgClass = 'bg-[#1a222d] border border-[#2b3c4c] rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-blue-500'; // Changed to blue shades
  const skillCategoryTitleClass = 'text-blue-400 text-2xl font-bold mb-6'; // Brighter blue, larger, bold
  const skillItemClass = 'flex mb-4 items-start'; // Changed to flex and items-start for icon alignment
  const skillCheckIconClass = 'text-blue-400 mr-2 flex-shrink-0 mt-1'; // Blue checkmark icon, added mt-1 for vertical alignment
  const skillNameClass = 'text-white text-lg font-medium'; // Skill name larger and white
  const skillProficiencyClass = 'text-gray-400 text-sm mt-1'; // Proficiency smaller and gray
  // Project section specific classes
  const projectFilterButtonClass = 'px-6 py-2 rounded-full font-semibold transition-colors duration-300';
  const projectFilterButtonActive = 'bg-blue-600 text-white'; // Changed to blue
  const projectFilterButtonInactive = 'bg-gray-800 text-gray-300 hover:bg-gray-700';
  const projectCardBgClass = 'bg-[#1a222d] rounded-xl shadow-lg overflow-hidden border border-[#2b3c4c] hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2'; // Changed to blue shades
  const projectImageWrapperClass = 'w-full h-64 overflow-hidden relative';
  const projectImageClass = 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-110';
  const projectTitleClass = 'text-white text-2xl font-bold mb-2';
  const projectDescClass = 'text-gray-300 text-base mb-4';
  const projectTagClass = 'bg-[#2b3c4c] text-blue-400 text-sm font-medium px-3 py-1 rounded-full'; // Changed to blue shades
  const cardBgClass = 'bg-gray-900 border-gray-700 hover:border-blue-500'; // Blue hover for dark mode cards (for other sections)
  const cardTitleClass = 'text-white'; // For other sections' cards
  const cardDescClass = 'text-gray-400'; // For other sections' cards
  const tagBgClass = 'bg-blue-700 text-blue-100'; // Blue tags for dark mode (for other sections)
  const linkColorClass = 'text-blue-400 hover:text-blue-300'; // Blue links for dark mode
  const githubIconClass = 'text-gray-400 hover:text-white';
  const socialIconClass = 'text-gray-300 hover:text-blue-400'; // Social icon color
  const hireMeButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:ring-blue-400'; // Hire me button
  const contactButtonBgClass = 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400'; // Changed to blue
  const footerBgClass = 'bg-gray-900'; // Adjusted footer background
  const footerTextClass = 'text-gray-400';
  const statsCardBgClass = 'bg-gray-900'; // Background for stats cards
  const statsCardBorderClass = 'border-gray-700'; // Border for stats cards
  const statsNumberClass = 'text-blue-400'; // Number color for stats cards
  const statsTextClass = 'text-gray-300'; // Text color for stats cards

  // Contact form specific styles
  const contactCardBgClass = 'bg-[#1a222d] border border-[#2b3c4c] rounded-xl p-6 shadow-lg'; // Changed to blue shades
  const contactCardIconColor = 'text-blue-400'; // Changed to blue
  const contactCardTitleClass = 'text-gray-300 text-lg font-semibold';
  const contactCardValueClass = 'text-white text-xl font-bold';
  const formBgClass = 'bg-[#1a222d] border border-[#2b3c4c] rounded-xl p-8 shadow-lg'; // Changed to blue shades
  const formTitleClass = 'text-blue-400 text-3xl font-bold mb-4'; // Changed to blue
  const formTextClass = 'text-gray-300 text-base mb-6';
  const inputBgClass = 'bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'; // Changed to blue
  const sendButtonClass = 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'; // Changed to blue


  return (
    <div className={`min-h-screen font-inter ${appBgClass}`}>
      {/* Tailwind CSS CDN for Inter font and general styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Custom Tailwind CSS Animations */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.7s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.7s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }

        /* Custom style for image gradient overlay */
        .image-gradient-overlay {
          position: relative; /* Ensure pseudo-element is positioned relative to this */
          border-radius: 0.5rem; /* Apply rounded corners to the container */
          overflow: hidden; /* Crucial to clip the pseudo-element within the rounded corners */
        }

       .image-gradient-overlay::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0; /* Changed from right: 0 to left: 0 for full width */
          width: 100%; /* Changed from 82% to 100% */
          height: 30%;
          background: linear-gradient(to bottom, transparent, rgb(3 7 18), rgb(3 7 18));
          pointer-events: none;
        }

        /* Gradient text effect */
        .gradient-text {
          --primary: #00BFFF; /* Deep Sky Blue */
          --secondary-light: #ADD8E6; /* Light Blue */
          background: linear-gradient(to right, var(--primary) 0%, var(--secondary-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        `}
      </style>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 ${navBgClass} z-50 p-4`}>
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          {/* Your Name/Logo */}
          <div className="flex items-center space-x-2">
            <BookOpen size={28} className={nameColorClass} /> {/* Changed Code to BookOpen */}
            <span className={`text-2xl font-bold ${nameColorClass}`}>
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-2"> {/* Reduced space-x for better fit with padding */}
            <button onClick={() => scrollToSection('about')} className={`flex items-center space-x-2 ${navTextClass} ${navHoverTextClass} focus:outline-none`}>
              <span>About Me</span>
            </button>
            <button onClick={() => scrollToSection('skills')} className={`flex items-center space-x-2 ${navTextClass} ${navHoverTextClass} focus:outline-none`}>
              <span>Skills</span>
            </button>
            <button onClick={() => scrollToSection('projects')} className={`flex items-center space-x-2 ${navTextClass} ${navHoverTextClass} focus:outline-none`}>
              <span>Projects</span>
            </button>
            {/* Added Contact to desktop navigation */}
            <button onClick={() => scrollToSection('contact')} className={`flex items-center space-x-2 ${navTextClass} ${navHoverTextClass} focus:outline-none`}>
              <span>Contact</span>
            </button>
          </div>

          {/* Social Icons, Buttons & Theme Toggle (hidden on mobile, except for menu button) */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://www.linkedin.com/in/anirudh-vartak/" target="_blank" rel="noopener noreferrer" className={`${socialIconClass} p-2 rounded-full hover:bg-blue-800 transition-colors duration-300`}>
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/anirudh.vartak/" target="_blank" rel="noopener noreferrer" className={`${socialIconClass} p-2 rounded-full hover:bg-blue-800 transition-colors duration-300`}>
              <Instagram size={20} />
            </a>
            <a href="https://github.com/Anirudhvartak" target="_blank" rel="noopener noreferrer" className={`${socialIconClass} p-2 rounded-full hover:bg-blue-800 transition-colors duration-300`}>
              <Github size={20} />
            </a>
            <button className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${hireMeButtonClass}`}>
              Hire me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full ${navTextClass} ${navHoverTextClass} focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-blue-400`} // Always blue ring for dark mode
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed top-0 left-0 w-full h-full ${navBgClass} bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 md:hidden`}>
          <button
            onClick={() => scrollToSection('about')}
            className={`text-3xl font-semibold ${navTextClass} ${navHoverTextClass} transition-colors duration-300 focus:outline-none`}
          >
            About Me
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className={`text-3xl font-semibold ${navTextClass} ${navHoverTextClass} transition-colors duration-300 focus:outline-none`}
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className={`text-3xl font-semibold ${navTextClass} ${navHoverTextClass} transition-colors duration-300 focus:outline-none`}
          >
            Projects
          </button>
          {/* Added Contact to mobile navigation */}
          <button
            onClick={() => scrollToSection('contact')}
            className={`text-3xl font-semibold ${navTextClass} ${navHoverTextClass} transition-colors duration-300 focus:outline-none`}
          >
            Contact
          </button>
          <div className="flex space-x-6 mt-4">
            <a href="https://www.linkedin.com/in/anirudh-vartak/" target="_blank" rel="noopener noreferrer" className={`${socialIconClass}`}>
              <Linkedin size={32} />
            </a>
            <a href="https://www.instagram.com/anirudh.vartak/" target="_blank" rel="noopener noreferrer" className={`${socialIconClass}`}>
              <Instagram size={32} />
            </a>
            <a href="https://github.com/Anirudhvartak" target="_blank" rel="noopener noreferrer" className={`${socialIconClass}`}>
              <Github size={32} />
            </a>
          </div>
          <button className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${hireMeButtonClass}`}>
            Hire me
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="pt-20"> {/* Padding top to account for fixed nav bar */}

        {/* Hero Section */}
        <section id="home" className={`relative min-h-screen flex items-center justify-center p-8 ${heroGradientClass} overflow-hidden`}>
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between z-10">
            {/* Left Content */}
            <div className="text-center md:text-left md:w-1/2 mb-12 md:mb-0">
              <p className={`text-xl md:text-2xl ${heroSubTextClass} mb-2 animate-fadeInUp`}>
                Hello, I'm Anirudh Vartak
              </p>
              <h1 className={`text-5xl md:text-7xl font-extrabold ${heroTextClass} leading-tight mb-4 animate-fadeInUp delay-100`}>
                A Fullstack <br />
                <span className={`gradient-text`}> {/* Applied gradient-text class here */}
                  <Typewriter words={["Web Developer"]} speed={150} delay={1500} />
                </span>
              </h1>
              <p className={`text-lg md:text-xl ${heroSubTextClass} mb-8 max-w-xl animate-fadeInUp delay-200`}>
                Innovative problem solver with a passion for creating secure & scalable solutions. Leveraging cutting edge technologies to craft intuitive user experiences and robust backend systems. Let's build the future of tech together!
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeInUp delay-300">
                <a
                  href="#projects"
                  onClick={() => scrollToSection('projects')}
                  className={`px-8 py-3 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${heroButtonBgClass}`}
                >
                  Learn more
                </a>
                {/* Added Resume Download Button */}
                <a
                  href="Anirudh_vartak_2025.pdf" // Link to the uploaded resume PDF
                  download="Anirudh_Vartak_Resume.pdf" // Suggests a filename for download
                  className={`px-8 py-3 border font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${heroButtonBorderClass}`}
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => scrollToSection('contact')}
                  className={`px-8 py-3 border font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${heroButtonBorderClass}`}
                >
                  Get started
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 flex justify-center md:justify-end animate-fadeInRight delay-400 image-gradient-overlay">
              <img
                src="/images/myimg.png" // Updated image path to public/images/myimg.png
                alt="Anirudh Vartak"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-2xl object-cover"
                style={{ filter: 'brightness(0.9) contrast(1.1)' }} // Fixed filter for dark mode
              />
            </div>
          </div>
          {/* Scroll down indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10"> {/* Added z-10 class here */}
            <ChevronDown size={32} className={`${heroAccentColor}`} />
          </div>
        </section>

        {/* Statistics Section */}
        <section ref={statsRef} className={`py-16 px-4 ${sectionBgClass1}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stat Card 1: Years of Experience */}
              <div className={`${statsCardBgClass} p-8 rounded-lg shadow-xl border ${statsCardBorderClass} text-center transition-all duration-300 transform hover:scale-105 ${isStatsVisible ? 'animate-fadeInLeft delay-100' : 'opacity-0'}`}>
                <Award size={60} className={`mx-auto mb-4 ${statsNumberClass}`} />
                <h3 className={`text-5xl font-extrabold mb-2 ${statsNumberClass}`}>2+</h3>
                <p className={`text-xl font-semibold ${statsTextClass}`}>Years of Experience</p>
              </div>

              {/* Stat Card 2: Awards */}
              <div className={`${statsCardBgClass} p-8 rounded-lg shadow-xl border ${statsCardBorderClass} text-center transition-all duration-300 transform hover:scale-105 ${isStatsVisible ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
                <Award size={60} className={`mx-auto mb-4 ${statsNumberClass}`} /> {/* Changed icon to Award */}
                <h3 className={`text-5xl font-extrabold mb-2 ${statsNumberClass}`}>2</h3> {/* Changed number to 2 */}
                <p className={`text-xl font-semibold ${statsTextClass}`}>Awards in uKnowva</p> {/* Changed text */}
              </div>

              {/* Stat Card 3: Completed Projects */}
              <div className={`${statsCardBgClass} p-8 rounded-lg shadow-xl border ${statsCardBorderClass} text-center transition-all duration-300 transform hover:scale-105 ${isStatsVisible ? 'animate-fadeInRight delay-300' : 'opacity-0'}`}>
                <CheckCircle size={60} className={`mx-auto mb-4 ${statsNumberClass}`} />
                <h3 className={`text-5xl font-extrabold mb-2 ${statsNumberClass}`}>40+</h3> {/* Changed number to 40+ */}
                <p className={`text-xl font-semibold ${statsTextClass}`}>Completed Projects</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" ref={aboutRef} className={`py-20 px-4 ${sectionBgClass2} bg-gradient-to-br from-gray-950 to-gray-900 transition-all duration-700 ease-out ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto max-w-4xl">
            <h2 className={`text-4xl font-bold text-center mb-12 gradient-text`}>About Me</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              <div className={`text-lg leading-relaxed text-center md:text-left text-gray-300`}>
                <p className="mb-4">
                  Hello! I'm Anirudh Haresh Vartak, a dedicated and results-driven UI/UX Developer with over 2 years of experience, excelling in both front-end and back-end development. I'm currently working at <strong className="text-blue-400">uKnowva HRMS</strong>, a product-based company specializing in the HR domain. I'm recognized as "Star of the Year" in 2023 and "Star of the Department" at uknowva HRMS in 2024 for innovative solutions and sustained excellence.
                </p>
                <p className="mb-4">
                  My professional journey includes spearheading the complete revamp of uknowva.com to enhance brand identity and user experience, and developing HR-tools.ai, integrating Chat GPT API to streamline HR processes like job recommendations and dynamic blog management. I leveraged expertise in Joomla3 (CMS), PHP, MySQL, and JavaScript to create dynamic, responsive, and mobile-friendly solutions, and optimized website performance for improved SEO rankings and user retention.
                </p>
                <p className="mb-4">
                  I also have prior experience in Supply Chain Management at TATA Steel Ltd.
                </p>
              </div>
            </div>
            {/* Feature Boxes Grid */}
            <div ref={aboutFeaturesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-16">
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInLeft delay-100' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <Cpu size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>Full-Stack Development Mastery</h3>
                </div>
              </div>
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInRight delay-200' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <Award size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>Award-Winning Innovation</h3>
                </div>
              </div>
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInLeft delay-300' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <Briefcase size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>HR Tech Specialization</h3>
                </div>
              </div>
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInRight delay-400' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <Zap size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>API Integration & Optimization</h3>
                </div>
              </div>
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInLeft delay-500' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <Palette size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>User-Centric UI/UX</h3>
                </div>
              </div>
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInRight delay-600' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <Server size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>Robust Backend Solutions</h3>
                </div>
              </div>
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInLeft delay-700' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <ShieldCheck size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>Quality Assurance & SDLC</h3>
                </div>
              </div>
              <div className={`${aboutMeCardBgClass} ${isAboutFeaturesVisible ? 'animate-fadeInRight delay-800' : 'opacity-0'}`}>
                <div className="flex items-center space-x-3">
                  <Handshake size={24} className={aboutMeIconColor} />
                  <h3 className={`text-xl font-semibold ${aboutMeCardTextColor}`}>Collaborative & Adaptive</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className={`py-20 px-4 ${sectionBgClass1} transition-all duration-700 ease-out ${isSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto max-w-6xl">
            <h2 className={`text-4xl font-bold text-center mb-12 gradient-text`}>My Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Frontend Development - Priority 1 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-100`}>
                <h3 className={skillCategoryTitleClass}>Frontend Development</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>HTML</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>CSS</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>JavaScript</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Tailwind</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>React</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Bootstrap</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Next.js</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Backend Development - Priority 2 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-200`}>
                <h3 className={skillCategoryTitleClass}>Backend Development</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Node.js</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Python</span>
                      <span className={skillProficiencyClass}>Starter</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>MySQL</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>PHP</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>MVC Architecture</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Database Management - Priority 3 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-300`}>
                <h3 className={skillCategoryTitleClass}>Database Management</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>SQL</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Database Optimization</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Data Modeling</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* API Integration & Data Manipulation - Priority 4 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-400`}>
                <h3 className={skillCategoryTitleClass}>API Integration & Data Manipulation</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>API Integration</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Data Manipulation</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* App Development - Priority 5 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-500`}>
                <h3 className={skillCategoryTitleClass}>App Development</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Code Igniter</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Xcode</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Android Studio</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* UI/UX - Priority 6 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-600`}>
                <h3 className={skillCategoryTitleClass}>UI/UX</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Figma</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Canva</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Testing - Priority 7 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-700`}>
                <h3 className={skillCategoryTitleClass}>Testing</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>SDLC</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Manual Testing</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Cybersecurity - Priority 8 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-800`}>
                <h3 className={skillCategoryTitleClass}>Cybersecurity</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Network Security</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Security Auditing</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Emerging Technologies - Priority 9 */}
              <div className={`${skillCardBgClass} animate-fadeInUp delay-900`}>
                <h3 className={skillCategoryTitleClass}>Emerging Technologies</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Machine Learning</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>IoT Development</span>
                      <span className={skillProficiencyClass}>Intermediate</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Chatbot</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                  <div className={skillItemClass}>
                    <CheckCircle size={18} className={skillCheckIconClass} />
                    <span className='flex flex-col'>
                      <span className={skillNameClass}>Progressive Web Apps</span>
                      <span className={skillProficiencyClass}>Experienced</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className={`py-20 px-4 ${sectionBgClass1} transition-all duration-700 ease-out ${isProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto max-w-6xl">
            <h2 className={`text-4xl font-bold text-center mb-12 gradient-text`}>My Projects</h2>

            {/* Project Filter Buttons */}
            <div className="flex justify-center space-x-4 mb-12">
              <button className={`${projectFilterButtonClass} ${projectFilterButtonActive}`}>All</button>
              <button className={`${projectFilterButtonClass} ${projectFilterButtonInactive}`}>Web</button>
              <button className={`${projectFilterButtonClass} ${projectFilterButtonInactive}`}>UI/UX</button>
              <button className={`${projectFilterButtonClass} ${projectFilterButtonInactive}`}>Apps</button>
            </div>

            {/* Project Cards Grid - Centered with dynamic column spanning */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-items-center">
                {/* Project Card 1: Intelligent Chatbot Assistant */}
                <div className={`${projectCardBgClass} group`}>
                  <div className={projectImageWrapperClass}>
                    <img
                      src="https://placehold.co/600x400/2b3c4c/e0f2f7?text=Chatbot+Project" // Placeholder image for Chatbot Project
                      alt="Intelligent Chatbot Assistant"
                      className={projectImageClass}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={projectTitleClass}>Intelligent Chatbot Assistant <span className="text-sm font-normal text-gray-400">(Upcoming)</span></h3>
                    <p className={projectDescClass}>
                      An upcoming project focused on developing an AI-powered chatbot assistant for customer support. It will leverage natural language processing to understand user queries and provide accurate, real-time responses, enhancing user experience and streamlining support operations.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className={projectTagClass}>Python</span>
                      <span className={projectTagClass}>NLP</span>
                      <span className={projectTagClass}>React</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <a
                        href="#" // No live demo link for upcoming project
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium flex items-center ${linkColorClass}`}
                      >
                        Live Demo <ExternalLink size={16} className="ml-1" />
                      </a>
                      <a
                        href="https://github.com/your-github/chatbot-project" // Placeholder GitHub link
                        target="_blank"
                        rel="noopener noreferrer"
                        className={githubIconClass}
                      >
                        <Github size={24} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Card 2: Document OCR & Data Extraction */}
                <div className={`${projectCardBgClass} group`}>
                  <div className={projectImageWrapperClass}>
                    <img
                      src="https://placehold.co/600x400/2b3c4c/e0f2f7?text=OCR+Project" // Placeholder image for OCR Project
                      alt="Document OCR & Data Extraction"
                      className={projectImageClass}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={projectTitleClass}>Document OCR & Data Extraction <span className="text-sm font-normal text-gray-400">(Upcoming)</span></h3>
                    <p className={projectDescClass}>
                      An upcoming project aiming to build an Optical Character Recognition (OCR) system for efficient data extraction from various document types. This will involve advanced image processing and machine learning techniques to accurately convert scanned documents and images into editable and searchable text.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className={projectTagClass}>Python</span>
                      <span className={projectTagClass}>OpenCV</span>
                      <span className={projectTagClass}>Machine Learning</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <a
                        href="#" // No live demo link for upcoming project
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium flex items-center ${linkColorClass}`}
                      >
                        Live Demo <ExternalLink size={16} className="ml-1" />
                      </a>
                      <a
                        href="https://github.com/your-github/ocr-project" // Placeholder GitHub link
                        target="_blank"
                        rel="noopener noreferrer"
                        className={githubIconClass}
                      >
                        <Github size={24} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Card 3: Flipkart Clone */}
                <div className={`${projectCardBgClass} group`}>
                  <div className={projectImageWrapperClass}>
                    <img
                      src="/images/flipkartclone.png" // Placeholder image for Flipkart Clone
                      alt="Flipkart Clone"
                      className={projectImageClass}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={projectTitleClass}>Flipkart Clone</h3>
                    <p className={projectDescClass}>
                      A Flipkart clone built from scratch using HTML and CSS during my internship in 2023. Includes homepage, product listing, and detail pages. Not fully responsive but developed independently without any frameworks or AI assistance — purely for learning.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className={projectTagClass}>HTML</span>
                      <span className={projectTagClass}>CSS</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <a
                        href="https://anirudhvartak.github.io/flipkart_clone/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium flex items-center ${linkColorClass}`}
                      >
                        Live Demo <ExternalLink size={16} className="ml-1" />
                      </a>
                      <a
                        href="https://github.com/Anirudhvartak/flipkart_clone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={githubIconClass}
                      >
                        <Github size={24} />
                      </a>
                    </div>
                  </div>
                </div>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className={`py-20 px-4 ${sectionBgClass1} transition-all duration-700 ease-out ${isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto max-w-6xl">
            <h2 className={`text-4xl font-bold text-center mb-12 gradient-text`}>Get In Touch</h2>

            <div className="flex flex-col lg:flex-row gap-10 items-stretch">
              {/* Left Side: Contact Information Cards */}
              <div className="lg:w-1/3 flex flex-col space-y-6">
                <div className={contactCardBgClass}>
                  <Mail size={32} className={`${contactCardIconColor} mb-3`} />
                  <p className={contactCardTitleClass}>Email</p>
                  <p className={contactCardValueClass}>anirudhvartak33@gmail.com</p>
                </div>
                {/* Phone number card removed as requested */}
                <div className={contactCardBgClass}>
                  <MapPin size={32} className={`${contactCardIconColor} mb-3`} />
                  <p className={contactCardTitleClass}>Address</p>
                  <p className={contactCardValueClass}>Mumbai, India</p>
                </div>
              </div>

              {/* Right Side: Contact Form */}
              <div className="lg:w-2/3 flex flex-col">
                <div className={formBgClass}>
                  <h3 className={formTitleClass}>Let's Collaborate!</h3>
                  <p className={formTextClass}>
                    Always open to new opportunities and collaborations, I invite you to connect with me for any inquiries or project discussions.
                  </p>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="First name"
                      className={`${inputBgClass} md:col-span-1`}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className={`${inputBgClass} md:col-span-1`}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      className={`${inputBgClass} md:col-span-1`}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className={`${inputBgClass} md:col-span-1`}
                    />
                    <div className="md:col-span-2 relative">
                      <textarea
                        placeholder="Message"
                        rows="6"
                        className={`${inputBgClass} w-full resize-none`}
                        required
                      ></textarea>
                      <PenTool size={20} className="absolute bottom-4 right-4 text-gray-500" />
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                      <button
                        type="submit"
                        className={sendButtonClass}
                      >
                        Send Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 text-center ${footerBgClass} ${footerTextClass}`}>
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Anirudh Vartak. All rights reserved.</p>
            <p className="text-sm mt-2">Built with React, Vite, and Tailwind CSS</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
