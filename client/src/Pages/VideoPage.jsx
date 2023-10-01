import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiCopy } from "react-icons/fi";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";

import { FaFacebook, FaTelegram, FaWhatsapp } from "react-icons/fa";
import Availabilty from "../components/Availabilty";
import { BiSolidVolumeFull, BiVolumeFull, BiVolumeMute } from "react-icons/bi";
const VideoPage = () => {
  const [videoURL, setVideoURL] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    // Parse the query parameters to get the videoURL
    const queryParams = new URLSearchParams(window.location.search);
    const videoURLParam = queryParams.get("videoURL");

    // Set the videoURL in the state
    setVideoURL(videoURLParam);
  }, []);

  const handleCopyClick = () => {
    // Copy the video URL to the clipboard
    const textField = document.createElement("textarea");
    textField.innerText = videoURL;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    document.body.removeChild(textField);

    // Update the state to indicate that the URL has been copied
    setCopied(true);
  };

  const toggleVolume = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video._id === videoId) {
          return {
            ...video,
            muted: !video.muted,
          };
        }
        return video;
      })
    );
  };

  // Function to toggle play/pause of a video
  const togglePlay = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video._id === videoId) {
          const videoElement = document.getElementById(`video-${video._id}`);
          if (videoElement) {
            if (videoElement.paused) {
              videoElement.play();
            } else {
              videoElement.pause();
            }
          }
          return video;
        }
        return video;
      })
    );
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full  font-sora">
        <div className=" container grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-10  mx-auto px-4 sm:px-6 md:px-8 py-10">
          <div className="w-full">
            <h1 className="text-4xl text-[#141414] font-semibold mb-4 font-sora ">
              Your Video is ready!
            </h1>

            <div className="flex flex-col gap-10 mt-8">
              <div>
                <p className="text-[#727272] text-xs font-medium mb-2">Name</p>
                <h1 className="text-xl">Video Name</h1>
              </div>

              <div className="bg-[#f3f2f2]  px-3 py-2 rounded-md max-w-md flex items-center justify-between">
                <input
                  type="text"
                  placeholder="enter email of receiver"
                  className="text-xs bg-transparent outline-none"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                />
                <button className="bg-[#605C84] rounded-md text-sm text-white py-1 px-3">
                  Send
                </button>
              </div>

              <div className="bg-[#f3f2f2]  px-3 py-2 rounded-md max-w-md flex items-center justify-between">
                <input
                  type="text"
                  placeholder="https://www.helpmeout/Untitled_Video_20232509"
                  className="text-[10px] bg-transparent outline-none w-full"
                  value={videoURL}
                  readOnly
                />
                <button
                  className="bg-transparent border border-[#929292] inline-flex gap-2 items-center text-xs rounded-md py-2 px-4"
                  onClick={handleCopyClick}
                >
                  <FiCopy color="#000" /> Copy
                </button>
                {copied && <span className="text-green-500">Copied!</span>}
              </div>

              <div>
                <h1 className="text-[#08051E] font-semibold text-sm">
                  Share your Video
                </h1>
                <div className="flex md:flex-row flex-col gap-3 items-center  max-w-md mt-3">
                  <div
                    className="inline-flex items-center text-sm px-2 py-1 text-[ry-900
#08051E] rounded gap-2 border border-[#0A0628]"
                  >
                    <FaFacebook color="#1877F2" size={18} /> Facebook
                  </div>
                  <div
                    className="inline-flex items-center text-sm px-2 py-1 text-[ry-900
#08051E] rounded gap-2 border border-[#0A0628]"
                  >
                    <FaWhatsapp color="#25D366" size={18} /> Whatsapp
                  </div>
                  <div
                    className="inline-flex items-center text-sm px-2 py-1 text-[ry-900
#08051E] rounded gap-2 border border-[#0A0628]"
                  >
                    <FaTelegram color="#2AABEE" size={18} /> Telegram
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="video-grid w-full">
            <div className="border-[1px]  border-[#959494] flex-wrap  rounded-md">
              <p className="text-[#08051E] font-semibold text-sm">Video URL:</p>
              <video
                controls
                width="100%"
                src={videoURL}
                className="my-2 rounded-md"
              >
                Your browser does not support the video tag.
              </video>
              <div className="video-controls flex flex-wrap  justify-end gap-4 py-2 px-6">
                <button
                  className="outline-none flex flex-wrap  flex-col gap-1 items-center"
                  onClick={() => toggleVolume(video._id)}
                >
                  {video.muted ? (
                    <>
                      <BiVolumeMute />
                      <span className="text-[10px]">Volume</span>
                    </>
                  ) : (
                    <>
                      <BiVolumeFull />{" "}
                      <span className="text-[10px]">Volume</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => togglePlay(video._id)}
                  className="outline-none flex flex-col gap-1 items-center"
                >
                  {video.paused ? (
                    <>
                      <AiOutlinePlayCircle />{" "}
                      <span className="text-[10px]">Play</span>
                    </>
                  ) : (
                    <>
                      <AiOutlinePauseCircle />{" "}
                      <span className="text-[10px]">Pause</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Availabilty />
      <Footer />
    </>
  );
};

export default VideoPage;
