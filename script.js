// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('active')){
            navLinks.classList.remove('active');
        }
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealSections = document.querySelectorAll('.section-hidden');

const revealOptions = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px"
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('section-visible');
        observer.unobserve(entry.target);
    });
};

const sectionObserver = new IntersectionObserver(revealCallback, revealOptions);

revealSections.forEach(section => {
    sectionObserver.observe(section);
});

// Typing effect for the hero role text
const roleText = document.querySelector('.role .gradient-text');
if (roleText) {
    const text = roleText.textContent;
    roleText.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                roleText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }, 500); // Start after 500ms
}
// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Light/Dark Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if(themeToggle) themeToggle.classList.replace('bx-moon', 'bx-sun');
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.classList.replace('bx-sun', 'bx-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.classList.replace('bx-moon', 'bx-sun');
        }
    });
}

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projects .project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter').toLowerCase();

            projectCards.forEach(card => {
                const techText = card.querySelector('.project-tech')?.textContent.toLowerCase() || "";
                
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else if (filterValue === 'web dev' && (techText.includes('html') || techText.includes('php') || techText.includes('node.js') || techText.includes('wix') || techText.includes('wordpress'))) {
                    card.style.display = 'flex';
                } else if (filterValue === 'c++' && techText.includes('c++')) {
                    card.style.display = 'flex';
                } else if (filterValue === 'it support' && techText.includes('it support')) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Hide empty category headers
            const grids = document.querySelectorAll('#projects .projects-grid');
            grids.forEach(grid => {
                // Check if grid has any visible cards
                const hasVisible = Array.from(grid.querySelectorAll('.project-card')).some(card => card.style.display !== 'none');
                if (grid.previousElementSibling && grid.previousElementSibling.tagName === 'H3') {
                    grid.previousElementSibling.style.display = hasVisible ? 'block' : 'none';
                }
                grid.style.display = hasVisible ? 'grid' : 'none';
            });
        });
    });
}
