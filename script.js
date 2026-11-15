document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        this.blur();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0,
    rootMargin: '0px 0px -10% 0px'
});

document.querySelectorAll('section:not(.hero), .leadership-section').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

const asaLightboxItems = document.querySelectorAll('.gallery-item');
const asaLightbox = document.getElementById('galleryLightbox');
const asaLightboxImage = document.getElementById('lightboxImage');
const asaLightboxClose = document.getElementById('lightboxClose');

if (asaLightbox && asaLightboxImage && asaLightboxClose) {

    asaLightboxItems.forEach(item => {

        const image = item.querySelector('img');

        if (!image) return;

        item.addEventListener('click', (event) => {

            event.preventDefault();
            event.stopPropagation();

            asaLightboxImage.src = image.src;
            asaLightboxImage.alt = image.alt;

            asaLightbox.classList.add('active');

            document.body.classList.add('lightbox-open');
            document.body.style.overflow = 'hidden';

        });

    });

    function closeAsaLightbox() {

        asaLightbox.classList.remove('active');

        document.body.classList.remove('lightbox-open');
        document.body.style.overflow = '';

        setTimeout(() => {
            asaLightboxImage.src = '';
        }, 300);

    }

    asaLightboxClose.addEventListener('click', (event) => {

        event.preventDefault();
        event.stopPropagation();

        closeAsaLightbox();

    });

    asaLightbox.addEventListener('click', (event) => {

        if (event.target === asaLightbox) {
            closeAsaLightbox();
        }

    });

    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape' && asaLightbox.classList.contains('active')) {
            closeAsaLightbox();
        }

    });

}

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

const navLinksAll = document.querySelectorAll('.nav-links a');

const navTargets = Array.from(navLinksAll)
    .map(link => ({ link, target: document.querySelector(link.getAttribute('href')) }))
    .filter(item => item.target);

function updateActiveNavLink() {
    let current = null;

    navTargets.forEach(item => {
        const top = item.target.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY >= top - 200) {
            current = item;
        }
    });

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom && navTargets.length) {
        current = navTargets[navTargets.length - 1];
    }

    navLinksAll.forEach(link => {
        link.classList.toggle('active', current !== null && link === current.link);
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

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

document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent.includes('Join')) {
            console.log('Join button clicked');

        } else if (this.textContent.includes('Learn')) {
            console.log('Learn More button clicked');

        } else if (this.textContent.includes('Donate Now')) {
            console.log('Get Involved button clicked');

            window.location.href = 'https://www.launchgood.com/v4/campaign/asa_western_delivers_aid_and_relief_to_the_families_of_lebanon?src=internal_discover';
        }
    });
});

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

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.impact-stats') && statsObserver.observe(document.querySelector('.impact-stats'));

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
    }
});

const style2 = document.createElement('style');
style2.innerHTML = `
    button:focus, a:focus {
        outline: 2px solid var(--accent-gold);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style2);

console.log('ASA Website loaded successfully!');
