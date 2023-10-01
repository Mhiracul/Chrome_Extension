import React from "react";
import Kite from "../assets/success-kite.png";
const Modal = () => {
  return (
    <div className="bg-[#000] w-full h-screen">
      <div className="flex justify-center  items-center min-h-screen">
        <div className="bg-[#F2F4F7] max-w-md flex flex-col gap-20 justify-center items-center  rounded-md shadow-md p-8">
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
    </div>
  );
};

export default Modal;
