// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header height
        behavior: 'smooth'
      });
    }
  });
});

// Add background to header when scrolling
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Add active class to navigation items based on scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active');
    } else {
      document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('active');
    }
  });
});

// Login Modal Functionality
const loginIcon = document.querySelector('#login-icon');
const loginModal = document.querySelector('.login-modal');
const loginClose = document.querySelector('.login-close');
const ctaButton = document.querySelector('.cta-button');

// Open login modal from login icon
loginIcon.addEventListener('click', function(e) {
  e.preventDefault();
  openLoginModal();
});

// Open login modal from Get Started button
ctaButton.addEventListener('click', function() {
  openLoginModal();
});

// Function to open login modal with animation
function openLoginModal() {
  loginModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  
  // Add animation to container
  const loginContainer = document.querySelector('.login-container');
  loginContainer.style.animation = 'slideIn 0.5s forwards';
}

// Close login modal
loginClose.addEventListener('click', () => {
  closeLoginModal();
});

// Function to close login modal with animation
function closeLoginModal() {
  const loginContainer = document.querySelector('.login-container');
  loginContainer.style.animation = 'slideIn 0.5s reverse forwards';
  
  setTimeout(() => {
    loginModal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }, 500);
}

// Close modal when clicking outside the form
loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal || e.target.classList.contains('login-background')) {
    closeLoginModal();
  }
});

// Service dropdown functionality for both login and contact forms
document.addEventListener('DOMContentLoaded', () => {
  const serviceSelects = document.querySelectorAll('.service-select');
  
  serviceSelects.forEach(serviceSelect => {
    const serviceSelected = serviceSelect.querySelector('.service-selected span');
    const serviceOptions = serviceSelect.querySelectorAll('.service-option');
    
    // Toggle service dropdown
    serviceSelect.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling up
      this.classList.toggle('active');
    });
    
    // Select service option
    serviceOptions.forEach(option => {
      option.addEventListener('click', function() {
        serviceSelected.textContent = this.textContent;
        serviceSelect.classList.remove('active');
      });
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    serviceSelects.forEach(select => {
      if (!select.contains(e.target)) {
        select.classList.remove('active');
      }
    });
  });
});

// Delayed animation for header and social icons
document.addEventListener('DOMContentLoaded', () => {
  // Wait 3 seconds before showing header and social icons
  setTimeout(() => {
    const header = document.querySelector('header.hidden-initially');
    const socialIcons = document.querySelector('.social-icons.hidden-initially');
    
    if (header) {
      header.classList.remove('hidden-initially');
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
      
      // Animate logo
      const logo = header.querySelector('.logo img');
      if (logo) {
        logo.style.transform = 'rotate(0) scale(1)';
      }
      
      // Animate navigation links with staggered delay
      const navLinks = header.querySelectorAll('nav a');
      navLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, parseInt(link.getAttribute('data-delay')) || index * 100);
      });
      
      // Animate login button
      const loginButton = header.querySelector('.header-login a');
      if (loginButton) {
        loginButton.style.opacity = '1';
        loginButton.style.transform = 'translateX(0)';
      }
    }
    
    if (socialIcons) {
      socialIcons.classList.remove('hidden-initially');
      socialIcons.style.opacity = '1';
      socialIcons.style.transform = 'translateY(-50%) translateX(0)';
      
      // Add staggered entrance animation for individual social icons
      const icons = socialIcons.querySelectorAll('.social-icon');
      icons.forEach((icon, index) => {
        setTimeout(() => {
          icon.style.opacity = '1';
          icon.style.transform = 'translateX(0)';
        }, parseInt(icon.getAttribute('data-delay')) || index * 100);
      });
    }
  }, 1000); // 3 seconds delay
});

// Add animation to the hero section
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.welcome-text');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 200);
  }
  
  // Ensure hero video plays automatically but doesn't loop
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.loop = false; // Remove looping
    
    heroVideo.play().catch(error => {
      console.log("Auto-play was prevented:", error);
      // Add a play button if autoplay is blocked
      const videoBackground = document.querySelector('.video-background');
      if (videoBackground) {
        const playButton = document.createElement('button');
        playButton.className = 'video-play-btn';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        videoBackground.appendChild(playButton);
        
        playButton.addEventListener('click', () => {
          heroVideo.play();
          playButton.style.display = 'none';
        });
      }
    });
  }
});

// Projects Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
  initCarousel('.video-carousel', '.video-item', '.prev-btn:not(.testimonial-prev)', '.next-btn:not(.testimonial-next)', '#projects .indicator');
});

// Testimonials Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
  initCarousel('.testimonial-carousel', '.testimonial-item', '.testimonial-prev', '.testimonial-next', '#testimonials .indicator');
});

// Track if video playback is in progress to prevent interruptions
let videoPlaybackInProgress = false;

// Generic Carousel Initialization Function
function initCarousel(carouselSelector, itemSelector, prevBtnSelector, nextBtnSelector, indicatorSelector) {
  const carouselItems = document.querySelectorAll(itemSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const indicators = document.querySelectorAll(indicatorSelector);
  
  let currentIndex = 0;
  const totalItems = carouselItems.length;
  
  // Initialize carousel
  function initializeCarousel() {
    // Set initial positions
    updateCarousel();
    
    // Add click events to items
    carouselItems.forEach(item => {
      item.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if (index !== currentIndex) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });
    
    // Add click events to indicators
    indicators.forEach(indicator => {
      indicator.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        currentIndex = index;
        updateCarousel();
      });
    });
  }
  
  // Update carousel positions and classes
  function updateCarousel() {
    carouselItems.forEach((item, index) => {
      // Remove all classes
      item.classList.remove('active', 'prev', 'next');
      
      // Add appropriate class based on position
      if (index === currentIndex) {
        item.classList.add('active');
      } else if (index === getPrevIndex()) {
        item.classList.add('prev');
      } else if (index === getNextIndex()) {
        item.classList.add('next');
      }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // Pause all videos when changing slides
    pauseAllVideos();
  }
  
  // Get previous index with wrap-around
  function getPrevIndex() {
    return (currentIndex - 1 + totalItems) % totalItems;
  }
  
  // Get next index with wrap-around
  function getNextIndex() {
    return (currentIndex + 1) % totalItems;
  }
  
  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = getPrevIndex();
      updateCarousel();
    });
  }
  
  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = getNextIndex();
      updateCarousel();
    });
  }
  
  // Initialize the carousel
  initializeCarousel();
}

// Function to pause all videos
function pauseAllVideos() {
  if (videoPlaybackInProgress) return;
  
  videoPlaybackInProgress = true;
  const videos = document.querySelectorAll('.project-video');
  
  videos.forEach(video => {
    if (!video.paused) {
      video.pause();
      
      // Update play/pause button icon
      const playPauseBtn = video.closest('.video-wrapper').querySelector('.play-pause-btn i');
      if (playPauseBtn) {
        playPauseBtn.className = 'fas fa-play';
      }
    }
  });
  
  setTimeout(() => {
    videoPlaybackInProgress = false;
  }, 50);
}

// Initialize video playback on page load
document.addEventListener('DOMContentLoaded', () => {
  // Preload videos
  const videos = document.querySelectorAll('.project-video');
  videos.forEach(video => {
    video.load();
    
    // Add event listeners to handle errors
    video.addEventListener('error', (e) => {
      console.log("Video error:", e);
    });
    
    // Add ended event to reset play button
    video.addEventListener('ended', function() {
      // If loop is desired, uncomment the next line
      // this.play();
      
      const playPauseBtn = this.closest('.video-wrapper').querySelector('.play-pause-btn i');
      if (playPauseBtn) {
        playPauseBtn.className = 'fas fa-play';
      }
    });
  });
  
  // Add play/pause button functionality
  const playPauseBtns = document.querySelectorAll('.play-pause-btn');
  playPauseBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling up
      
      const video = this.closest('.video-wrapper').querySelector('video');
      if (!video) return;
      
      if (video.paused) {
        // Pause all other videos first
        pauseAllVideos();
        
        // Play this video
        video.play().then(() => {
          this.querySelector('i').className = 'fas fa-pause';
          videoPlaybackInProgress = false;
        }).catch(error => {
          console.log("Error playing video:", error);
          videoPlaybackInProgress = false;
        });
      } else {
        // Pause this video
        video.pause();
        this.querySelector('i').className = 'fas fa-play';
      }
    });
  });
});

// Services section animation
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  // Intersection Observer to trigger animations when services come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered entrance animation
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100 * index);
        
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Set initial styles and observe each service card
  serviceCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Contact form submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.querySelector('.contact-form .service-selected span').textContent;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || service === 'Select a service' || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, just show a success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset the form
      this.reset();
      document.querySelector('.contact-form .service-selected span').textContent = 'Select a service';
    });
  }
});