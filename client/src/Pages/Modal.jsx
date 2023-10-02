import React from "react";
import Kite from "../assets/success-kite.png";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Import a close icon, such as 'FaTimes' from react-icons/fa

const Modal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div className="bg-[#F2F4F7] max-w-md flex flex-col gap-20 rounded-md shadow-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-2 outline-none right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <AiOutlineCloseCircle size={24} />
        </button>
        <div className="flex flex-col items-center gap-4">
          <img src={Kite} alt="" className="w-32 " />
          <p className="max-w-md text-center text-[16px] font-sans font-medium">
            Your video link has been sent to johnmark@gmail.com
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="max-w-xs text-center text-xs font-sans font-medium">
            Would you need to view this video later? Save to your account now!
          </p>
          <button className="bg-[#120B48] rounded-md text-sm text-white py-3 px-4 mt-4">
            Save Video
          </button>{" "}
          <h2 className="text-[#7E7E7E] text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-[#120B48]">Create account</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;
