// videoModel.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoData: String, // Base64 encoded video data
  // Add any other fields you need for video metadata
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
