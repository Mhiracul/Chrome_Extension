const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
dotenv.config();

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: "uploads/",
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

    const videoURL = `https://chrome-fd0g.onrender.com/api/get-video/${encodeURIComponent(
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
        const videoUrl = `https://chrome-fd0g.onrender.com/api/get-video/${encodeURIComponent(
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

app.get("/api/get-video/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const videoPath = path.join(__dirname, "uploads", filename);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ error: "Video not found." });
    }

    res.setHeader("Content-Type", "video/webm");

    const stream = fs.createReadStream(videoPath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error serving video file:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mokeke250@gmail.com",
    pass: "lxvycnellvurscyl",
  },
});

app.post("/api/send-email", async (req, res) => {
  const { receiverEmail, videoURL } = req.body;

  try {
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
