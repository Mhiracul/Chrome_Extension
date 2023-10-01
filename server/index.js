const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors"); // Import the cors middleware
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
const ffmpeg = createFFmpeg({ log: true });
await ffmpeg.load();

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    const { buffer } = req.file;

    // Save the uploaded file to a temporary location
    const tempFilePath = "temp.webm";
    fs.writeFileSync(tempFilePath, buffer);

    // Convert the video to MP4 using FFmpeg
    await ffmpeg.FS("writeFile", "input.webm", await fetchFile(tempFilePath));
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
