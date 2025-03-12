document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        }
        
        // Update active navigation link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Calculate scroll position
            const headerOffset = 70;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            // Scroll to target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Add active class to current nav link
    function setActiveNav() {
        const currentLocation = location.hash || '#home';
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentLocation) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active nav on page load
    if (location.hash) {
        setActiveNav();
    } else {
        navLinks[0].classList.add('active');
    }
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show success message (in a real application, you would send this data to a server)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Animation for skills when scrolled into view
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.timeline-item, .education-item, .publication-item, .conference-item');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Call once to check initial state
    revealOnScroll();
    
    // Add more JavaScript for dynamic elements
    // Publications hover effect
    const publicationItems = document.querySelectorAll('.publication-item');
    publicationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Fade in animations for sections
    function fadeInOnScroll() {
        const fadeElements = document.querySelectorAll('.section-header, .about-content, .publications-list, .conferences-list, .timeline, .education-list, .contact-content');
        
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for fade elements
    document.querySelectorAll('.section-header, .about-content, .publications-list, .conferences-list, .timeline, .education-list, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);
    
    // Handle window resize for responsive elements
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Initialize additional styles for mobile menu
    const updateMobileStyles = function() {
        if (window.innerWidth <= 768) {
            navMenu.style.position = 'fixed';
            navMenu.style.top = '70px';
            navMenu.style.left = '100%';
            navMenu.style.width = '100%';
            navMenu.style.height = 'calc(100vh - 70px)';
            navMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.alignItems = 'center';
            navMenu.style.justifyContent = 'flex-start';
            navMenu.style.padding = '20px';
            navMenu.style.transition = 'left 0.3s ease';
            
            document.querySelectorAll('.nav-links li').forEach(item => {
                item.style.margin = '15px 0';
            });
        } else {
            navMenu.style = null;
            document.querySelectorAll('.nav-links li').forEach(item => {
                item.style = null;
            });
        }
    };
    
    updateMobileStyles();
    window.addEventListener('resize', updateMobileStyles);
    
    // Add active class style for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        .nav-links.active {
            left: 0 !important;
        }
        
        /* Additional mobile styles */
        @media (max-width: 768px) {
            .hamburger {
                display: block;
            }
            
            .nav-links {
                display: flex;
                flex-direction: column;
                position: fixed;
                left: 100%;
                top: 70px;
                width: 100%;
                text-align: center;
                transition: left 0.3s ease;
                background-color: rgba(255, 255, 255, 0.95);
                height: calc(100vh - 70px);
                overflow-y: auto;
                padding-top: 20px;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
            
            .hero-content {
                flex-direction: column-reverse;
                text-align: center;
            }
            
            .hero-buttons {
                justify-content: center;
            }
            
            .about-content {
                flex-direction: column;
            }
            
            .expertise ul {
                grid-template-columns: 1fr;
            }
            
            .contact-content {
                flex-direction: column;
            }
            
            .publication-item {
                flex-direction: column;
            }
            
            .publication-year {
                width: 100%;
                padding: 10px 0;
            }
        }
    `;
    document.head.appendChild(style);
});