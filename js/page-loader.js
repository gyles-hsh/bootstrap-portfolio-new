// page-loader.js - Load all sections for continuous scrolling

document.addEventListener('DOMContentLoaded', async function() {
    const navbarMenu = document.getElementById('navbarMenu');
    const dynamicContent = document.getElementById('dynamicContent');
    
    // Array of sections in order
    const sections = ['experience', 'projects', 'education', 'about', 'contact'];
    
    // Load all sections at once
    async function loadAllSections() {
        let allContent = '';
        
        for (const section of sections) {
            try {
                const response = await fetch(`${section}.html`);
                if (!response.ok) throw new Error(`Failed to load ${section}`);
                const html = await response.text();
                allContent += html;
            } catch (error) {
                console.error(`Error loading ${section}:`, error);
                allContent += `<div class="alert alert-danger m-5">Error loading ${section} section. Please try again.</div>`;
            }
        }
        
        dynamicContent.innerHTML = allContent;
    }
    
    // Load all sections on page init
    await loadAllSections();
    
    // Handle navbar link clicks for smooth scroll
    navbarMenu.addEventListener('click', function(e) {
        const link = e.target.closest('a[data-section]');
        if (!link) return;
        
        e.preventDefault();
        
        const section = link.getAttribute('data-section');
        
        // Update active navbar link
        document.querySelectorAll('#navbarMenu .nav-link').forEach(l => {
            l.classList.remove('active');
        });
        link.classList.add('active');
        
        // Close mobile menu
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
        
        // Smooth scroll to the section
        setTimeout(() => {
            const sectionElement = document.getElementById(section);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    });
    
    // Update navbar based on scroll position
    window.addEventListener('scroll', function() {
        let currentSection = 'home';
        
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100) {
                    currentSection = section;
                }
            }
        }
        
        // Update active link
        document.querySelectorAll('#navbarMenu .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    });
});
