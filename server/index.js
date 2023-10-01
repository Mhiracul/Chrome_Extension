const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors"); // Import the cors middleware
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
//const Video = require("./videoModel"); // Import the Video model
dotenv.config();

const app = express();

const mongo = process.env.MONGODB_URL;

mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connection successful"))
  .catch(() => console.log("Mongo connection failed"));

app.use(cors());

const videoSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  uploadDate: Date,
  videoURL: String,
});

const Video = mongoose.model("Video", videoSchema);

const storage = multer.diskStorage({
  destination: "uploads/", // Define the directory where uploaded videos will be saved.
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/api/upload", upload.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded." });
    }

    const videoURL = `http://localhost:3000/api/get-video/${encodeURIComponent(
      req.file.filename
    )}`;
    res.status(200).json({
      message: "Video uploaded successfully.",
      videoPath: req.file.path,
      videoURL,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/list-videos", (req, res) => {
  try {
    const videoDirectory = path.join(__dirname, "uploads");
    fs.readdir(videoDirectory, (err, files) => {
      if (err) {
        console.error("Error listing video files:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

      const videoFiles = files.filter((file) =>
        [".webm"].includes(path.extname(file).toLowerCase())
      );

      const videoList = videoFiles.map((file) => {
        const videoName = path.basename(file, path.extname(file));
        const videoUrl = `http://localhost:3000/api/get-video/${encodeURIComponent(
          file
        )}`;
        return { name: videoName, url: videoUrl };
      });

      res.status(200).json({ videos: videoList });
    });
  } catch (error) {
    console.error("Error listing video files:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Define a route to serve individual video files
app.get("/api/get-video/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const videoPath = path.join(__dirname, "uploads", filename);

    // Check if the video file exists
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ error: "Video not found." });
    }

    // Set the appropriate content type for the video (e.g., webm)
    res.setHeader("Content-Type", "video/webm");

    // Stream the video file as a response
    const stream = fs.createReadStream(videoPath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error serving video file:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Define a route for serving videos
/*app.get("/api/video/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Construct the video file path
    const videoPath = path.join(__dirname, "uploads", video.filename);
    res.sendFile(videoPath);
  } catch (error) {
    console.error("Error fetching video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the video" });
  }
}); */

// Add this route to your Express application

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mokeke250@gmail.com",
    pass: "lxvycnellvurscyl",
  },
});

// Define a route to send emails
app.post("/api/send-email", async (req, res) => {
  const { receiverEmail, videoURL } = req.body;

  try {
    // Send email
    await transporter.sendMail({
      from: '"HelpMeOut" <info@pendoraventures.com>',
      to: receiverEmail,
      subject: "Your Video Link",
      text: `Here is the link to your video: ${videoURL}`,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
