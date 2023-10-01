// videoModel.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: String, // Original file name
  data: Buffer, // Binary data of the video
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
