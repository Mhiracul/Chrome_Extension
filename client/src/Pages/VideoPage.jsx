import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiCopy } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebook, FaTelegram, FaWhatsapp } from "react-icons/fa";
import Availabilty from "../components/Availabilty";
import { AiOutlineEdit } from "react-icons/ai";
const VideoPage = () => {
  const [videoURL, setVideoURL] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const videoURLParam = queryParams.get("videoURL");

    setVideoURL(videoURLParam);
  }, []);

  const handleCopyClick = () => {
    const textField = document.createElement("textarea");
    textField.innerText = videoURL;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    document.body.removeChild(textField);
    toast.success("Copied!");

    setCopied(true);
  };
  const handleSendEmail = async () => {
    try {
      await axios.post("/api/send-email", {
        receiverEmail,
        videoURL,
      });

      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error("Failed to send email. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full  font-sora">
        <div className=" container grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-10  mx-auto px-4 sm:px-6 md:px-8 py-10">
          <div className="w-full">
            <h1 className="lg:text-4xl text-2xl text-[#141414] font-semibold mb-4 font-sora ">
              Your Video is ready!
            </h1>

            <div className="flex flex-col gap-10 mt-8">
              <div>
                <p className="text-[#727272] text-xs font-medium mb-2">Name</p>
                <div className="inline-flex gap-3 items-center">
                  <h1 className="text-xl">Video Name</h1>
                  <AiOutlineEdit />
                </div>
              </div>

              <div className="bg-[#f3f2f2]  px-3 py-2 rounded-md w-full flex md:flex-row flex-col gap-2 items-center justify-between">
                <input
                  type="text"
                  placeholder="enter email of receiver"
                  className="text-xs bg-transparent outline-none"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                />
                <button
                  onClick={handleSendEmail}
                  className="bg-[#605C84] md:w-auto w-full rounded-md text-sm text-white py-1 px-3"
                >
                  Send
                </button>
              </div>

              <div className="bg-[#f3f2f2]  px-3 py-2 rounded-md w-full flex items-center justify-between">
                <input
                  type="text"
                  placeholder="https://www.helpmeout/Untitled_Video_20232509"
                  className="text-[10px] bg-transparent outline-none w-full"
                  value={videoURL}
                  readOnly
                />
                <button
                  className="bg-transparent border border-[#929292] inline-flex gap-2 items-center text-xs rounded-md py-2 md:px-4 px-3"
                  onClick={handleCopyClick}
                >
                  <FiCopy color="#000" /> Copy
                </button>
                {copied && (
                  <ToastContainer position="bottom-center" autoClose={2000} />
                )}
              </div>

              <div>
                <h1 className="text-[#08051E] font-semibold text-sm">
                  Share your Video
                </h1>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-3 items-center  max-w-md mt-3">
                  <div className=" md:text-sm text-xs   text-[#08051E] rounded  border border-[#0A0628]">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        videoURL
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-2 py-1"
                    >
                      <FaFacebook color="#1877F2" size={18} /> Facebook
                    </a>
                  </div>
                  <div className="md:text-sm text-xs  text-[#08051E] rounded  border border-[#0A0628]">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        videoURL
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-2 py-1"
                    >
                      <FaWhatsapp color="#25D366" size={18} /> WhatsApp
                    </a>
                  </div>
                  <div className="inline-flex items-center md:text-sm text-xs  px-2 py-1 text-[#08051E] rounded gap-2 border border-[#0A0628]">
                    <FaTelegram color="#2AABEE" size={18} /> Telegram
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="video-grid w-full">
            <div className="border-[1px]  border-[#959494] flex-wrap  rounded-md">
              <video
                controls
                width="100%"
                src={videoURL}
                className=" rounded-md"
                type="video/mp4"
              >
                Your browser does not support the video tag.
              </video>
              <div className="video-controls flex flex-wrap  justify-end gap-4 py-2 px-6"></div>
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
