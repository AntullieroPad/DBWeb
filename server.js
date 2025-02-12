const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Route to get all images from the DMTF_Party_Photos folder
app.get("/get-images", (req, res) => {
    const imageDir = path.join(__dirname, "DMTF_Party_Photos");

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            res.status(500).json({ error: "Error reading directory" });
            return;
        }

        // Filter to include only image files (jpg, png, jpeg)
        const images = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));

        res.json(images);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});