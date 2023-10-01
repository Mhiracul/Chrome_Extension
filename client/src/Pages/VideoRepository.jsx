import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "../assets/Logo.png";
import { BiSolidVolumeFull, BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
const VideoRepository = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch all videos from your server
    axios
      .get("https://localhsot:3000/api/videos") // Replace with your server URL
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="" className="w-32" />
          <FaUserCircle size={25} />
        </div>

        <div className="flex md:flex-row flex-col gap-3 justify-between items-center py-8">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-sora font-semibold text-xl">
              Hello, John Mark
            </h1>

            <p className="text-[#141414] text-xs font-sans">
              Here are your recorded videos
            </p>
          </div>

          <div className="bg-[#E7E7ED] inline-flex gap-2 items-center  py-3 px-6 rounded-md w-full max-w-sm">
            <AiOutlineSearch />
            <input
              type="text"
              placeholder="search for a particular video"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>
        <div>
          <h1>Recent files</h1>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-10 py-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="border-[1px]  border-[#959494] flex-wrap  rounded-md"
              >
                <video
                  controls
                  width="100%"
                  height="180"
                  id={`video-${video._id}`}
                  muted={video.muted}
                  className="rounded-md"
                >
                  <source src={`${video.videoURL}`} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRepository;
