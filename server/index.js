const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const ffmpeg = require("fluent-ffmpeg"); // Use fluent-ffmpeg for Node.js

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for other parts of your application...

// Handle video uploads and conversion to MP4
app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    const { buffer } = req.file;

    // Save the uploaded file to a temporary location
    const tempFilePath = "temp.webm";
    fs.writeFileSync(tempFilePath, buffer);

    // Convert the video to MP4 using fluent-ffmpeg
    ffmpeg(tempFilePath)
      .outputOptions("-c:v libx264 -an")
      .on("end", () => {
        // Generate a unique filename
        const timestamp = Date.now();
        const mp4Filename = `${timestamp}.mp4`;

        // Move the MP4 file to the desired location
        fs.renameSync(tempFilePath + ".mp4", mp4Filename);

        // Respond with the URL of the MP4 file
        const mp4Url = `https://chrome-fd0g.onrender.com/${mp4Filename}`;
        res.status(200).json({ url: mp4Url });

        // Clean up temporary files
        fs.unlinkSync(tempFilePath);
      })
      .on("error", (err) => {
        console.error("Error processing video:", err);
        res.status(500).json({ error: "Error processing video" });
      })
      .save(tempFilePath + ".mp4");
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).json({ error: "Error processing video" });
  }
});

// Define routes for other parts of your application...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
