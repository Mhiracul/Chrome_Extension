import Lady from "../assets/lady.png";
import Woman from "../assets/old_woman.png";
import Child from "../assets/child.png";
import { BsArrowRight } from "react-icons/bs";
const Banner = () => {
  return (
    <div className="flex bg-white  border-t ">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-[80vh] w-full">
        <div className="">
          <h1 className="md:text-6xl text-3xl font-bold max-w-md font-sora">
            Show Them Don’t Just Tell
          </h1>
          <p className="max-w-md text-[#000000] md:text-sm text-xs font-light font-inter mt-3">
            Help your friends and loved ones by creating and sending videos on
            how to get things done on a website.
          </p>
          <button className="bg-[#120B48] text-white py-2 px-4 md:text-sm text-xs mt-4 rounded-md inline-flex gap-2 items-end justify-center">
            <a
              href="https://drive.google.com/drive/folders/1Cx-cAPKTGqfBQVgcW1e_J6yaBp6YuFZH?usp=drive_link"
              className="inline-flex gap-2 items-end justify-center"
            >
              {" "}
              Install HelpMeOut <BsArrowRight size={18} />{" "}
            </a>
          </button>
        </div>

        <div className="w-1/2 flex md:flex-row flex-col md:justify-end justify-center">
          <div className="lg:grid lg:grid-cols-2 sm:hidden md:hidden hidden  gap-4">
            <div className="flex flex-col gap-7">
              <img
                src={Woman}
                alt="Image 2"
                className="rounded-lg b w-full h-auto"
              />
              <div className="relative">
                <div className="background"></div>{" "}
                <img
                  src={Child}
                  alt="Image 3"
                  className="rounded-lg  w-full h-auto relative z-10"
                />
              </div>
            </div>

            <div className="relative">
              <div className="background-image"></div>{" "}
              <img
                src={Lady}
                alt="Image 1"
                className="rounded-lg   w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
