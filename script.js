/* ==========================================================================
   DB YALE — SITE SCRIPT (v2, Nov 2026)
   ========================================================================== */

// --------------------------------------------------------------------------
// EASTER EGGS SWITCH
// Set to true to turn on every easter egg (pirate flag, piragüero, abuela,
// Konami code, and the search-word surprises). Their code lives in
// easter-eggs.js and only loads when this is true.
// --------------------------------------------------------------------------
const DB_EASTER_EGGS = false;

if (DB_EASTER_EGGS) {
    document.body.classList.add('easter-eggs-on');
    const eggScript = document.createElement('script');
    eggScript.src = 'easter-eggs.js';
    document.body.appendChild(eggScript);
}

// Add active class to current page link in sidebar
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links in the sidebar
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    // Get current page URL
    const currentUrl = window.location.href;

    // Loop through all links and add active class to current page link
    navLinks.forEach(link => {
        // Check if the link href is part of the current URL
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });


    // Improve hamburger button functionality
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar');

    if (hamburgerBtn && sidebar) {
        hamburgerBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            hamburgerBtn.setAttribute('aria-expanded', sidebar.classList.contains('open'));

            // Optionally add overlay when sidebar is open on mobile
            let overlay = document.querySelector('.sidebar-overlay');

            if (sidebar.classList.contains('open')) {
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'sidebar-overlay';
                    document.body.appendChild(overlay);

                    // Style the overlay
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.backgroundColor = 'rgba(14, 16, 22, 0.45)';
                    overlay.style.zIndex = '998';
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.3s ease';

                    // Add click event to close sidebar when overlay is clicked
                    overlay.addEventListener('click', function() {
                        sidebar.classList.remove('open');
                        hamburgerBtn.setAttribute('aria-expanded', 'false');
                        this.style.opacity = '0';
                        setTimeout(() => {
                            this.remove();
                        }, 300);
                    });

                    // Animate overlay
                    setTimeout(() => {
                        overlay.style.opacity = '1';
                    }, 10);
                }
            } else if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }
        });
    }

    // Close sidebar when clicking a link on mobile
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');

                    // Remove overlay if it exists
                    const overlay = document.querySelector('.sidebar-overlay');
                    if (overlay) {
                        overlay.style.opacity = '0';
                        setTimeout(() => {
                            overlay.remove();
                        }, 300);
                    }
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    if (hamburgerBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                hamburgerBtn.classList.add('scrolled');
            } else {
                hamburgerBtn.classList.remove('scrolled');
            }
        });
    }
});

// ------------------------------
// Content Filtering Based on Categories
// ------------------------------
// Use the checkboxes from .filter-options
const filters = document.querySelectorAll('.filter-options input[name="category"]');
// Attach event listeners to each checkbox
filters.forEach(input => {
    input.addEventListener('change', filterEvents);
});

// Attach event listener to a reset button, if present
const resetBtn = document.getElementById('resetFilters');
if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
}

function filterEvents() {
    // Get active filter values
    const activeCategories = Array.from(filters)
        .filter(input => input.checked)
        .map(input => input.value.trim());


    // Get all event items (both event-list and media-list items)
    const events = document.querySelectorAll('.event-list li, .media-list li');

    events.forEach(item => {
        // Get data-category, trim it, and split by whitespace
        let itemCategories = item.getAttribute('data-category');
        if (itemCategories) {
            itemCategories = itemCategories.trim().split(/\s+/);
        } else {
            itemCategories = [];
        }

        // Check if any active category is present
        const isVisible = activeCategories.some(category => itemCategories.includes(category));

        // Immediately show/hide without transition:
        item.style.display = isVisible ? 'block' : 'none';
    });
}

function resetFilters() {
    filters.forEach(input => input.checked = true);
    filterEvents();
}

// Initial filter call (only on pages that have filters)
if (filters.length) filterEvents();

// ------------------------------
// Search Bar Functionality
// ------------------------------
// This section is intact even though it's not fully functional
const searchInput = document.getElementById("sidebarSearch");
const searchButton = document.getElementById("searchButton");

if (searchInput && searchButton) {
    const allSections = document.querySelectorAll("h2, h3, p, li");

    function searchContent() {
        const filter = searchInput.value.trim().toLowerCase();
        let found = false;

        allSections.forEach((section) => {
            const text = section.textContent.toLowerCase();
            if (text.includes(filter) && !found) {
                section.scrollIntoView({ behavior: "smooth", block: "center" });
                section.style.backgroundColor = "rgba(79, 163, 219, 0.25)";
                setTimeout(() => section.style.backgroundColor = "", 2000);
                found = true;
            }
        });
        return found;
    }

    function searchAndRedirect() {
        const filter = searchInput.value.trim().toLowerCase();
        const pageMap = {
            "about": "about.html",
            "collaborate": "collaborate.html",
            "syllabus": "syllabus.html",
            "news": "news.html",
            "gallery": "gallery.html",
            "board": "meettheboard.html",
            "members": "meettheboard.html",
            "events": "news.html",
            "mission": "about.html",
            "merch": "merch.html",
            "alumni": "alumni.html",
            "sobre": "about.html",         // 'About'
            "colabora": "collaborate.html",  // 'Collaborate'
            "programa": "syllabus.html",     // 'Syllabus'
            "noticias": "news.html",         // 'News'
            "galería": "gallery.html",       // 'Gallery'
            "junta": "meettheboard.html",    // 'Board'
            "eventos": "news.html",          // 'Events'
            "misión": "about.html",
            "exalumnos": "alumni.html",
            "mercancía": "merch.html"
        };


        for (const keyword in pageMap) {
            if (filter.includes(keyword)) {
                window.location.href = pageMap[keyword];
                return;
            }
        }

        if (!searchContent()) {
            alert("No matching results found.");
        }
    }

    searchButton.addEventListener("click", searchAndRedirect);
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchAndRedirect();
        }
    });
}



// ------------------------------
// Auto-Fill Gallery Pages - nonfunctional
// ------------------------------
const galleryContainer = document.getElementById("dtmfGallery");
if (galleryContainer) {
    const imageFolder = "DMTF_Party_Photos"; // Your folder name
    const totalImages = 10; // Adjust as needed

    for (let i = 1; i <= totalImages; i++) {
        let img = document.createElement("img");
        img.src = `${imageFolder}/img${i}.jpg`;
        img.alt = `DTMF Party Image ${i}`;
        img.classList.add("gallery-image");
        galleryContainer.appendChild(img);
    }
}


// this is for homepage logo button function

document.addEventListener("DOMContentLoaded", () => {
    const logoLink = document.getElementById("homepageLogoLink");

    // Check if we're on the homepage.
    // Adjust this condition based on your actual homepage path.
    const isHomePage =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/";

    if (logoLink && isHomePage) {
        // Prevent normal navigation if on the homepage
        logoLink.addEventListener("click", (event) => {
            event.preventDefault();
            // Smooth scroll to the top
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// ------------------------------
// Dark Mode Toggle
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (!darkModeToggle) return;

    const icon = darkModeToggle.querySelector(".icon");
    const label = darkModeToggle.querySelector(".label");

    function syncToggle() {
        const isDark = document.body.classList.contains("dark-mode");
        if (icon) icon.textContent = isDark ? "☀️" : "🌙";
        if (label) label.textContent = isDark ? "Light mode" : "Dark mode";
        darkModeToggle.setAttribute("aria-pressed", isDark);
    }

    // Apply the saved choice on page load
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    syncToggle();

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
        syncToggle();
    });
});

// Taíno symbol cursor (random each page load)
document.addEventListener("DOMContentLoaded", function() {
    // Array of Taino symbol cursor image paths.
    // Ensure these images are appropriately sized (e.g., 32x32) and in a supported format.
    const cursorImages = [
        "./TainoSymbolCursor1.png",
        "./TainoSymbolCursor2.png",
        "./TainoSymbolCursor3.png",
        "./TainoSymbolCursor4.png",
        "./TainoSymbolCursor5.png",
        "./TainoSymbolCursor6.png",
        "./TainoSymbolCursor7.png",
        "./TainoSymbolCursor8.png",
        "./TainoSymbolCursor9.png",
        "./TainoSymbolCursor10.png",
        "./TainoSymbolCursor11.png",
    ];

    // Randomly select one image from the array.
    const randomCursor = cursorImages[Math.floor(Math.random() * cursorImages.length)];

    // Apply the selected cursor image to the body.
    // The numbers 0 0 define the hotspot offset. 'auto' is the fallback.
    document.body.style.cursor = `url("${randomCursor}"), auto`;


    document.querySelectorAll("summary").forEach(summary => {
        const quoteText = summary.getAttribute("data-quote");
        if (quoteText) {
            const tooltip = document.createElement("div");
            tooltip.classList.add("summary-tooltip");
            tooltip.textContent = quoteText;
            summary.appendChild(tooltip);
        }
    });

});

// ------------------------------
// Home Page News Carousel
// ------------------------------
// Home Page News Carousel
let homeIndex = 0;

function moveSlide(direction) {
    const slidesContainer = document.querySelector(".homepage-carousel-track");
    const totalSlides = document.querySelectorAll(".homepage-carousel-track .news-item").length;
    if (!slidesContainer || !totalSlides) return;

    homeIndex += direction;
    if (homeIndex >= totalSlides) {
        homeIndex = 0;
    } else if (homeIndex < 0) {
        homeIndex = totalSlides - 1;
    }

    slidesContainer.style.transform = `translateX(-${homeIndex * 100}%)`;
}


// ------------------------------
// Gallery Carousel
// ------------------------------
// Gallery Carousel functionality - IMPROVED VERSION
document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.gallery-carousel-container');

    carousels.forEach(function(carousel, carouselIndex) {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.carousel-button.prev');
        const nextBtn = carousel.querySelector('.carousel-button.next');
        const items = carousel.querySelectorAll('.carousel-item');

        if (!track || !prevBtn || !nextBtn || items.length === 0) {
            return;
        }

        // Variables for tracking state
        let currentPosition = 0;
        let itemWidth = 0;
        let visibleItems = 1;
        let maxPosition = 0;

        // Function to calculate dimensions
        function calculateDimensions() {
            const carouselRect = carousel.getBoundingClientRect();
            const windowWidth = carousel.querySelector('.carousel-window')?.getBoundingClientRect().width || (carouselRect.width - 112);

            if (items.length > 0) {
                const firstItem = items[0];
                itemWidth = firstItem.offsetWidth + 20; // Add gap
                visibleItems = Math.floor(windowWidth / itemWidth);
                if (visibleItems < 1) visibleItems = 1;
                maxPosition = Math.max(0, items.length - visibleItems);
            }

        }

        // Function to update the carousel position
        function updatePosition() {
            calculateDimensions();

            // Clamp current position to valid range
            currentPosition = Math.max(0, Math.min(currentPosition, maxPosition));

            // Calculate the translation
            const translateX = -currentPosition * itemWidth;
            track.style.transform = `translateX(${translateX}px)`;

            // Update button states
            const canGoPrev = currentPosition > 0;
            const canGoNext = currentPosition < maxPosition;

            // Enable/disable buttons
            prevBtn.disabled = !canGoPrev;
            nextBtn.disabled = !canGoNext;


        }

        // Handle prev button click
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();


            if (currentPosition > 0) {
                currentPosition--;
                updatePosition();
            }
        });

        // Handle next button click
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();


            if (currentPosition < maxPosition) {
                currentPosition++;
                updatePosition();
            }
        });

        // Handle window resize with debouncing
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updatePosition();
            }, 250);
        });

        // Initialize
        calculateDimensions();
        updatePosition();

    });
});


// Event search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('eventSearch');
    const searchButton = document.getElementById('searchButton');
    const eventItems = document.querySelectorAll('.event-list li, .media-list li');

    // Search function
    function searchEvents() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let resultsFound = false;

        eventItems.forEach(item => {
            const eventText = item.textContent.toLowerCase();
            const shouldShow = eventText.includes(searchTerm);

            // Only modify display if it's not already hidden by category filters
            if (shouldShow) {
                item.classList.add('search-match');
                resultsFound = true;
            } else {
                item.classList.remove('search-match');
            }

            // Apply search results only if item is not already hidden by category filter
            if (item.style.display !== 'none') {
                item.style.display = shouldShow ? 'block' : 'none';
            }
        });

        // Show a message if no results
        const noResultsMessage = document.getElementById('noResultsMessage');
        if (!resultsFound && searchTerm !== '') {
            if (!noResultsMessage) {
                const message = document.createElement('p');
                message.id = 'noResultsMessage';
                message.textContent = 'No events match your search. Try different keywords.';
                message.style.textAlign = 'center';
                message.style.padding = '1rem';
                message.style.color = '#666';
                document.getElementById('newsList').appendChild(message);
            }
        } else {
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    }

    // Event listeners
    if (searchButton) {
        searchButton.addEventListener('click', searchEvents);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEvents();
            }
        });

        // Optional: Real-time search as user types
        searchInput.addEventListener('input', function() {
            if (this.value.length >= 2 || this.value === '') {
                searchEvents();
            }
        });
    }

    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const eventsList = document.getElementById('newsList');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Switch view based on data-view attribute
            const viewType = this.getAttribute('data-view');
            if (viewType === 'calendar') {
                eventsList.classList.add('calendar-view');
            } else {
                eventsList.classList.remove('calendar-view');
            }
        });
    });
});

// Password protection functionality
document.addEventListener('DOMContentLoaded', function() {
    const passwordSection = document.getElementById('password-section');
    const animationContainer = document.getElementById('animation-container');
    const protectedContent = document.getElementById('protected-content');
    const passwordInput = document.getElementById('alumni-password');
    const submitButton = document.getElementById('submit-password');
    const errorMessage = document.getElementById('password-error');
    const logoutBtn = document.getElementById('logout-btn');

    // The password you want to use (in production, store and verify this securely)
    const correctPassword = 'bomba2025';

    // Check if we're already logged in (using sessionStorage)
    if (sessionStorage.getItem('alumniAuthenticated') === 'true') {
        showProtectedContent();
    }

    // Handle password submission
    if (submitButton) {
        submitButton.addEventListener('click', validatePassword);
    }

    // Allow enter key to submit password
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                validatePassword();
            }
        });
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (password === correctPassword) {
            // Password is correct: hide the password section and error message
            passwordSection.style.display = 'none';
            errorMessage.style.display = 'none';

            // Show animation
            animationContainer.style.display = 'block';

            // Set session storage to remember authentication within this session
            sessionStorage.setItem('alumniAuthenticated', 'true');

            // After animation completes (3 seconds), show protected content
            setTimeout(function() {
                animationContainer.style.display = 'none';
                showProtectedContent();
            }, 3000);
        } else {
            // Password is incorrect: show error and clear input
            errorMessage.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();

            // Shake animation for error feedback
            passwordSection.classList.add('shake');
            setTimeout(function() {
                passwordSection.classList.remove('shake');
            }, 500);
        }
    }

    function showProtectedContent() {
        passwordSection.style.display = 'none';
        animationContainer.style.display = 'none';
        protectedContent.style.display = 'block';
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('alumniAuthenticated');
            protectedContent.style.display = 'none';
            passwordInput.value = '';
            passwordSection.style.display = 'block';
        });
    }
});

// ------------------------------
// Back to Top button
// ------------------------------
// The button is position: fixed in CSS; JS only shows/hides it.
document.addEventListener('DOMContentLoaded', function() {
    let backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.type = 'button';
        document.body.appendChild(backToTopBtn);
    }
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<span class="arrow-icon" aria-hidden="true">↑</span>';

    const SHOW_AFTER = 400; // px scrolled before the button appears
    let ticking = false;

    function update() {
        backToTopBtn.classList.toggle('show', window.scrollY > SHOW_AFTER);
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function() {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', { event_category: 'Navigation', event_label: 'Back to Top Button' });
        }
    });

    update();
});


// Adding dot animation to loading text
document.addEventListener('DOMContentLoaded', function() {
    const loadingText = document.querySelector('.dot-animation');

    if (loadingText) {
        setInterval(function() {
            if (loadingText.textContent === '.') {
                loadingText.textContent = '..';
            } else if (loadingText.textContent === '..') {
                loadingText.textContent = '...';
            } else {
                loadingText.textContent = '.';
            }
        }, 500);
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Note: .fade-in-section elements are always visible in the v2 design,
// so the old scroll-reveal code was removed.
// Calendar View functionality
document.addEventListener('DOMContentLoaded', function() {
    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const eventsList = document.getElementById('newsList');

    if (!viewButtons.length || !eventsList) return;

    // Process dates to prepare for calendar view
    function processEventDates() {
        const eventItems = document.querySelectorAll('.event-list li');

        eventItems.forEach(item => {
            const dateText = item.querySelector('em');
            if (dateText) {
                // Parse date from the em element
                const dateContent = dateText.textContent.trim();

                // Store the date text as a data attribute for sorting/filtering
                item.setAttribute('data-date', dateContent);

                // Optional: You could parse actual dates here if the format is consistent
                // For example: if dates are in format "Jan 25", you could convert to "2025-01-25"
                // This would allow for better sorting and organization
            }
        });
    }

    // Function to enhance calendar view with visual elements
    function enhanceCalendarView() {
        // Add any dynamic elements needed for calendar view
        const calendarCategories = document.querySelectorAll('.calendar-view .events-category');

        calendarCategories.forEach(category => {
            // Optional: Group events by month if dates are available
            const events = category.querySelectorAll('.event-list li[data-date]');
            const eventsByMonth = {};

            // This is a simple example - you could enhance with proper date parsing
            events.forEach(event => {
                const dateText = event.getAttribute('data-date');
                const monthMatch = dateText.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);

                if (monthMatch) {
                    const month = monthMatch[1];
                    if (!eventsByMonth[month]) {
                        eventsByMonth[month] = [];
                    }
                    eventsByMonth[month].push(event);
                }
            });
        });
    }
    // Toggle between views
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Switch view based on data-view attribute
            const viewType = this.getAttribute('data-view');

            if (viewType === 'calendar') {
                eventsList.classList.add('calendar-view');
                // Process dates and enhance calendar view
                processEventDates();
                enhanceCalendarView();
            } else {
                eventsList.classList.remove('calendar-view');
            }

            // Store the current view preference in localStorage
            localStorage.setItem('eventViewPreference', viewType);
        });
    });

    // Check for saved preference
    const savedView = localStorage.getItem('eventViewPreference');
    if (savedView) {
        // Find the button with the matching data-view attribute
        const matchingButton = Array.from(viewButtons).find(btn =>
            btn.getAttribute('data-view') === savedView
        );

        if (matchingButton) {
            // Trigger a click event on the matching button
            matchingButton.click();
        }
    }
});

// Image Pull-Down Animation with Fact Cards
document.addEventListener('DOMContentLoaded', function() {
    // List of DB Yale facts
    const dbFacts = [
        "Despierta Boricua was founded at Yale in 1974.",
        "Despierta Boricua means 'Wake up, Puerto Rican' in Spanish.",
        "DB Yale holds weekly cafecitos led by Antonio for networking and conversation.",
        "DB Yale hosted a Julia de Burgos Anniversary event on Feb 23 featuring poetry readings.",
        "Despierta Boricua organizes Bomba classes to explore Afro-Puerto Rican dance traditions.",
        "DB Yale collaborates with MEChA to foster intercultural dialogue and understanding.",
        "The organization hosts community cooking events at La Casa Cultural.",
        "DB Yale works to promote awareness about Puerto Rico's political status and history."
    ];

    // Target images that have the 'desktop-float' class in the syllabus section
    const targetImages = document.querySelectorAll('.desktop-float');

    targetImages.forEach((img, index) => {
        // Create a container for the whole interactive element
        const container = document.createElement('div');
        container.className = 'tilt-popup-container';
        container.style.position = 'relative';
        container.style.width = img.offsetWidth + 'px';
        container.style.height = img.offsetHeight + 'px';
        container.style.float = 'right';
        container.style.margin = '0 0 15px 15px';
        container.style.cursor = 'pointer';
        container.style.perspective = '800px';
        container.style.transformStyle = 'preserve-3d';

        // Create the image container that will tilt
        const imageContainer = document.createElement('div');
        imageContainer.className = 'tilt-image';
        imageContainer.style.width = '100%';
        imageContainer.style.height = '100%';
        imageContainer.style.position = 'relative';
        imageContainer.style.transformOrigin = 'bottom center';
        imageContainer.style.transform = 'rotateX(0deg)';
        imageContainer.style.transition = 'transform 0.5s cubic-bezier(0.3, 1.05, 0.4, 1.05)';
        imageContainer.style.zIndex = '2';

        // Clone the original image
        const clonedImg = img.cloneNode(true);
        clonedImg.style.width = '100%';
        clonedImg.style.height = '100%';
        clonedImg.style.display = 'block';
        clonedImg.style.objectFit = 'cover';

        // Create the fact card that will pop out
        const factCard = document.createElement('div');
        factCard.className = 'fact-popup';
        factCard.style.position = 'absolute';
        factCard.style.width = '100%';
        factCard.style.zIndex = '1';
        factCard.style.left = '0';
        factCard.style.top = '-60px';  // Position above the image
        factCard.style.transformOrigin = 'center bottom';
        factCard.style.transform = 'translateY(-20px) scale(0.7)';
        factCard.style.opacity = '0';
        factCard.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';

        // Select a random fact
        const factText = dbFacts[index % dbFacts.length];
        factCard.textContent = `DB Fact: ${factText}`;

        // Create a small visual cue at the bottom of the image
        const visualCue = document.createElement('div');
        visualCue.className = 'visual-cue';
        visualCue.style.position = 'absolute';
        visualCue.style.bottom = '5px';
        visualCue.style.left = '50%';
        visualCue.style.transform = 'translateX(-50%)';
        visualCue.style.width = '40px';
        visualCue.style.height = '5px';
        visualCue.style.opacity = '0.7';
        visualCue.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

        // Hover effect for subtle discovery hint
        container.addEventListener('mouseenter', function() {
            if (!isTilted) {
                visualCue.style.opacity = '1';
                // Very slight initial tilt on hover - now correct direction
                imageContainer.style.transform = 'rotateX(-3deg)';
            }
        });

        container.addEventListener('mouseleave', function() {
            if (!isTilted) {
                visualCue.style.opacity = '0.7';
                imageContainer.style.transform = 'rotateX(0deg)';
            }
        });

        // State tracking
        let isTilted = false;

        // Toggle tilt animation on click
        container.addEventListener('click', function() {
            if (!isTilted) {
                // Tilt image with top toward viewer (negative X rotation)
                imageContainer.style.transform = 'rotateX(-22deg)';

                // Show fact card popping out
                setTimeout(() => {
                    factCard.style.opacity = '1';
                    factCard.style.transform = 'translateY(0) scale(1)';
                    factCard.style.zIndex = '5';  // Ensure it's above everything
                }, 100);

                isTilted = true;
            } else {
                // Hide fact card first
                factCard.style.opacity = '0';
                factCard.style.transform = 'translateY(-20px) scale(0.7)';
                factCard.style.zIndex = '1';

                // Then return image to normal position
                setTimeout(() => {
                    imageContainer.style.transform = 'rotateX(0deg)';
                }, 200);

                isTilted = false;
            }
        });

        // Assemble all components
        imageContainer.appendChild(clonedImg);
        imageContainer.appendChild(visualCue);
        container.appendChild(factCard);
        container.appendChild(imageContainer);

        // Replace the original image
        img.parentNode.replaceChild(container, img);

    });
});



// ===== LEAFLET MAP FOR BOARD MEMBERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the map element exists
    const mapElement = document.getElementById('board-member-map');
    if (!mapElement) {
        return;
    }
    // Leaflet didn't load (offline / blocked): leave the map area empty instead of erroring
    if (typeof L === 'undefined') {
        return;
    }


    // Board member locations - UPDATED WITH CORRECT INFORMATION
    const boardMembers = [
        {
            name: "Aryana Ramos-Vazquez",
            role: "Co-President",
            lat: 18.2011,
            lng: -67.1399,
            city: "Mayagüez",
            description: "My family is from Mayagüez on the west coast of Puerto Rico."
        },
        {
            name: "Antonio Padilla",
            role: "Co-President",
            lat: 18.0794,
            lng: -66.9603,
            city: "Sabana Grande / Yauco",
            description: "My family is from Sabana Grande and Yauco."
        },
        {
            name: "Gabriella Pollack",
            role: "Event Coordinator",
            lat: 18.4655,
            lng: -66.1057,
            city: "Condado",
            description: "My mom is from Condado, San Juan."
        },
        {
            name: "Gabby Pollack",
            role: "Event Coordinator",
            lat: 18.4655,
            lng: -66.1057,
            city: "Condado",
            description: "My family is from Condado, San Juan."
        },
        {
            name: "Olivia Catayong",
            role: "Social Media Manager",
            lat: 18.4726,
            lng: -66.7199,
            city: "Arecibo",
            description: "My family is from Arecibo on the northern coast."
        },
        {
            name: "Daniel Torres",
            role: "Treasurer",
            lat: 18.4450,
            lng: -66.2541,
            city: "Toa Baja",
            description: "My family is from Toa Baja."
        },
        {
            name: "Sonia Rosa",
            role: "Local Network Chair",
            lat: 18.4037,
            lng: -66.0515,
            city: "Río Piedras",
            description: "My family is from Río Piedras, San Juan."
        },
        {
            name: "Fabiola Andújar",
            role: "Global Network Chair",
            lat: 18.2656,  // Utuado coordinates
            lng: -66.7004,
            city: "Utuado",
            description: "My family is from Utuado."
        },
        {
            name: "Nina Feliciano-Bautista",
            role: "Cafecito Coordinator",
            lat: 18.3833,  // Bayamón coordinates
            lng: -66.1583,
            city: "Bayamón",
            description: "My family is from Bayamón."
        }
    ];

    // Role colors
    const roleColors = {
        "Co-President": "#E74C3C",
        "Event Coordinator": "#3498DB",
        "Social Media Manager": "#9B59B6",
        "Treasurer": "#2ECC71",
        "Local Network Chair": "#F39C12",
        "Global Network Chair": "#1ABC9C",
        "Cafecito Coordinator": "#E67E22"
    };

    // Initialize the map centered on Puerto Rico
    // scrollWheelZoom: false prevents zoom on scroll
    // dragging: true allows panning
    const map = L.map('board-member-map', {
        scrollWheelZoom: false,  // Disable scroll zoom
        doubleClickZoom: false   // Disable double-click zoom
    }).setView([18.2208, -66.5901], 9);

    // Add map tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);


    // Add markers for each board member
    boardMembers.forEach((member, index) => {

        // Create custom icon
        const markerColor = roleColors[member.role] || "#95A5A6";

        const marker = L.circleMarker([member.lat, member.lng], {
            radius: 12,
            fillColor: markerColor,
            color: "#FFFFFF",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        }).addTo(map);

        // Create popup content
        const popupContent = `
            <div style="padding: 10px; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">${member.name}</h3>
                <p style="margin: 4px 0; color: ${markerColor}; font-weight: bold; font-size: 14px;">${member.role}</p>
                <p style="margin: 4px 0; color: #666; font-size: 13px;">📍 ${member.city}</p>
                <p style="margin: 8px 0 0 0; color: #555; font-size: 13px; line-height: 1.4;">${member.description}</p>
            </div>
        `;

        // Bind popup without automatic pan
        marker.bindPopup(popupContent, {
            autoPan: false  // This prevents the map from panning/zooming when popup opens
        });

        // Add click event to highlight board member card
        marker.on('click', function(e) {
            // Prevent default event behavior and stop propagation
            L.DomEvent.stopPropagation(e);
            highlightBoardMember(member.name);
            // Open popup without changing zoom
            this.openPopup();
        });

        // Add hover effect
        marker.on('mouseover', function() {
            this.setStyle({
                radius: 15,
                weight: 4
            });
        });

        marker.on('mouseout', function() {
            this.setStyle({
                radius: 12,
                weight: 3
            });
        });
    });


    // Function to highlight board member card
    function highlightBoardMember(name) {
        const boardCards = document.querySelectorAll('.board-member');

        boardCards.forEach(card => {
            const nameElement = card.querySelector('.person-name');
            if (nameElement && nameElement.textContent.trim() === name) {
                // Don't scroll - just add highlight effect
                // card.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Add highlight effect
                card.classList.add('highlight-member');

                // Remove highlight after 2 seconds
                setTimeout(() => {
                    card.classList.remove('highlight-member');
                }, 2000);
            }
        });
    }
});



// JavaScript for the collapsible section functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find all collapsible headers
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    // Add click event to each header
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle the expanded state
            const toggleButton = this.querySelector('.collapse-toggle');
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

            // Update the aria-expanded attribute
            toggleButton.setAttribute('aria-expanded', !isExpanded);

            // Find the related content section
            const content = this.nextElementSibling;

            // Toggle the expanded class
            if (isExpanded) {
                content.classList.remove('expanded');
            } else {
                content.classList.add('expanded');
            }
        });
    });

    // Initialize: Ensure all sections start collapsed
    document.querySelectorAll('.collapsible-content').forEach(content => {
        content.classList.remove('expanded');
    });

    // Initialize: Set all toggle buttons to collapsed state
    document.querySelectorAll('.collapse-toggle').forEach(button => {
        button.setAttribute('aria-expanded', 'false');
    });
});