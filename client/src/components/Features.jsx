import { BsFillRecordCircleFill } from "react-icons/bs";
import Video from "../assets/VideoRepository.png";
import { FaLocationArrow } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";

const Features = () => {
  return (
    <div className="bg-[#F0F3F5] py-10">
      <div className="bg-white py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <h1 className="text-[#141414] font-semibold text-2xl mb-3">
              Features
            </h1>
            <p className="text-[#616163] text-sm font-normal">
              Key Highlights of Our Extension
            </p>
          </div>
          <div className="flex md:flex-row flex-col md:items-start items-center justify-between mt-20 ">
            <div className="1 flex flex-col gap-10 py-10">
              <div className="flex gap-3 items-start">
                <div className="bg-[#120B48] rounded-full p-2">
                  <BsFillRecordCircleFill color="#ffffff" />
                </div>

                <div>
                  <h1 className="text-[#1B233D] font-semibold mb-2 text-xl">
                    Simple Screen Recording
                  </h1>
                  <p className="max-w-md text-sm font-mormal text-[#616163]">
                    Effortless screen recording for everyone. Record with ease,
                    no tech expertise required.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-[#120B48] rounded-full p-2">
                  <FaLocationArrow color="#ffffff" />
                </div>

                <div>
                  <h1 className="text-[#1B233D] mb-2 font-semibold text-xl">
                    Easy-to-Share URL
                  </h1>
                  <p className="max-w-md text-sm font-mormal text-[#616163]">
                    Share your recordings instantly with a single link. No
                    attachments, no downloads.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-[#120B48] rounded-full p-2">
                  <BiRefresh color="#ffffff" />
                </div>

                <div>
                  <h1 className="text-[#1B233D] font-semibold mb-2 text-xl">
                    Revisit Recordings
                  </h1>
                  <p className="max-w-md text-sm font-mormal text-[#616163]">
                    Access and review your past content effortlessly. Your
                    recordings, always at your fingertips.
                  </p>
                </div>
              </div>
            </div>

            <div className="2">
              <img src={Video} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
