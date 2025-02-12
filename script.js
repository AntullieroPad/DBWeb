// Simple sidebar open/close toggle for mobile
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

// Optional console log to confirm JS is loaded
console.log('DB Yale site script loaded!');

//Actual filter
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[name="category"]');
    const contentItems = document.querySelectorAll('.event-list li, .media-list li');

    function filterContent() {
        const selectedCategories = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        contentItems.forEach(item => {
            const itemCategories = item.getAttribute("data-category").split(" ");
            const isVisible = selectedCategories.some(category => itemCategories.includes(category));
            item.style.display = isVisible ? "" : "none";
        });
    }

    // Apply filter when checkboxes change
    checkboxes.forEach(cb => cb.addEventListener("change", filterContent));

    // Run filter on page load
    filterContent();
});


// search bar function
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("sidebarSearch");
    const searchButton = document.getElementById("searchButton");

    if (!searchInput || !searchButton) {
        console.error("Search input or button not found!");
        return;
    }

    const allSections = document.querySelectorAll("h2, h3, p, li"); // What the search looks for on the page

    function searchContent() {
        const filter = searchInput.value.trim().toLowerCase();
        let found = false;

        allSections.forEach((section) => {
            const text = section.textContent.toLowerCase();

            if (text.includes(filter) && !found) {
                section.scrollIntoView({ behavior: "smooth", block: "center" });
                section.style.backgroundColor = "yellow"; // Highlight
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
});


document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.classList.add("hamburger-btn");
    hamburgerBtn.innerHTML = "☰"; // Unicode for hamburger menu
    document.body.prepend(hamburgerBtn);

    hamburgerBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });
});

//for home page news

let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector(".carousel-container");
    const totalSlides = document.querySelectorAll(".news-item").length;

    currentIndex += direction;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}


// auto fill gallery pages
document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("dtmfGallery");
    const imageFolder = "DMTF_Party_Photos"; // Your folder name
    const totalImages = 10; // Number of images (adjust as needed)

    for (let i = 1; i <= totalImages; i++) {
        let img = document.createElement("img");
        img.src = `${imageFolder}/img${i}.jpg`; // Assumes filenames are "img1.jpg", "img2.jpg", etc.
        img.alt = `DTMF Party Image ${i}`;
        img.classList.add("gallery-image"); // Add styling
        galleryContainer.appendChild(img);
    }
});