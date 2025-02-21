document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------
    // Sidebar Toggle for Mobile
    // ------------------------------
    const sidebar = document.querySelector('.sidebar');
    let sidebarOpen = false;

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
        if (sidebarOpen) {
            sidebar.classList.add('open');
        } else {
            sidebar.classList.remove('open');
        }
    }

    console.log('DB Yale site script loaded!');

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

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            currentLang = currentLang === "en" ? "es" : "en";
            localStorage.setItem("lang", currentLang);
            updateLanguage(currentLang);
            langToggle.textContent = currentLang === 'en' ? 'Español' : 'English';
        });

        updateLanguage(currentLang);
        langToggle.textContent = currentLang === 'en' ? 'Español' : 'English';
    } else {
        console.error("Language toggle not found!");
    }
});

//mobile sidebar
// Select the sidebar element from the DOM
const sidebar = document.querySelector('.sidebar');
// Boolean to track if the sidebar is open or closed
let sidebarOpen = false;


/**
 * Toggle the sidebar open/close state.
 * When called, it inverts the value of `sidebarOpen` and adds or removes
 * the 'open' class on the sidebar accordingly.
 */
function toggleSidebar() {
    sidebarOpen = !sidebarOpen; // Toggle state (true if closed, false if open)
    if (sidebarOpen) {
        sidebar.classList.add('open'); // Add the class to show the sidebar
    } else {
        sidebar.classList.remove('open'); // Remove the class to hide the sidebar
    }
}


// ------------------------------
// Create and Append Hamburger Button for Mobile (if not already in HTML)
// ------------------------------
const mobileSidebar = document.querySelector(".sidebar");
const hamburgerBtn = document.createElement("button");
hamburgerBtn.classList.add("hamburger-btn");
hamburgerBtn.innerHTML = "☰"; // Unicode for hamburger menu
document.body.prepend(hamburgerBtn);

hamburgerBtn.addEventListener("click", function () {
    mobileSidebar.classList.toggle("open");
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
// Gallery Carousel
document.querySelectorAll('.gallery-carousel-container').forEach(carousel => {
    const track = carousel.querySelector('.gallery-carousel-track');
    const items = carousel.querySelectorAll('.gallery-carousel-item');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const nextButton = carousel.querySelector('.carousel-button.next');

    let currentIndex = 0;
    const totalItems = items.length;

    function updateCarousel() {
        const slideWidth = carousel.querySelector('.carousel-window').offsetWidth;
        track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
});
