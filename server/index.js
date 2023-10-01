const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors"); // Import the cors middleware
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");

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

// Handle file uploads
const videoSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  uploadDate: Date,
  videoURL: String,
});

const Video = mongoose.model("Video", videoSchema);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: "uploads/", // Specify the directory where videos will be temporarily stored
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
  },
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define a route for video uploads
app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    // Construct the video URL
    const videoURL = `https://chrome-fd0g.onrender.com/api/video/${req.file.filename}`;

    // Create the video object
    const video = new Video({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploadDate: new Date(),
      videoURL: videoURL,
    });

    // Save the video object to the database
    await video.save();

    res.json({
      message: "Video uploaded successfully",
      videoURL: videoURL,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the video" });
  }
});

// Define a route for serving videos
app.get("/api/video/:id", async (req, res) => {
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
});

// Add this route to your Express application
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "An error occurred while fetching videos" });
  }
});

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
