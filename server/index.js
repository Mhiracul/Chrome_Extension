const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Set up FFmpeg
const ffmpeg = createFFmpeg({ log: true });

async function initFFmpeg() {
  await ffmpeg.load();
}

initFFmpeg()
  .then(() => {
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

        // Convert the video to MP4 using FFmpeg
        await ffmpeg.FS(
          "writeFile",
          "input.webm",
          await fetchFile(tempFilePath)
        );
        await ffmpeg.run(
          "-i",
          "input.webm",
          "-c:v",
          "libx264",
          "-an",
          "output.mp4"
        );
        const mp4Data = await ffmpeg.FS("readFile", "output.mp4");

        // Generate a unique filename
        const timestamp = Date.now();
        const mp4Filename = `${timestamp}.mp4`;

        // Save the MP4 file
        fs.writeFileSync(mp4Filename, mp4Data);

        // Respond with the URL of the MP4 file
        const mp4Url = `https://chrome-fd0g.onrender.com/${mp4Filename}`;
        res.status(200).json({ url: mp4Url });

        // Clean up temporary files
        fs.unlinkSync(tempFilePath);
        fs.unlinkSync("input.webm");
        fs.unlinkSync("output.mp4");
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
  })
  .catch((error) => {
    console.error("Error initializing FFmpeg:", error);
  });
