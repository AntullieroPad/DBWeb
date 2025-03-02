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