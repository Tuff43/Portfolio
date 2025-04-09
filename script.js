// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTop = document.querySelector('.back-to-top');
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Transform bars to X
      const bars = document.querySelectorAll('.bar');
      if (menuToggle.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
    
    // Typing animation
    const typingElement = document.querySelector('.typing-text');
    const textToType = "Project Manager & Web Developer";
    let i = 0;
    
    function typeWriter() {
      if (i < textToType.length) {
        typingElement.textContent = textToType.substring(0, i + 1,);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    typeWriter();
    
    // Scroll events
    window.addEventListener('scroll', function() {
      // Navbar scroll effect
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Back to top button
      if (window.scrollY > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
      
      // Active nav link based on scroll position
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
      
      // Animate skill bars when in viewport
      const skillSection = document.querySelector('#skills');
      const skillBars = document.querySelectorAll('.skill-progress');
      
      if (isInViewport(skillSection)) {
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });
      }
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          if (filter === 'all') {
            item.style.display = 'block';
          } else if (item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (name === '' || email === '' || subject === '' || message === '') {
        formMessage.textContent = 'Please fill in all fields';
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
        return;
      }
      
      // Simulate form submission
      const submitBtn = document.querySelector('.btn-submit');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(function() {
        // Success message
        formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(function() {
          formMessage.style.display = 'none';
        }, 5000);
      }, 1500);
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.about-content, .about-cards, .skills-container, .stats-container, .timeline-item, .project-item, .contact-container');
    
    // Initial check for elements in viewport
    animateElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('animate');
      }
    });
    
    // Check on scroll
    window.addEventListener('scroll', function() {
      animateElements.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('animate');
        }
      });
    });
  });