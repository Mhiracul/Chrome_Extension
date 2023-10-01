const Availabilty = () => {
  return (
    <div className="bg-[#E7E7ED]  w-full h-full font-sora mb-8">
      <div className=" container mx-auto flex justify-center items-center px-4 sm:px-6 md:px-8 py-16">
        <div className="max-w-md text-[#141414] text-[18px] flex flex-col items-center text-center font-semibold">
          To ensure the availability and privacy of your video, we recommend
          saving it to your account.
          <button className="bg-[#120B48] rounded-md text-sm text-white py-3 px-4 mt-4">
            Save Video
          </button>{" "}
          <h2 className="text-[#7E7E7E] mt-6">
            Don’t have an account? Create account
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Availabilty;
