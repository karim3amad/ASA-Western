// ==================== SMOOTH SCROLLING ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== MOBILE MENU TOGGLE ==================== //
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// ==================== SCROLL ANIMATIONS ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease';
        }
    });
}, observerOptions);

// Observe animation elements
document.querySelectorAll('.feature-card, .event-card, .stat-card, .team-card').forEach(el => {
    observer.observe(el);
});

// ==================== BUTTON INTERACTIONS ==================== //
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==================== EVENT BUTTON HANDLERS ==================== //
document.querySelectorAll('.event-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const eventCard = this.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;
        const eventDate = eventCard.querySelector('.event-date').textContent;
        
        console.log(`Event clicked: ${eventTitle} on ${eventDate}`);
        alert(`You've clicked on: ${eventTitle}\n${eventDate}`);
    });
});

// ==================== ACTIVE NAV LINK ==================== //
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.innerHTML = `
    .nav-links a.active {
        color: var(--accent-gold) !important;
    }
    
    .nav-links a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// ==================== NAVBAR SCROLL EFFECT ==================== //
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== FORM SUBMISSION HANDLERS ==================== //
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent.includes('Join')) {
            console.log('Join button clicked');
            // Handle join functionality
        } else if (this.textContent.includes('Learn')) {
            console.log('Learn More button clicked');
            // Handle learn more functionality
        } else if (this.textContent.includes('Donate Now')) {
            console.log('Get Involved button clicked');
            // Handle get involved functionality
            window.location.href = 'https://www.launchgood.com/v4/campaign/asa_western_delivers_aid_and_relief_to_the_families_of_lebanon?src=internal_discover';
        }
    });
});

// ==================== COUNTER ANIMATION FOR STATS ==================== //
const animateCounters = () => {
    const statCards = document.querySelectorAll('.stat-card .number');
    
    statCards.forEach(card => {
        const target = parseInt(card.textContent.replace(/\D/g, ''));
        const text = card.textContent.replace(/\d+/g, '');
        let current = 0;
        const increment = target / 50;
        const updateCount = setInterval(() => {
            current += increment;
            if (current >= target) {
                card.textContent = target + text;
                clearInterval(updateCount);
            } else {
                card.textContent = Math.floor(current) + text;
            }
        }, 30);
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.impact-stats') && statsObserver.observe(document.querySelector('.impact-stats'));

// ==================== FORM VALIDATION (Future use) ==================== //
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Valid email is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== ACCESSIBILITY IMPROVEMENTS ==================== //
// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
    }
});

// Add focus styles for better accessibility
const style2 = document.createElement('style');
style2.innerHTML = `
    button:focus, a:focus {
        outline: 2px solid var(--accent-gold);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style2);

// ==================== INITIALIZATION ==================== //
console.log('ASA Website loaded successfully!');