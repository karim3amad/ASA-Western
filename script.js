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


/* ==================== GALLERY ==================== */

const galleryTrack = document.getElementById("galleryTrack");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryDots = document.getElementById("galleryDots");

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentSlide = 0;
let itemsPerView = 3;


/* Determine how many photos are visible */

function updateItemsPerView() {

    if (window.innerWidth <= 768) {
        itemsPerView = 1;
    } else if (window.innerWidth <= 1000) {
        itemsPerView = 2;
    } else {
        itemsPerView = 3;
    }

}


/* Create dots */

function createDots() {

    galleryDots.innerHTML = "";

    const totalSlides = Math.ceil(
        galleryItems.length / itemsPerView
    );

    for (let i = 0; i < totalSlides; i++) {

        const dot = document.createElement("button");

        dot.classList.add("gallery-dot");

        if (i === currentSlide) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentSlide = i;

            updateGallery();

        });

        galleryDots.appendChild(dot);

    }

}


/* Move gallery */

function updateGallery() {

    updateItemsPerView();

    const gap = window.innerWidth <= 768 ? 15 : 25;

    const itemWidth =
        galleryItems[0].getBoundingClientRect().width;

    const movement =
        currentSlide *
        (itemWidth + gap) *
        itemsPerView;

    galleryTrack.style.transform =
        `translateX(-${movement}px)`;


    /* Update dots */

    const dots =
        document.querySelectorAll(".gallery-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


/* Next */

galleryNext.addEventListener("click", () => {

    const maxSlide =
        Math.ceil(galleryItems.length / itemsPerView) - 1;

    if (currentSlide < maxSlide) {

        currentSlide++;

    } else {

        currentSlide = 0;

    }

    updateGallery();

});


/* Previous */

galleryPrev.addEventListener("click", () => {

    const maxSlide =
        Math.ceil(galleryItems.length / itemsPerView) - 1;

    if (currentSlide > 0) {

        currentSlide--;

    } else {

        currentSlide = maxSlide;

    }

    updateGallery();

});


/* ==================== LIGHTBOX ==================== */

let lightboxIndex = 0;


/* Open image */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        lightboxIndex = index;

        openLightbox();

    });

});


function openLightbox() {

    const image =
        galleryItems[lightboxIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* Close */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* Lightbox next */

lightboxNext.addEventListener("click", () => {

    lightboxIndex++;

    if (lightboxIndex >= galleryItems.length) {
        lightboxIndex = 0;
    }

    openLightbox();

});


/* Lightbox previous */

lightboxPrev.addEventListener("click", () => {

    lightboxIndex--;

    if (lightboxIndex < 0) {
        lightboxIndex = galleryItems.length - 1;
    }

    openLightbox();

});


/* Close when clicking background */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* Keyboard controls */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        lightboxNext.click();
    }

    if (event.key === "ArrowLeft") {
        lightboxPrev.click();
    }

});


/* ==================== SWIPE SUPPORT ==================== */

let touchStartX = 0;
let touchEndX = 0;

galleryTrack.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});


galleryTrack.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {

        galleryNext.click();

    } else {

        galleryPrev.click();

    }

});


/* ==================== INITIALIZE ==================== */

updateItemsPerView();

createDots();

updateGallery();


/* Update when window changes size */

window.addEventListener("resize", () => {

    const previousItemsPerView = itemsPerView;

    updateItemsPerView();

    if (previousItemsPerView !== itemsPerView) {

        currentSlide = 0;

        createDots();

    }

    updateGallery();

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

// Show more button
const button = document.getElementById("showMoreEvents");
const moreEvents = document.getElementById("moreEvents");
const eventsSection = document.getElementById("events");

button.addEventListener("click", () => {

    const isExpanded = moreEvents.classList.contains("show");

    if (isExpanded) {

        // Collapse
        moreEvents.classList.remove("show");
        button.textContent = "Show More Events";

        // Wait for the collapse animation to begin, then scroll
        setTimeout(() => {
            eventsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);

    } else {

        // Expand
        moreEvents.classList.add("show");
        button.textContent = "Show Less";

    }

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