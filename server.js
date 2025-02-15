const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Function to get images dynamically from any event folder
app.get("/api/images/:eventFolder", (req, res) => {
    const eventFolder = req.params.eventFolder; // Get event name from URL
    const eventImageDir = path.join(__dirname, eventFolder); // Construct folder path

    // Check if folder exists
    if (!fs.existsSync(eventImageDir)) {
        return res.status(404).json({ error: "Event folder not found" });
    }

    // Read the event's image directory
    fs.readdir(eventImageDir, (err, files) => {
        if (err) {
            console.error(`Error reading directory for ${eventFolder}:`, err);
            return res.status(500).json({ error: "Error reading image directory" });
        }

        // Filter only image files (jpg, jpeg, png, gif)
        const images = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));

        // Return an array of image URLs
        res.json(images.map(file => `/${eventFolder}/${file}`));
    });
});

// Serve images dynamically from any event folder
app.use("/:event", (req, res, next) => {
    const eventFolder = req.params.event;
    const eventPath = path.join(__dirname, eventFolder);

    if (fs.existsSync(eventPath)) {
        express.static(eventPath)(req, res, next);
    } else {
        next();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});