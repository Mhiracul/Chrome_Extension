import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
const Navbar = () => {
  return (
    <div className="w-full bg-white shadow font-sans">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="flex justify-between items-center">
          <div>
            <img src={Logo} alt="" className="w-32" />
          </div>

          <div className="text-[#000000] capitalize text-sm font-medium">
            <ul className="flex gap-6">
              <li>Features</li>
              <li>How it works</li>
            </ul>
          </div>

          <div>
            <button className="capitalize text-[#120B48] text-[18px] font-bold">
              <Link to="/login"> Get started</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
