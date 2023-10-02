import Logo from "../assets/Logo.png";
import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="w-full bg-white shadow font-sans">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="flex justify-between items-center">
          <div>
            <img src={Logo} alt="" className="w-32" />
          </div>

          <div className="text-[#000000] hidden sm:flex capitalize text-sm font-medium">
            <ul className="flex gap-6 cursor-pointer">
              <Link to="features" smooth={true} duration={500}>
                {" "}
                Features{" "}
              </Link>
              <li>
                <Link to="how" smooth={true} duration={500}>
                  How it works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <button className="capitalize hidden sm:block text-[#120B48] outline-none text-[18px] font-bold">
              <NavLink to="/login"> Get started</NavLink>
            </button>
          </div>
          <div className="sm:hidden flex-end">
            <button
              className="text-[#120B48] outline-none text-[18px] font-bold"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <AiOutlineCloseCircle /> : <BiMenuAltRight />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 shadow-md  py-3 px-3">
            <ul className="flex flex-col gap-4 cursor-pointer">
              <Link to="features" smooth={true} duration={500}>
                {" "}
                Features{" "}
              </Link>{" "}
              <Link to="how" smooth={true} duration={500}>
                How it works
              </Link>
            </ul>

            <button className="capitalize text-[#120B48] text-[18px] mt-4 font-bold">
              <NavLink to="/login"> Get started</NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
