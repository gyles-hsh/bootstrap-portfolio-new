// Real-time clock for footer
function updateFooterClock() {
    const footerClock = document.getElementById('footerClock');
    if (!footerClock) return;
    
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayTime = `${String(displayHours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    
    // Check if it's Monday-Friday (1-5) and between 9AM (9) and 5PM (17)
    const isWorkingHours = now.getDay() >= 1 && now.getDay() <= 5 && now.getHours() >= 9 && now.getHours() < 17;
    const status = isWorkingHours ? 'Online' : 'Offline';
    const statusColor = isWorkingHours ? 'style="color: #28a745;"' : '';
    
    footerClock.innerHTML = `Now (<span ${statusColor}><strong>${status}</strong></span>), ${displayTime} PHT`;
}

// Update footer clock every second
updateFooterClock();
setInterval(updateFooterClock, 1000);


function updateClock() {
    const clockDisplay = document.getElementById('clockDisplay');
    if (!clockDisplay) return;
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const displayHours = now.getHours() % 12 || 12;
    const displayTime = `${String(displayHours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = days[now.getDay()];
    
    // Check if it's Monday-Friday (1-5) and between 9AM (9) and 5PM (17)
    const isWorkingHours = now.getDay() >= 1 && now.getDay() <= 5 && now.getHours() >= 9 && now.getHours() < 17;
    const status = isWorkingHours ? 'Online' : 'Offline';
    const statusColor = isWorkingHours ? 'online' : 'offline';
    
    clockDisplay.innerHTML = `Now (<span class="status ${statusColor}">${status}</span>), ${displayTime}, ${dayName}, PHT`;
}

// Update clock every second
updateClock();
setInterval(updateClock, 1000);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if it's a valid section link
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close navbar if it's open on mobile
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
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

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!fullName || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission (in real app, this would send to a server)
        console.log('Form submitted:', {
            fullName,
            email,
            subject,
            message
        });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server endpoint
        // Example using fetch:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         fullName,
        //         email,
        //         subject,
        //         message
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Message sent successfully!');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('There was an error sending your message. Please try again.');
        // });
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-animate');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add scroll event listener for navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Ensure navbar collapses on link click (already handled above, but adding extra safety)
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsNavbar = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsNavbar.hide();
        }
    });
});

// Set scroll position on page load
window.addEventListener('load', () => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Responsive navbar breakpoint check
function updateNavbarBreakpoint() {
    const navbar = document.querySelector('.navbar');
    const viewport = window.innerWidth;
    
    // At 375px and below, ensure collapse works properly
    if (viewport <= 375) {
        navbar.classList.add('compact-navbar');
    } else {
        navbar.classList.remove('compact-navbar');
    }
}

// Call on load and resize
window.addEventListener('load', updateNavbarBreakpoint);
window.addEventListener('resize', updateNavbarBreakpoint);

// Keyboard accessibility for buttons
document.querySelectorAll('button, a[href^="#"]').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// Progressive image loading
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    // Ensure alt text is present
    if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
        img.setAttribute('alt', 'Portfolio image');
    }
});

console.log('Portfolio script loaded successfully!');
