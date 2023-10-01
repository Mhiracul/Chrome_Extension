import Rec from "../assets/rec.png";
const HowItWorks = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 ">
        <div>
          <h1 className="text-[#141414] text-center font-semibold text-2xl mb-3">
            How It Works
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20 mt-10">
          <div className="flex flex-col items-center">
            <div className="bg-[#120B48] rounded-full px-5 py-3">
              <h1 className="text-white">1</h1>
            </div>
            <div className="flex flex-col items-center mt-3">
              <h1 className="text-[#120B48]  mb-3 font-semibold text-xl">
                Record Screen
              </h1>
              <p className="max-w-xs text-center  mb-3 text-xs  font-mormal text-[#616163]">
                Click the {'"Start Recording"'} button in our extension. choose
                which part of your screen to capture and who you want to send it
                to.
              </p>
              <img src={Rec} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#120B48] rounded-full px-5 py-3">
              <h1 className="text-white">2</h1>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-[#120B48] mb-3 font-semibold text-xl mt-3">
                Share Your Recording
              </h1>
              <p className="max-w-xs text-center  mb-3 text-xs font-mormal text-[#616163]">
                We generate a shareable link for your video. Simply send it to
                your audience via email or copy the link to send via any
                platform.
              </p>
              <img src={Rec} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#120B48] rounded-full px-5 py-3">
              <h1 className="text-white">3</h1>
            </div>
            <div className="flex flex-col items-center mt-3">
              <h1 className="text-[#120B48] mb-3 font-semibold text-xl">
                Learn Effortlessly
              </h1>
              <p className="max-w-xs text-center mb-3 text-xs font-mormal text-[#616163]">
                Recipients can access your video effortlessly through the
                provided link, with our user-friendly interface suitable for
                everyone.
              </p>
              <img src={Rec} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
