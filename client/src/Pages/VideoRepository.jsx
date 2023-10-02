import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "../assets/Logo.png";
import { CgMoreVertical } from "react-icons/cg";
import { BsLink } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
const VideoRepository = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [transcription, setTranscription] = useState("");
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("http://54.221.51.134:9000/api/all");
        if (response.ok) {
          const data = await response.json();
          setVideos(data.filter((url) => url.endsWith(".mp4"))); // Filter out only .mp4 files
        } else {
          console.error("Failed to fetch videos.");
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    fetchVideos();
  }, []);

  const handleVideoClick = async (videoUrl) => {
    try {
      // Determine the corresponding transcription filename
      const transcriptionFilename = `${videoUrl.substring(
        videoUrl.lastIndexOf("/") + 1
      )}.txt`;
      const response = await axios.get(
        `http://localhost:9000/api/${transcriptionFilename}`
      );

      if (response.status === 200) {
        setSelectedVideo(videoUrl);
        setTranscription(response.data); // Set the transcription data
      } else {
        console.error("Failed to fetch transcription.");
      }
    } catch (error) {
      console.error("Error fetching transcription:", error);
    }
  };
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="" className="w-32" />
          <FaUserCircle size={25} />
        </div>

        <div className="flex lg:flex-row md:flex-row flex-col gap-3 justify-between items-center py-8">
          <div className="flex flex-col gap-2 items-center ">
            <h1 className="font-sora font-semibold text-xl ">
              Hello, Miracle 5️⃣
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
            {videos.map((videoUrl, index) => (
              <div
                key={index}
                className="border-[1px]  border-[#959494] flex-wrap  rounded-md p-2"
              >
                <video
                  controls
                  width="100%"
                  height="240"
                  className="rounded-lg"
                >
                  <source src={videoUrl} type="video/mp4" />
                  does not support the video tag.
                </video>

                <p>{videoUrl.transcriptUrl}</p>
                <div className="flex md:flex-row gap-3 justify-between items-start">
                  <div className="py-3">
                    <p className="font-semibold text-xs capitalize">
                      Video {index + 1}
                    </p>
                    <p className="text-[#B6B3C6] text-xs font-medium mt-2 uppercase">
                      september 23, 2023
                    </p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <BsLink />
                    <CgMoreVertical />
                  </div>
                </div>
                {selectedVideo === videoUrl && (
                  <div>
                    <p>Transcription:</p>
                    <p>{transcription}</p>
                  </div>
                )}
                <button onClick={() => handleVideoClick(videoUrl)}>
                  Show Transcription
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRepository;
