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
    // Search Bar Functionality (Not Functional)
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
                "events": "news.html",
                "mission": "about.html"
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
    // Home Page News Carousel
    // ------------------------------
    let currentIndex = 0;
    let autoRotate; // For auto-rotation

    const autoRotateInterval = 3000; // Interval in milliseconds

    function moveSlide(direction) {
        const slidesContainer = document.querySelector(".carousel-container");
        const totalSlides = document.querySelectorAll(".news-item").length;

        // Update the current index based on the direction
        currentIndex += direction;
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        }

        // Use slidesContainer (not an undefined variable)
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Reset the auto-rotate timer
        resetAutoRotate();
    }

    function resetAutoRotate() {
        clearInterval(autoRotate);
        autoRotate = setInterval(() => {
            moveSlide(1);
        }, autoRotateInterval);
    }

    // Start auto-rotation on load
    autoRotate = setInterval(() => {
        moveSlide(1);
    }, autoRotateInterval);

    // ------------------------------
    // Auto-Fill Gallery Pages
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
    // Dark Mode Toggle
    // ------------------------------
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    let darkMode = localStorage.getItem("dark-mode") === "enabled";

    function applyDarkMode(enabled) {
        document.body.classList.toggle("dark-mode", enabled);
        localStorage.setItem("dark-mode", enabled ? "enabled" : "disabled");
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            darkMode = !darkMode;
            applyDarkMode(darkMode);
        });
    } else {
        console.error("Dark mode toggle not found!");
    }

    // Apply dark mode on page load
    applyDarkMode(darkMode);

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
