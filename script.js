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

    // Handle sidebar logo hover effect
    const sidebarLogo = document.querySelector('.sidebar-logo img');
    if (sidebarLogo) {
        sidebarLogo.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });

        sidebarLogo.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Improve hamburger button functionality
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar');

    if (hamburgerBtn && sidebar) {
        hamburgerBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');

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
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    overlay.style.zIndex = '998';
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.3s ease';

                    // Add click event to close sidebar when overlay is clicked
                    overlay.addEventListener('click', function() {
                        sidebar.classList.remove('open');
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

        console.log("Active categories:", activeCategories);

        // Get all event items (both event-list and media-list items)
        const events = document.querySelectorAll('.event-list li, .media-list li');
        console.log("Found event items:", events.length);

        events.forEach(item => {
            // Get data-category, trim it, and split by whitespace
            let itemCategories = item.getAttribute('data-category');
            if (itemCategories) {
                itemCategories = itemCategories.trim().split(/\s+/);
            } else {
                itemCategories = [];
            }
            console.log("Item categories:", itemCategories);

            // Check if any active category is present
            const isVisible = activeCategories.some(category => itemCategories.includes(category));
            console.log("Setting display for item:", isVisible);

            // Immediately show/hide without transition:
            item.style.display = isVisible ? 'block' : 'none';
        });
    }

    function resetFilters() {
        filters.forEach(input => input.checked = true);
        filterEvents();
    }

    // Initial filter call
    filterEvents();

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
                    section.style.backgroundColor = "yellow";
                    setTimeout(() => section.style.backgroundColor = "transparent", 2000);
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
    } else {
        console.error("Search input or button not found!");
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

    // ------------------------------
    // Language Toggle (English/Spanish)
    // ------------------------------
document.addEventListener("DOMContentLoaded", () => {
        const langToggle = document.getElementById("lang-toggle");
        const elementsToTranslate = document.querySelectorAll("[data-key]");
        let currentLang = localStorage.getItem("lang") || "en";

        function updateLanguage(lang) {
            elementsToTranslate.forEach((el) => {
                const key = el.getAttribute("data-key");
                // Assumes translations is a defined global object
                if (typeof translations !== "undefined" && translations[lang] && translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
        }



// Function to update all translatable elements using innerHTML.
    function updateLanguage(lang) {
        const elementsToTranslate = document.querySelectorAll("[data-key]");
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute("data-key");
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

        if (langToggle) {
            langToggle.addEventListener("click", () => {
                currentLang = currentLang === "en" ? "es" : "en";
                localStorage.setItem("lang", currentLang);
                updateLanguage(currentLang);
                langToggle.textContent = currentLang === "en" ? "Español" : "English";
            });

            updateLanguage(currentLang);
            langToggle.textContent = currentLang === "en" ? "Español" : "English";
        } else {
            console.error("Language toggle not found!");
        }
    });



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

document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById("backToTop");

    // Show the button when the user scrolls down 100px
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Scroll smoothly back to the top when the button is clicked
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


// ------------------------------
// Dark Mode Toggle
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    if (!darkModeToggle) {
        return console.error("Dark mode toggle not found!");
    }

    // On page load, check localStorage and apply dark mode if enabled
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        console.log("Dark mode applied from localStorage");
    }

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");

        // Save the current mode to localStorage
        localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
        console.log("Dark mode toggled:", isDark);
    });
});

//Curosor randomization
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
    const totalSlides = document.querySelectorAll(".news-item").length;

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
// Gallery Carousel functionality
document.addEventListener("DOMContentLoaded", function() {
    // Get all carousel containers
    const carousels = document.querySelectorAll('.gallery-carousel-container');

    carousels.forEach(function(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.carousel-button.prev');
        const nextBtn = carousel.querySelector('.carousel-button.next');
        const items = carousel.querySelectorAll('.carousel-item');

        if (!track || !prevBtn || !nextBtn || items.length === 0) return;

        // Variables for tracking state
        let currentPosition = 0;
        let itemWidth = items[0].offsetWidth + 20; // Add the gap value (20px)
        let visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
        let maxPosition = Math.max(0, items.length - visibleItems);

        // Set initial position
        track.style.transform = `translateX(0)`;

        // Function to update the carousel position
        function updatePosition() {
            // Recalculate dimensions in case of window resize
            itemWidth = items[0].offsetWidth + 20; // Adding gap
            visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
            maxPosition = Math.max(0, items.length - visibleItems);

            // Ensure current position isn't beyond the max
            if (currentPosition > maxPosition) {
                currentPosition = maxPosition;
            }

            // Calculate the translation amount
            const translateX = -currentPosition * itemWidth;
            track.style.transform = `translateX(${translateX}px)`;

            // Update button states
            prevBtn.disabled = currentPosition <= 0;
            nextBtn.disabled = currentPosition >= maxPosition;

            // Visual indication for disabled buttons
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        }

        // Handle click on prev button
        prevBtn.addEventListener('click', function() {
            if (currentPosition > 0) {
                currentPosition--;
                updatePosition();
            }
        });

        // Handle click on next button
        nextBtn.addEventListener('click', function() {
            if (currentPosition < maxPosition) {
                currentPosition++;
                updatePosition();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            updatePosition();
        });

        // Initial update
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


// Alumni password protection functionality
document.addEventListener('DOMContentLoaded', function() {
    const passwordSection = document.getElementById('password-section');
    const animationContainer = document.getElementById('animation-container');
    const protectedContent = document.getElementById('protected-content');
    const passwordInput = document.getElementById('alumni-password');
    const submitButton = document.getElementById('submit-password');
    const errorMessage = document.getElementById('password-error');

    // The password you want to use (you should store and verify this securely in a production environment)
    const correctPassword = 'bomba2025'; // Change this to your desired password

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
            // Password is correct
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
            // Password is incorrect
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

    // Add shake animation for error feedback
    const shakeKeyframes = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
  `;

    // Add the keyframes to the page
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(shakeKeyframes));
    document.head.appendChild(style);

    // Optional: Add a logout button functionality
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Log Out';
    logoutBtn.className = 'logout-btn';
    logoutBtn.style.marginTop = '1rem';
    logoutBtn.style.padding = '8px 15px';
    logoutBtn.style.backgroundColor = '#f8f9fa';
    logoutBtn.style.border = '1px solid #ddd';
    logoutBtn.style.borderRadius = '4px';
    logoutBtn.style.cursor = 'pointer';

    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('alumniAuthenticated');
        protectedContent.style.display = 'none';
        passwordInput.value = '';
        passwordSection.style.display = 'block';
    });

    // Append logout button to the protected content
    if (protectedContent) {
        protectedContent.appendChild(logoutBtn);
    }
});


// Scroll Animation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Select all sections to animate
    const sections = document.querySelectorAll('.fade-in-section');

    // Optional: Set stagger indices for child elements
    sections.forEach(section => {
        const staggerItems = section.querySelectorAll('.stagger-item');
        staggerItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
    });

    // Check if sections are visible when page loads
    checkVisibility();

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);

    // Function to check if elements are in the viewport
    function checkVisibility() {
        sections.forEach(section => {
            // Get section position relative to viewport
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            // Check if section is in viewport (with offset)
            // Adjust the offset value to control when the animation triggers
            const offset = 100; // section becomes visible when it's 100px from entering the viewport

            const isVisible =
                (sectionTop < window.innerHeight - offset) &&
                (sectionBottom > offset);

            // Add or remove the visible class
            if (isVisible) {
                section.classList.add('is-visible');
            } else {
                // Optional: if you want sections to fade out when scrolled past
                // section.classList.remove('is-visible');
            }
        });
    }

    // Check for visibility on resize too
    window.addEventListener('resize', checkVisibility);
});

// Alternative approach using Intersection Observer API (more modern)
// Uncomment this section and comment out the above code if you prefer to use this approach

/*
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.fade-in-section');

  // Set stagger indices
  sections.forEach(section => {
    const staggerItems = section.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, index) => {
      item.style.setProperty('--item-index', index);
    });
  });

  // Create observer instance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Optional: stop observing after the section becomes visible
        // observer.unobserve(entry.target);
      } else {
        // Optional: remove class when section is no longer visible
        // entry.target.classList.remove('is-visible');
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.15, // 15% of the section must be visible
    rootMargin: '0px 0px -50px 0px' // offset from the bottom
  });

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
});
*/
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
        clonedImg.style.borderRadius = '8px';
        clonedImg.style.objectFit = 'cover';
        clonedImg.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';

        // Create the fact card that will pop out
        const factCard = document.createElement('div');
        factCard.className = 'fact-popup';
        factCard.style.position = 'absolute';
        factCard.style.width = '100%';
        factCard.style.padding = '15px';
        factCard.style.backgroundColor = '#007bff';
        factCard.style.color = 'white';
        factCard.style.borderRadius = '8px';
        factCard.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        factCard.style.fontWeight = 'bold';
        factCard.style.fontSize = '14px';
        factCard.style.textAlign = 'center';
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
        visualCue.style.backgroundColor = 'rgba(0,0,0,0.2)';
        visualCue.style.borderRadius = '3px';
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

        // Add styles for 3D effects and dark mode
        const styleElement = document.createElement('style');
        styleElement.textContent = `
      .tilt-popup-container {
        perspective: 800px;
        transform-style: preserve-3d;
        overflow: visible;
      }
      
      .tilt-image {
        backface-visibility: hidden;
      }
      
      body.dark-mode .fact-popup {
        background-color: #0056b3; 
        color: #fff;
      }
      
      body.dark-mode .visual-cue {
        background-color: rgba(255,255,255,0.2);
      }
      
      @media (max-width: 768px) {
        .tilt-popup-container {
          float: none;
          margin: 1.5rem auto;
          max-width: 280px;
        }
        
        .fact-popup {
          font-size: 12px;
          padding: 10px;
        }
      }
    `;
        document.head.appendChild(styleElement);
    });
});



// Board member locations - update these with actual locations
const boardMembers = [
    {
        name: "Jaden Gonzalez",
        role: "Co-President",
        position: { lat: 18.2011, lng: -67.1399 }, // Mayagüez
        description: "My family comes from Mayagüez on the west coast of Puerto Rico."
    },
    {
        name: "Kristen St. Louis",
        role: "Co-President",
        position: { lat: 18.0111, lng: -66.6140 }, // Ponce
        description: "My family's roots are in Ponce, known as 'La Perla del Sur'."
    },
    {
        name: "Elyse Thomas",
        role: "Event Coordinator",
        position: { lat: 18.0356, lng: -66.8509 }, // Yauco
        description: "My family is from Yauco, famous for its coffee production."
    },
    {
        name: "Aryana Ramos-Vazquez",
        role: "Social Media Manager",
        position: { lat: 18.4655, lng: -66.1057 }, // San Juan
        description: "My family comes from San Juan, the vibrant capital city."
    },
    {
        name: "Alanna Rivera",
        role: "Treasurer",
        position: { lat: 17.9841, lng: -66.1132 }, // Guayama
        description: "My roots are in Guayama on the southern coast."
    },
    {
        name: "Sonia Rosa",
        role: "Alumni Relations",
        position: { lat: 18.3263, lng: -65.6525 }, // Fajardo
        description: "My family is from Fajardo on the eastern tip of the island."
    },
    {
        name: "Roberto Lopez",
        role: "Social Media Manager",
        position: { lat: 18.3031, lng: -65.3013 }, // Culebra
        description: "My family comes from the beautiful island of Culebra."
    },
    {
        name: "Antonio Padilla",
        role: "First Year Mentor",
        position: { lat: 18.4663, lng: -66.1057 }, // San Juan
        description: "My family is from San Juan, where I learned to cook traditional Puerto Rican dishes."
    }
];

// Helper function to get pin color based on role
function getPinColorForRole(role) {
    const roleColors = {
        "Co-President": "#E74C3C",              // Red
        "Event Coordinator": "#3498DB",         // Blue
        "Social Media Manager": "#9B59B6",      // Purple
        "Treasurer": "#2ECC71",                 // Green
        "Alumni Relations": "#F39C12",          // Orange
        "First Year Mentor": "#1ABC9C"          // Turquoise
    };

    return roleColors[role] || "#95A5A6"; // Default gray if role not found
}

// Initialize the map
function initMap() {
    console.log("Map initialization started"); // Debug log

    // Center map on Puerto Rico
    const puertoRico = { lat: 18.2208, lng: -66.5901 };

    // Create the map centered on Puerto Rico
    const map = new google.maps.Map(document.getElementById("board-member-map"), {
        zoom: 9,
        center: puertoRico,
        mapTypeId: "terrain",
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ["roadmap", "terrain", "satellite"]
        }
    });

    // Create an info window to share between markers
    const infoWindow = new google.maps.InfoWindow();

    console.log("Adding markers for " + boardMembers.length + " board members"); // Debug log

    // Create markers for each board member
    boardMembers.forEach((member, i) => {
        console.log(`Creating marker for ${member.name} at position:`, member.position); // Debug log

        // Create the marker with standard pin first (more reliable)
        const marker = new google.maps.Marker({
            position: member.position,
            map: map,
            title: member.name,
            animation: google.maps.Animation.DROP
        });

        // Try to set custom pin style after marker is created
        setTimeout(() => {
            marker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: getPinColorForRole(member.role),
                fillOpacity: 0.9,
                strokeWeight: 2,
                strokeColor: "#FFFFFF",
                scale: 10
            });
        }, 500); // Small delay to ensure marker is properly created first

        // Add click listener to show info window with member details
        marker.addListener("click", () => {
            console.log("Marker clicked:", member.name); // Debug log

            // Create content for info window
            const contentString = `
        <div class="map-info-window">
          <h3>${member.name}</h3>
          <p><strong>${member.role}</strong></p>
          <p>${member.description}</p>
        </div>
      `;

            // Open info window
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);

            // Find and highlight the board member card
            const boardMembers = document.querySelectorAll('.board-member');

            boardMembers.forEach(element => {
                const nameElement = element.querySelector('.person-name');
                if (nameElement && nameElement.textContent.includes(member.name)) {
                    // Scroll to the member and add a highlight effect
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('highlight-member');
                    setTimeout(() => {
                        element.classList.remove('highlight-member');
                    }, 2000);
                }
            });
        });
    });

    console.log("Map initialization completed"); // Debug log
}

// Make sure the function is available globally
window.initMap = initMap;

// Load the Google Maps script after the page is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, setting up map");

    // Create the map div if it doesn't exist yet
    if (!document.getElementById('board-member-map')) {
        console.log("Creating map container");
        const mapSection = document.querySelector('.family-roots-section');
        if (mapSection) {
            const mapContainer = document.createElement('div');
            mapContainer.id = 'board-member-map';
            mapSection.insertBefore(mapContainer, mapSection.querySelector('.map-legend'));
        }
    }

    // Add the Google Maps script if not already present
    if (!document.getElementById('google-maps-script')) {
        console.log("Loading Google Maps API");
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        // Replace YOUR_ACTUAL_API_KEY with your Google Maps API key
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAzWM0R4sG2HK8977Mtmi3WSvwY7u-5Sik&callback=initMap';
        script.async = true;
        script.defer = true;

        // Error handling for script loading
        script.onerror = function() {
            console.error("Error loading Google Maps API");
            const mapDiv = document.getElementById('board-member-map');
            if (mapDiv) {
                mapDiv.innerHTML = '<p style="color:red;">Error loading Google Maps. Please check your API key and internet connection.</p>';
            }
        };

        document.head.appendChild(script);
    }
});

// Cofresí Pirate Easter Egg
document.addEventListener('DOMContentLoaded', function() {
    const pirateTrigger = document.getElementById('pirate-trigger');
    if (pirateTrigger) {
        pirateTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'cofresi-secret.html';
        });
    }

    // Search bar easter egg
    const searchInputs = document.querySelectorAll('#sidebarSearch, #eventSearch');
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.toLowerCase();
                    if (searchTerm.includes('cofresi') || searchTerm.includes('cofresí')) {
                        e.preventDefault();
                        showPirateMessage();
                    }
                }
            });
        }
    });

    // Search button click handler
    const searchButtons = document.querySelectorAll('#searchButton');
    searchButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                const searchInput = this.previousElementSibling;
                if (searchInput && (searchInput.value.toLowerCase().includes('cofresi') ||
                    searchInput.value.toLowerCase().includes('cofresí'))) {
                    showPirateMessage();
                }
            });
        }
    });
});

function showPirateMessage() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'pirate-message-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // Create message box
    const messageBox = document.createElement('div');
    messageBox.className = 'pirate-message';
    messageBox.style.background = 'url("parchment-bg.jpg") no-repeat center center';
    messageBox.style.backgroundColor = '#f9e4b7';
    messageBox.style.backgroundSize = 'cover';
    messageBox.style.padding = '30px';
    messageBox.style.borderRadius = '8px';
    messageBox.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    messageBox.style.maxWidth = '500px';
    messageBox.style.textAlign = 'center';
    messageBox.style.position = 'relative';

    messageBox.innerHTML = `
        <h3 style="font-family: 'Pirata One', cursive; font-size: 28px; margin-bottom: 20px;">¡Lo siento, marinero!</h3>
        <p style="font-family: serif; font-size: 18px; line-height: 1.5;">El tesoro ya fue saqueado.</p>
        <p style="font-style: italic; margin-top: 20px;">Pero quizás el verdadero tesoro está escondido en otro lugar de este sitio...</p>
        <button id="close-pirate-message" style="background: #8B4513; color: white; border: none; padding: 8px 16px; margin-top: 20px; cursor: pointer; border-radius: 4px;">Cerrar</button>
    `;

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    // Close button functionality
    document.getElementById('close-pirate-message').addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the piraguero cart
    const piragueroCart = document.getElementById('piraguero-cart');

    if (!piragueroCart) return; // Exit if cart element doesn't exist

    piragueroCart.addEventListener('click', function() {
        // Create the modal if it doesn't exist yet
        let piragueraModal = document.querySelector('.piragua-modal');

        if (!piragueraModal) {
            // Create the modal container that will follow scroll
            piragueraModal = document.createElement('div');
            piragueraModal.className = 'piragua-modal';
            piragueraModal.style.display = 'none';

            // Create the content container
            const modalContent = document.createElement('div');
            modalContent.className = 'piragua-content';

            // Piragua flavors with descriptions and colors
            const flavors = [
                {name: 'Tamarindo', color: '#8B4513', recipe: 'Tamarind pulp, water, sugar, and a hint of cinnamon.'},
                {name: 'Frambuesa', color: '#E30B5C', recipe: 'Raspberry syrup, crushed ice, and a squeeze of lemon.'},
                {name: 'Parcha', color: '#FFA500', recipe: 'Passion fruit juice, sugar, water, and a touch of lime.'},
                {name: 'Limón', color: '#32CD32', recipe: 'Fresh lime juice, sugar, water, mint leaves.'},
                {name: 'Coco', color: '#FFFFFF', recipe: 'Coconut milk, condensed milk, vanilla, and shaved ice.'},
                {name: 'Melao', color: '#8B4513', recipe: 'Sugar cane syrup, cinnamon, and a splash of vanilla.'},
                {name: 'Acerola', color: '#FF0000', recipe: 'West Indian cherry juice, sugar, and a pinch of salt.'}
            ];

            // Choose a random flavor
            const randomFlavor = flavors[Math.floor(Math.random() * flavors.length)];

            // Generate a discount code
            const discountCode = 'PIRAGUA' + Math.random().toString(36).substring(2, 7).toUpperCase();

            // Build the modal content
            modalContent.innerHTML = `
                <h2>¡Felicidades! ¡Encontraste el piragüero!</h2>
                
                <div class="piragua-flavor">
                    <div class="piragua-flavor-circle" style="background-color: ${randomFlavor.color};"></div>
                    <h3>Piragua de ${randomFlavor.name}</h3>
                    <p class="recipe-text">${randomFlavor.recipe}</p>
                </div>
                
                <div class="piragua-reward">
                    <h3>¡Tu premio!</h3>
                    <p>Usa este código para obtener un 15% de descuento en la tienda de DB Yale:</p>
                    <div class="piragua-code">
                        ${discountCode}
                    </div>
                    <p class="validity-text">Válido hasta el fin de este mes.</p>
                </div>
                
                <button class="piragua-close">¡Gracias, piragüero!</button>
            `;

            piragueraModal.appendChild(modalContent);
            document.body.appendChild(piragueraModal);

            // Add click handler to close button
            const closeButton = piragueraModal.querySelector('.piragua-close');
            closeButton.addEventListener('click', function() {
                piragueraModal.style.display = 'none';

                // Store in localStorage that user found the piragüero
                localStorage.setItem('foundPiraguero', 'true');
                localStorage.setItem('piragueraCode', discountCode);
            });
        }

        // Show the modal
        piragueraModal.style.display = 'block';

        // Position function to update modal position on scroll
        function updateModalPosition() {
            const modalContent = piragueraModal.querySelector('.piragua-content');

            // Position the modal near the user's current view in bottom-right
            const bottomPadding = 30;
            const rightPadding = 30;

            modalContent.style.position = 'fixed';
            modalContent.style.bottom = `${bottomPadding}px`;
            modalContent.style.right = `${rightPadding}px`;
            modalContent.style.top = 'auto'; // Override any existing top value
            modalContent.style.zIndex = '10000';

            // Optional: Add a subtle float animation instead of scroll-based bounce
            // This creates a more consistent visual effect regardless of scroll speed
            modalContent.style.animation = 'floatAnimation 3s ease-in-out infinite';
        }

        // Update position immediately and on scroll
        updateModalPosition();
        window.addEventListener('scroll', updateModalPosition);
        window.addEventListener('resize', updateModalPosition);

        // Remove scroll listener when modal is closed
        piragueraModal.querySelector('.piragua-close').addEventListener('click', function() {
            window.removeEventListener('scroll', updateModalPosition);
            window.removeEventListener('resize', updateModalPosition);
        });
    });
});


// Abuela's Advice Generator - Fixed to appear near the footer/trigger
document.addEventListener('DOMContentLoaded', function() {
    const abuelaTrigger = document.getElementById('abuela-trigger');

    if (abuelaTrigger) {
        abuelaTrigger.addEventListener('click', function(e) {
            // Get the position of the trigger button
            const buttonRect = abuelaTrigger.getBoundingClientRect();
            const clickX = buttonRect.left + (buttonRect.width / 2);
            const clickY = buttonRect.top;

            // Show advice near the click position
            showAbuelaAdvice(clickX, clickY);
        });
    }
});

function showAbuelaAdvice(clickX, clickY) {
    // Array of classic Puerto Rican abuela sayings
    const abuelaSayings = [
        "No salgas con el pelo mojado o te da pulmonía.",
        "Bebe agua, que eso es lo que te pasa.",
        "Si te pones rojo, es que te gusta.",
        "Mijo, ¡come! Que estás en los huesos.",
        "Ay bendito, ponte una chaqueta que hace frío.",
        "En mi época esto no pasaba.",
        "Si sigues con esa cara se te va a quedar así.",
        "Acuéstate temprano que mañana hay que madrugar.",
        "Cuando yo tenía tu edad, ya trabajaba y ayudaba en la casa.",
        "Esta juventud de hoy no sabe nada de sacrificio.",
        "¿Te lavaste las manos? Ve y lávate otra vez.",
        "Cuidado con ese novio/a, no me gusta como te mira.",
        "Ponte chancletas en la casa, no camines descalzo.",
        "Esto es por tu bien, ya me lo agradecerás.",
        "No te sientes en el piso frío que te da dolor de espalda.",
        "Cierra la nevera que no estamos pagando electricidad para refrescar al vecindario.",
        "Échate Vicks VapoRub, eso lo cura todo."
    ];

    // Select a random saying
    const randomSaying = abuelaSayings[Math.floor(Math.random() * abuelaSayings.length)];

    // Create the semi-transparent backdrop
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.3)'; // Very transparent
    modal.style.zIndex = '9999';
    modal.style.pointerEvents = 'none'; // Allow clicks to pass through the overlay

    // Create the advice box
    const adviceBox = document.createElement('div');
    adviceBox.id = 'abuela-advice-box';
    adviceBox.style.position = 'absolute'; // Use absolute instead of fixed
    adviceBox.style.maxWidth = '350px';
    adviceBox.style.width = '90%';
    adviceBox.style.padding = '25px';
    adviceBox.style.backgroundColor = '#FFF8DC'; // Cornsilk color for warm feel
    adviceBox.style.borderRadius = '10px';
    adviceBox.style.boxShadow = '0 5px 25px rgba(0,0,0,0.3)';
    adviceBox.style.fontFamily = 'Georgia, serif';
    adviceBox.style.textAlign = 'center';
    adviceBox.style.zIndex = '10000';
    adviceBox.style.pointerEvents = 'auto'; // Make sure the advice box receives clicks

    // Position above the trigger in the footer
    // Calculate the position to be above the trigger element
    // Add the scroll offset to position properly when page is scrolled
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Position the box relative to the click position
    adviceBox.style.left = `${clickX + scrollLeft - 175}px`; // Center horizontally (half of max-width)
    adviceBox.style.top = `${clickY + scrollTop - 350}px`; // Position above the click

    // Create a decorative border that looks like a doily or crocheted edge
    adviceBox.style.border = '8px solid transparent';
    adviceBox.style.backgroundClip = 'padding-box';
    adviceBox.style.backgroundImage = 'radial-gradient(circle at 10px 10px, rgba(0,0,0,0.05) 1px, transparent 1px)';
    adviceBox.style.backgroundSize = '20px 20px';

    // Build the content HTML
    adviceBox.innerHTML = `
        <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%);">
            <span style="font-size: 30px;">👵</span>
        </div>
        <h3 style="color: #8B4513; margin-top: 15px; font-size: 20px;">Consejo de Abuela</h3>
        <p style="font-size: 16px; line-height: 1.6; margin: 15px 0; font-style: italic; color: #5D4037;">"${randomSaying}"</p>
        <div style="margin-top: 15px; display: flex; justify-content: center;">
            <button id="close-abuela-modal" style="background-color: #8B4513; color: white; border: none; padding: 8px 20px; border-radius: 5px; cursor: pointer; font-family: inherit;">Gracias, Abuela</button>
        </div>
    `;

    // Create and add animation style
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Dark mode support */
        body.dark-mode #abuela-advice-box {
            background-color: #3c3320;
            color: #fff;
        }
        
        body.dark-mode #abuela-advice-box h3 {
            color: #ffa07a;
        }
        
        body.dark-mode #abuela-advice-box p {
            color: #e0e0e0;
        }
        
        body.dark-mode #close-abuela-modal {
            background-color: #8B4513;
            color: white;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            #abuela-advice-box {
                width: 85%;
                left: 50% !important;
                transform: translateX(-50%);
                margin-top: -100px;
            }
        }
    `;
    document.head.appendChild(styleElement);

    // Add the box to the modal
    modal.appendChild(adviceBox);

    // Add the modal to the page
    document.body.appendChild(modal);

    // Ensure the box is visible in the viewport
    ensureVisibleInViewport(adviceBox);

    // Add close button functionality
    document.getElementById('close-abuela-modal').addEventListener('click', function() {
        modal.style.opacity = '0';
        adviceBox.style.opacity = '0';
        adviceBox.style.transition = 'opacity 0.3s';

        // Remove after fade out
        setTimeout(function() {
            document.body.removeChild(modal);
        }, 300);
    });
}

// Helper function to ensure the advice box is fully visible in the viewport
function ensureVisibleInViewport(element) {
    const rect = element.getBoundingClientRect();

    // Check if box is outside viewport
    if (rect.top < 10) {
        // If too high, move it down
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        element.style.top = `${scrollTop + 50}px`;
    } else if (rect.bottom > window.innerHeight) {
        // If too low, move it up
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        element.style.top = `${scrollTop + window.innerHeight - rect.height - 50}px`;
    }

    // Check horizontal positioning
    if (rect.left < 10) {
        // If too far left, move it right
        element.style.left = '10px';
    } else if (rect.right > window.innerWidth - 10) {
        // If too far right, move it left
        element.style.left = `${window.innerWidth - rect.width - 10}px`;
    }
}



// Spanglish Mode with Konami Code Activation
document.addEventListener('DOMContentLoaded', function() {
    // Define the Konami Code sequence
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    // Track the user's key presses
    let konamiIndex = 0;

    // Spanglish translation pairs (English -> Spanglish)
    const spanglishTranslations = {
        // Common website elements
        "Home": "Home-ito",
        "About": "About-ito",
        "Syllabus": "El Syllabus",
        "Collaborate": "Colabora",
        "News": "Las News",
        "Events": "Los Events",
        "Gallery": "La Galería",
        "Alumni": "Los Alumni",
        "Merch": "El Merch",
        "Learn More": "Learn Más",
        "Sign Up": "Sign Up-ito",

        // Content specific phrases
        "Welcome to": "Bienvenidos to",
        "Celebrating": "Celebrando",
        "Puerto Rican": "Boricua",
        "Identity": "Identidad",
        "Resistance": "Resistencia",
        "Education": "Educación",
        "Community": "Comunidad",
        "Culture": "Cultura",
        "History": "Historia",
        "Yale": "Yale-ito",
        "Resources": "Recursos",
        "Reading": "Reading-ito",
        "Contact": "Contacta",
        "Follow Us": "Follow Us-ito",
        "Join": "Join-ito",
        "Submit": "Submit-ito",
        "Search": "Busca",
        "Download": "Download-ito",

        // Footer elements
        "Newsletter": "El Newsletter",
        "Stay updated": "Stay update-ado",
        "Social Media": "Social Media-ito",
        "Copyright": "Copyright-ito",

        // Buttons and interactive elements
        "Click here": "Click aquí",
        "Back to top": "Back to top-ito",
        "Close": "Cierra",
        "Open": "Abre",
        "Toggle": "Toggle-ito",
        "More": "Más",
        "Subscribe": "Subscribe-ito",
        "Dark Mode": "Modo Oscuro",
        "Light Mode": "Modo Bright-o"
    };

    // Spanglish greeting to show when activated
    const spanglishGreeting = [
        "¡Spanglish mode activated, mi gente!",
        "Welcome to el modo Spanglish",
        "Your website is now officially bilingual... kind of",
        "Mezclando languages like a true Nuyorican",
        "Press the Konami Code again to deactivate, or just enjoy el viaje"
    ];

    // Function to transform text to Spanglish
    function transformToSpanglish(element) {
        if (element.nodeType === Node.TEXT_NODE && element.nodeValue.trim() !== '') {
            // Skip script and style tags
            if (element.parentNode &&
                (element.parentNode.tagName === 'SCRIPT' ||
                    element.parentNode.tagName === 'STYLE')) {
                return;
            }

            let content = element.nodeValue;

            // Replace words with their Spanglish equivalents
            for (const [english, spanglish] of Object.entries(spanglishTranslations)) {
                // Use word boundary to avoid replacing parts of words
                const regex = new RegExp(`\\b${english}\\b`, 'gi');
                content = content.replace(regex, spanglish);
            }

            // Randomly sprinkle in Spanish words and expressions (10% chance per text node)
            if (Math.random() < 0.1) {
                const spanishPhrases = [
                    " ¡Ay bendito! ",
                    " ¡Wepa! ",
                    " (¿tú sabes?) ",
                    " (¡qué cool!) ",
                    " ¡Dale! ",
                    " (tremendo) "
                ];
                const randomPhrase = spanishPhrases[Math.floor(Math.random() * spanishPhrases.length)];

                // Insert at a random position
                const position = Math.floor(Math.random() * content.length);
                content = content.slice(0, position) + randomPhrase + content.slice(position);
            }

            // Set the new content
            element.nodeValue = content;
        } else if (element.nodeType === Node.ELEMENT_NODE) {
            // Process child elements recursively
            Array.from(element.childNodes).forEach(child => transformToSpanglish(child));

            // Also process placeholder text in inputs
            if (element.tagName === 'INPUT' && element.placeholder) {
                for (const [english, spanglish] of Object.entries(spanglishTranslations)) {
                    const regex = new RegExp(`\\b${english}\\b`, 'gi');
                    element.placeholder = element.placeholder.replace(regex, spanglish);
                }
            }
        }
    }

    // Function to show a notification when Spanglish mode is toggled
    function showSpanglishNotification(active) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.backgroundColor = active ? '#007bff' : '#6c757d';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '10px';
        notification.style.zIndex = '9999';
        notification.style.fontWeight = 'bold';
        notification.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';

        // Set message
        if (active) {
            // Pick a random greeting
            const greeting = spanglishGreeting[Math.floor(Math.random() * spanglishGreeting.length)];
            notification.textContent = greeting;
        } else {
            notification.textContent = "Spanglish mode deactivated! Returning to boring monolingual mode.";
        }

        // Add to page
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }

    // Toggle Spanglish mode
    let spanglishActive = false;

    function toggleSpanglishMode() {
        spanglishActive = !spanglishActive;

        if (spanglishActive) {
            // Walk the DOM and replace text with Spanglish versions
            transformToSpanglish(document.body);
            // Show activation notification
            showSpanglishNotification(true);
            // Store state in localStorage
            localStorage.setItem('spanglish-mode', 'enabled');
        } else {
            // Reload the page to restore original text
            localStorage.setItem('spanglish-mode', 'disabled');
            showSpanglishNotification(false);
            setTimeout(() => window.location.reload(), 1500);
        }
    }

    // Listen for keydown events to detect Konami Code
    document.addEventListener('keydown', function(e) {
        // Check if the pressed key matches the next key in the Konami sequence
        if (e.key === konamiCode[konamiIndex]) {
            // Move to the next key in the sequence
            konamiIndex++;

            // If the full sequence was entered, trigger Spanglish mode
            if (konamiIndex === konamiCode.length) {
                toggleSpanglishMode();
                // Reset index to allow toggling off with another Konami code
                konamiIndex = 0;
            }
        } else {
            // Reset if the wrong key was pressed
            konamiIndex = 0;
        }
    });

    // Check if Spanglish mode was previously enabled
    if (localStorage.getItem('spanglish-mode') === 'enabled') {
        spanglishActive = true;
        // Apply Spanglish transformations
        transformToSpanglish(document.body);
    }

    // Optional: Add a very subtle indicator in the footer that a secret exists
    const footer = document.querySelector('.license');
    if (footer) {
        const secretHint = document.createElement('span');
        secretHint.textContent = ' 🎮';
        secretHint.style.fontSize = '10px';
        secretHint.style.opacity = '0.5';
        secretHint.style.cursor = 'default';
        secretHint.title = 'There might be a secret code...';
        footer.appendChild(secretHint);
    }
});

// Add this to your script.js file to enable the Lolita Lebrón search trigger

document.addEventListener('DOMContentLoaded', function() {
    // Get all search inputs
    const searchInputs = document.querySelectorAll('#sidebarSearch, #eventSearch, input[type="search"], input[type="text"][placeholder*="search" i]');

    // Search terms that will trigger the redirect
    const triggerTerms = [
        'lolita',
        'lebron',
        'lebrón',
        'lolita lebron',
        'lolita lebrón',
        'puerto rican nationalist',
        'nationalist',
        'puerto rico independence',
        'freedom fighter',
        'capitol attack 1954',
        'puerto rican revolution'
    ];

    // Function to check if search contains any trigger terms
    function containsTriggerTerm(searchText) {
        searchText = searchText.toLowerCase().trim();
        return triggerTerms.some(term => searchText.includes(term.toLowerCase()));
    }

    // Add event listeners to all search inputs
    searchInputs.forEach(input => {
        if (input) {
            // Listen for Enter key
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.trim();
                    if (containsTriggerTerm(searchTerm)) {
                        e.preventDefault(); // Prevent default search behavior
                        redirectToLolitaPage();
                    }
                }
            });
        }
    });

    // Also attach to search buttons
    const searchButtons = document.querySelectorAll('#searchButton, button[aria-label*="search" i], button[type="submit"]');
    searchButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                // Find the input associated with this button
                const searchInput = this.previousElementSibling ||
                    this.closest('form')?.querySelector('input[type="text"], input[type="search"]');

                if (searchInput && containsTriggerTerm(searchInput.value)) {
                    e.preventDefault();
                    redirectToLolitaPage();
                }
            });
        }
    });

    // Function to redirect to the Lolita Lebrón page
    function redirectToLolitaPage() {
        // First, create a transition effect
        const transitionOverlay = document.createElement('div');
        transitionOverlay.style.position = 'fixed';
        transitionOverlay.style.top = '0';
        transitionOverlay.style.left = '0';
        transitionOverlay.style.width = '100%';
        transitionOverlay.style.height = '100%';
        transitionOverlay.style.backgroundColor = 'black';
        transitionOverlay.style.opacity = '0';
        transitionOverlay.style.zIndex = '9999';
        transitionOverlay.style.transition = 'opacity 1s ease';
        document.body.appendChild(transitionOverlay);

        // Fade to black
        setTimeout(() => {
            transitionOverlay.style.opacity = '1';

            // After fade completes, redirect
            setTimeout(() => {
                // Store that we've discovered the page in localStorage
                localStorage.setItem('lolita-tribute-discovered', 'true');

                // Redirect to the hidden page
                window.location.href = 'lolita-tribute.html';
            }, 1000);
        }, 50);
    }

    // Check URL params to see if we should trigger redirect
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search') || urlParams.get('q');
    if (searchParam && containsTriggerTerm(searchParam)) {
        redirectToLolitaPage();
    }
});

// Add this to your script.js file to enable the Antilles Federation search trigger

document.addEventListener('DOMContentLoaded', function() {
    // Get all search inputs on the site
    const searchInputs = document.querySelectorAll('#sidebarSearch, #eventSearch, input[type="search"], input[type="text"][placeholder*="search" i]');

    // Search terms that will trigger the redirect to the Antilles Federation page
    const triggerTerms = [
        'antilles',
        'antilles federation',
        'federación de las antillas',
        'caribbean federation',
        'pan-caribbeanism',
        'pan caribbean',
        'betances',
        'hostos',
        'west indies federation',
        'caribbean unity'
    ];

    // Function to check if search contains any trigger terms
    function containsTriggerTerm(searchText) {
        searchText = searchText.toLowerCase().trim();
        return triggerTerms.some(term => searchText.includes(term.toLowerCase()));
    }

    // Add event listeners to all search inputs
    searchInputs.forEach(input => {
        if (input) {
            // Listen for Enter key
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.trim();
                    if (containsTriggerTerm(searchTerm)) {
                        e.preventDefault(); // Prevent default search behavior
                        redirectToAntillesPage();
                    }
                }
            });
        }
    });

    // Also attach to search buttons
    const searchButtons = document.querySelectorAll('#searchButton, button[aria-label*="search" i], button[type="submit"]');
    searchButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                // Find the input associated with this button
                const searchInput = this.previousElementSibling ||
                    this.closest('form')?.querySelector('input[type="text"], input[type="search"]');

                if (searchInput && containsTriggerTerm(searchInput.value)) {
                    e.preventDefault();
                    redirectToAntillesPage();
                }
            });
        }
    });

    // Function to redirect to the Antilles Federation page with a beautiful transition
    function redirectToAntillesPage() {
        // Create a portal-like transition effect
        const portalOverlay = document.createElement('div');
        portalOverlay.style.position = 'fixed';
        portalOverlay.style.top = '0';
        portalOverlay.style.left = '0';
        portalOverlay.style.width = '100%';
        portalOverlay.style.height = '100%';
        portalOverlay.style.background = 'radial-gradient(circle at center, rgba(0,92,169,0) 0%, rgba(0,92,169,0.8) 100%)';
        portalOverlay.style.opacity = '0';
        portalOverlay.style.zIndex = '9999';
        portalOverlay.style.transition = 'opacity 1.5s ease';
        document.body.appendChild(portalOverlay);

        // Add the map silhouette that fades in
        const mapSilhouette = document.createElement('div');
        mapSilhouette.style.position = 'fixed';
        mapSilhouette.style.top = '50%';
        mapSilhouette.style.left = '50%';
        mapSilhouette.style.transform = 'translate(-50%, -50%) scale(0.8)';
        mapSilhouette.style.width = '300px';
        mapSilhouette.style.height = '200px';
        mapSilhouette.style.background = 'url("caribbean-map-silhouette.png") no-repeat center center';
        mapSilhouette.style.backgroundSize = 'contain';
        mapSilhouette.style.filter = 'brightness(0) invert(1)';
        mapSilhouette.style.opacity = '0';
        mapSilhouette.style.zIndex = '10000';
        mapSilhouette.style.transition = 'opacity 1s ease, transform 1.5s ease';
        document.body.appendChild(mapSilhouette);

        // Portal text that appears before redirect
        const portalText = document.createElement('div');
        portalText.style.position = 'fixed';
        portalText.style.top = '60%';
        portalText.style.left = '50%';
        portalText.style.transform = 'translate(-50%, -50%)';
        portalText.style.color = 'white';
        portalText.style.fontFamily = '"Times New Roman", serif';
        portalText.style.fontSize = '28px';
        portalText.style.fontStyle = 'italic';
        portalText.style.opacity = '0';
        portalText.style.zIndex = '10001';
        portalText.style.transition = 'opacity 1s ease';
        portalText.style.textAlign = 'center';
        portalText.style.width = '80%';
        portalText.textContent = 'Bienvenidos a la Federación de las Antillas...';
        document.body.appendChild(portalText);

        // Start the transition sequence
        setTimeout(() => {
            portalOverlay.style.opacity = '1';

            // Show map silhouette after background starts to appear
            setTimeout(() => {
                mapSilhouette.style.opacity = '1';
                mapSilhouette.style.transform = 'translate(-50%, -50%) scale(1)';

                // Show portal text after map appears
                setTimeout(() => {
                    portalText.style.opacity = '1';

                    // Store that we've discovered the page in localStorage
                    localStorage.setItem('antilles-federation-discovered', 'true');

                    // Redirect after transition completes
                    setTimeout(() => {
                        window.location.href = 'antilles-federation.html';
                    }, 2000);
                }, 800);
            }, 500);
        }, 100);
    }

    // Check URL params to see if we should trigger redirect
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search') || urlParams.get('q');
    if (searchParam && containsTriggerTerm(searchParam)) {
        redirectToAntillesPage();
    }
});

// Add this to your script.js file to enable El Gran Apagón Mode

document.addEventListener('DOMContentLoaded', function() {
    // Get all search inputs on the site
    const searchInputs = document.querySelectorAll('#sidebarSearch, #eventSearch, input[type="search"], input[type="text"][placeholder*="search" i]');

    // Search terms that will trigger El Apagón mode
    const triggerTerms = [
        'luma',
        'apagon',
        'apagón',
        'electric',
        'power outage',
        'blackout'
    ];

    // Function to check if search contains any trigger terms
    function containsTriggerTerm(searchText) {
        searchText = searchText.toLowerCase().trim();
        return triggerTerms.some(term => searchText.includes(term.toLowerCase()));
    }

    // Add event listeners to all search inputs
    searchInputs.forEach(input => {
        if (input) {
            // Listen for Enter key
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.trim();
                    if (containsTriggerTerm(searchTerm)) {
                        e.preventDefault(); // Prevent default search behavior
                        triggerApagonMode();
                    }
                }
            });
        }
    });

    // Also attach to search buttons
    const searchButtons = document.querySelectorAll('#searchButton, button[aria-label*="search" i], button[type="submit"]');
    searchButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                // Find the input associated with this button
                const searchInput = this.previousElementSibling ||
                    this.closest('form')?.querySelector('input[type="text"], input[type="search"]');

                if (searchInput && containsTriggerTerm(searchInput.value)) {
                    e.preventDefault();
                    triggerApagonMode();
                }
            });
        }
    });

    // Function to trigger El Apagón mode
    function triggerApagonMode() {
        // 1. Create the blackout overlay
        const blackoutOverlay = document.createElement('div');
        blackoutOverlay.className = 'apagon-overlay';
        blackoutOverlay.style.position = 'fixed';
        blackoutOverlay.style.top = '0';
        blackoutOverlay.style.left = '0';
        blackoutOverlay.style.width = '100%';
        blackoutOverlay.style.height = '100%';
        blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        blackoutOverlay.style.zIndex = '9999';
        blackoutOverlay.style.transition = 'background-color 0.2s ease';
        document.body.appendChild(blackoutOverlay);

        // 2. Create the message container (initially hidden)
        const messageContainer = document.createElement('div');
        messageContainer.className = 'apagon-message';
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '50%';
        messageContainer.style.left = '50%';
        messageContainer.style.transform = 'translate(-50%, -50%)';
        messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        messageContainer.style.color = '#fff';
        messageContainer.style.padding = '25px 40px';
        messageContainer.style.borderRadius = '8px';
        messageContainer.style.textAlign = 'center';
        messageContainer.style.maxWidth = '90%';
        messageContainer.style.opacity = '0';
        messageContainer.style.zIndex = '10000';
        messageContainer.style.transition = 'opacity 0.5s ease';
        messageContainer.innerHTML = `
            <p style="font-size: 1.5rem; font-style: italic; line-height: 1.5;">Lo que me pertenece a mí, se lo quedan ellos.<br>¡Que se vayan ellos!</p>
            <p style="margin-top: 15px; font-size: 0.9rem;">(Click anywhere to restore power)</p>
        `;
        document.body.appendChild(messageContainer);

        // 3. Create the flashlight icon (initially hidden)
        const flashlightIcon = document.createElement('div');
        flashlightIcon.className = 'flashlight-icon';
        flashlightIcon.style.position = 'fixed';
        flashlightIcon.style.bottom = '30px';
        flashlightIcon.style.right = '30px';
        flashlightIcon.style.width = '50px';
        flashlightIcon.style.height = '50px';
        flashlightIcon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        flashlightIcon.style.borderRadius = '50%';
        flashlightIcon.style.cursor = 'pointer';
        flashlightIcon.style.display = 'flex';
        flashlightIcon.style.alignItems = 'center';
        flashlightIcon.style.justifyContent = 'center';
        flashlightIcon.style.fontSize = '24px';
        flashlightIcon.style.opacity = '0';
        flashlightIcon.style.zIndex = '10001';
        flashlightIcon.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
        flashlightIcon.innerHTML = '🔦';
        document.body.appendChild(flashlightIcon);

        // 4. Create flickering effect (like power going out)
        setTimeout(() => {
            blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

            setTimeout(() => {
                blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

                setTimeout(() => {
                    blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

                    setTimeout(() => {
                        // Go completely black after flickering
                        blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 1)';

                        // Show flashlight after 5 seconds in the dark
                        setTimeout(() => {
                            flashlightIcon.style.opacity = '1';
                            flashlightIcon.style.animation = 'pulse 2s infinite';

                            // Add a subtle hover effect
                            flashlightIcon.addEventListener('mouseover', function() {
                                this.style.transform = 'scale(1.1)';
                            });

                            flashlightIcon.addEventListener('mouseout', function() {
                                this.style.transform = 'scale(1)';
                            });

                            // Add flashlight click functionality
                            flashlightIcon.addEventListener('click', function() {
                                // Hide flashlight
                                this.style.opacity = '0';

                                // Fade in message
                                messageContainer.style.opacity = '1';

                                // Slightly brighten the overlay to see the message better
                                blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';

                                // Make entire page clickable to restore
                                blackoutOverlay.addEventListener('click', restorePage);
                                messageContainer.addEventListener('click', restorePage);
                            });
                        }, 5000);
                    }, 300);
                }, 200);
            }, 200);
        }, 100);

        // Function to restore the page to normal
        function restorePage() {
            // Fade out message
            messageContainer.style.opacity = '0';

            // Gradually restore page
            blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

            setTimeout(() => {
                blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';

                setTimeout(() => {
                    blackoutOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';

                    // After transition completes, remove elements
                    setTimeout(() => {
                        document.body.removeChild(blackoutOverlay);
                        document.body.removeChild(messageContainer);
                        document.body.removeChild(flashlightIcon);
                    }, 500);
                }, 200);
            }, 200);
        }

        // Add CSS animation for the flashlight pulse
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
            }
        `;
        document.head.appendChild(styleElement);
    }

    // Check URL params to see if we should trigger Apagón mode
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search') || urlParams.get('q');
    if (searchParam && containsTriggerTerm(searchParam)) {
        triggerApagonMode();
    }
});

// Add this to your script.js file to enable El Yunque Mode

document.addEventListener('DOMContentLoaded', function() {
    // Rain animation variables
    let isRaining = false;
    let raindrops = [];
    let rainCanvas;
    let rainCtx;
    let yunqueTriggered = false;

    // El Yunque facts - will randomly select one
    const yunqueFacts = [
        "Did you know El Yunque is the only tropical rainforest in the U.S. National Forest System?",
        "El Yunque receives over 200 inches (500 cm) of rainfall per year!",
        "El Yunque is home to the tiny coquí frog, Puerto Rico's unofficial national symbol.",
        "El Yunque contains rare Puerto Rican parrots, one of the 10 most endangered birds in the world.",
        "The ancient Taíno people considered El Yunque to be the throne of their chief god Yúcahu.",
        "El Yunque's highest peak, El Toro, reaches 3,494 feet (1,065 meters) above sea level.",
        "The forest contains over 240 species of trees and plants, with 23 only found in El Yunque!",
        "El Yunque was originally named 'Luquillo Forest Reserve' when established in 1876.",
        "A special type of cloud forest exists at El Yunque's highest elevations.",
        "El Yunque's name comes from 'Yu-Ke' which means 'White Lands' in the Taíno language."
    ];

    // Get all search inputs on the site
    const searchInputs = document.querySelectorAll('#sidebarSearch, #eventSearch, input[type="search"], input[type="text"][placeholder*="search" i]');

    // Search terms that will trigger El Yunque mode
    const triggerTerms = [
        'El Yunque',
        'Yunque',
        'rainforest',
        'coqui',
        'tropical forest'
    ];

    // Function to check if search contains any trigger terms
    function containsTriggerTerm(searchText) {
        searchText = searchText.toLowerCase().trim();
        return triggerTerms.some(term => searchText.toLowerCase().includes(term.toLowerCase()));
    }

    // Add event listeners to all search inputs
    searchInputs.forEach(input => {
        if (input) {
            // Listen for Enter key
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.trim();
                    if (containsTriggerTerm(searchTerm)) {
                        e.preventDefault(); // Prevent default search behavior
                        triggerYunqueMode();
                    }
                }
            });
        }
    });

    // Also attach to search buttons
    const searchButtons = document.querySelectorAll('#searchButton, button[aria-label*="search" i], button[type="submit"]');
    searchButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                // Find the input associated with this button
                const searchInput = this.previousElementSibling ||
                    this.closest('form')?.querySelector('input[type="text"], input[type="search"]');

                if (searchInput && containsTriggerTerm(searchInput.value)) {
                    e.preventDefault();
                    triggerYunqueMode();
                }
            });
        }
    });

    // Set timer to trigger Yunque mode after 3 minutes
    // Only if it hasn't been triggered before in this session
    if (!sessionStorage.getItem('yunqueTriggered')) {
        setTimeout(() => {
            if (!yunqueTriggered) {
                triggerYunqueMode();
            }
        }, 3 * 60 * 1000); // 3 minutes in milliseconds
    }

    // Function to trigger El Yunque mode
    function triggerYunqueMode() {
        if (yunqueTriggered) return; // Prevent multiple triggers
        yunqueTriggered = true;
        sessionStorage.setItem('yunqueTriggered', 'true');

        // 1. Create the darkening overlay
        const yunqueOverlay = document.createElement('div');
        yunqueOverlay.className = 'yunque-overlay';
        yunqueOverlay.style.position = 'fixed';
        yunqueOverlay.style.top = '0';
        yunqueOverlay.style.left = '0';
        yunqueOverlay.style.width = '100%';
        yunqueOverlay.style.height = '100%';
        yunqueOverlay.style.backgroundColor = 'rgba(0, 50, 80, 0.2)'; // Bluish dark tint
        yunqueOverlay.style.zIndex = '9998';
        yunqueOverlay.style.transition = 'background-color 2s ease';
        yunqueOverlay.style.pointerEvents = 'none'; // Allow clicks to pass through
        document.body.appendChild(yunqueOverlay);

        // 2. Create rain canvas
        rainCanvas = document.createElement('canvas');
        rainCanvas.className = 'rain-canvas';
        rainCanvas.style.position = 'fixed';
        rainCanvas.style.top = '0';
        rainCanvas.style.left = '0';
        rainCanvas.style.width = '100%';
        rainCanvas.style.height = '100%';
        rainCanvas.style.zIndex = '9999';
        rainCanvas.style.pointerEvents = 'none'; // Allow clicks to pass through
        document.body.appendChild(rainCanvas);

        // Set canvas size to match window
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
        rainCtx = rainCanvas.getContext('2d');

        // 3. Play coquí sound
        const coquiSound = new Audio('coqui-sound.mp3'); // Make sure this file exists
        coquiSound.volume = 0.3; // Not too loud
        try {
            coquiSound.play().catch(err => {
                console.log('Audio play prevented by browser policy. User interaction needed first.');
                // This is normal due to browser autoplay policies
            });
        } catch (e) {
            console.log('Error playing sound:', e);
        }

        // 4. Show fact pop-up after a short delay
        setTimeout(() => {
            showYunqueFact();
        }, 1500);

        // Start rain animation
        isRaining = true;
        startRain();

        // Handle window resize
        window.addEventListener('resize', function() {
            if (rainCanvas) {
                rainCanvas.width = window.innerWidth;
                rainCanvas.height = window.innerHeight;
            }
        });
    }

    // Function to show random El Yunque fact
    function showYunqueFact() {
        // Get a random fact
        const randomFact = yunqueFacts[Math.floor(Math.random() * yunqueFacts.length)];

        // Create fact pop-up
        const factPopup = document.createElement('div');
        factPopup.className = 'yunque-fact';
        factPopup.style.position = 'fixed';
        factPopup.style.top = '20%';
        factPopup.style.left = '50%';
        factPopup.style.transform = 'translateX(-50%)';
        factPopup.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        factPopup.style.color = '#333';
        factPopup.style.padding = '20px 30px';
        factPopup.style.borderRadius = '10px';
        factPopup.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        factPopup.style.zIndex = '10000';
        factPopup.style.maxWidth = '400px';
        factPopup.style.textAlign = 'center';
        factPopup.style.fontSize = '16px';
        factPopup.style.opacity = '0';
        factPopup.style.transition = 'opacity 1s ease';

        // Add content to popup
        factPopup.innerHTML = `
            <p style="margin-bottom: 15px; line-height: 1.5;">${randomFact}</p>
            <div class="rainbow-icon" style="cursor: pointer; font-size: 24px; margin-top: 15px;">🌈</div>
            <p style="margin-top: 10px; font-size: 14px; color: #666;">Click the rainbow to clear the rain</p>
        `;
        document.body.appendChild(factPopup);

        // Fade in the popup
        setTimeout(() => {
            factPopup.style.opacity = '1';
        }, 100);

        // Add click handler to rainbow icon
        const rainbowIcon = factPopup.querySelector('.rainbow-icon');
        rainbowIcon.addEventListener('click', function() {
            stopRain();
            factPopup.style.opacity = '0';

            // Remove elements after transition
            setTimeout(() => {
                if (factPopup.parentNode) {
                    document.body.removeChild(factPopup);
                }
            }, 1000);
        });
    }

    // Rain animation functions
    function startRain() {
        // Create initial raindrops
        createRaindrops();

        // Start animation loop
        animateRain();
    }

    function createRaindrops() {
        // Clear existing raindrops
        raindrops = [];

        // Create new raindrops
        const density = Math.floor(window.innerWidth / 10); // Adjust for desired density
        for (let i = 0; i < density; i++) {
            raindrops.push({
                x: Math.random() * rainCanvas.width,
                y: Math.random() * rainCanvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 15 + 10,
                thickness: Math.random() * 2 + 1
            });
        }
    }

    function animateRain() {
        if (!isRaining) return;

        // Clear canvas
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

        // Draw and update raindrops
        rainCtx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        rainCtx.lineCap = 'round';

        for (let i = 0; i < raindrops.length; i++) {
            const drop = raindrops[i];

            // Draw raindrop
            rainCtx.beginPath();
            rainCtx.lineWidth = drop.thickness;
            rainCtx.moveTo(drop.x, drop.y);
            rainCtx.lineTo(drop.x, drop.y + drop.length);
            rainCtx.stroke();

            // Update raindrop position
            drop.y += drop.speed;

            // Reset raindrop if it goes off screen
            if (drop.y > rainCanvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * rainCanvas.width;
            }
        }

        // Continue animation
        requestAnimationFrame(animateRain);
    }

    function stopRain() {
        isRaining = false;

        // Get the overlay and fade it out
        const yunqueOverlay = document.querySelector('.yunque-overlay');
        if (yunqueOverlay) {
            yunqueOverlay.style.backgroundColor = 'rgba(0, 50, 80, 0)';

            // Remove overlay after transition
            setTimeout(() => {
                if (yunqueOverlay.parentNode) {
                    document.body.removeChild(yunqueOverlay);
                }
            }, 2000);
        }

        // Fade out and remove rain canvas
        if (rainCanvas) {
            rainCanvas.style.opacity = '0';
            rainCanvas.style.transition = 'opacity 2s ease';

            setTimeout(() => {
                if (rainCanvas.parentNode) {
                    document.body.removeChild(rainCanvas);
                }
            }, 2000);
        }

        yunqueTriggered = false;
    }

    // Check URL params to see if we should trigger El Yunque mode
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search') || urlParams.get('q');
    if (searchParam && containsTriggerTerm(searchParam)) {
        triggerYunqueMode();
    }
});

