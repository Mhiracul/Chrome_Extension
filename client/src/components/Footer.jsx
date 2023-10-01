import Logo from "../assets/Frame.svg";
const Footer = () => {
  return (
    <div className="bg-[#120B48] ">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-20 text-white">
        <div className="flex justify-between">
          <div>
            <img src={Logo} alt="" className="w-32" />
          </div>

          <div>
            <ul className="text-sm flex flex-col gap-3">
              <li className="font-medium text-xl">Menu</li>
              <li>Home</li>
              <li>Converter</li>
              <li>How it works</li>
            </ul>
          </div>

          <div>
            <ul className="text-sm flex flex-col gap-3">
              <li className="font-medium text-xl">Menu</li>
              <li>Home</li>
              <li>Converter</li>
              <li>How it works</li>
            </ul>
          </div>

          <div>
            <ul className="text-sm flex flex-col gap-3">
              <li className="font-medium text-xl">Menu</li>
              <li>Home</li>
              <li>Converter</li>
              <li>How it works</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
