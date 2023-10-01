import Logo from "../assets/Logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
const Login = () => {
  return (
    <div className="bg-white ">
      <div className="container mx-auto py-10">
        <div>
          <img src={Logo} alt="" className="w-32" />
        </div>

        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="font-semibold text-2xl mb-3">Log in or Sign up</h1>
          <p className="text-[#434343] font-light text-center text-sm max-w-xs">
            Join millions of others in sharing successful moves on HelpMeOut.
          </p>

          <div className="w-full flex flex-col gap-3 max-w-md mx-auto py-6">
            <button className="inline-flex items-center gap-3 justify-center border text-black font-medium text-sm py-2 px-4 rounded-lg">
              <FcGoogle /> Continue with Google
            </button>
            <button className="inline-flex items-center gap-3 justify-center  border text-black font-medium text-sm py-2 px-4 rounded-lg">
              <FaFacebook color="#1877F2" /> Continue with Facebook
            </button>
          </div>
          <div className="flex items-center w-full max-w-md mx-auto">
            <div className="bg-gray-300 w-1/2 h-[1px] flex-grow"></div>
            <div className="mx-4  text-gray-500">or</div>
            <div className="bg-gray-300 w-1/2 h-[1px] flex-grow"></div>
          </div>

          <form
            action=""
            className="flex flex-col w-full max-w-md mx-auto mt-10"
          >
            <label htmlFor="email" className="text-sm mb-3">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email address"
              className="border px-4 py-2 rounded-md text-sm mb-6 outline-none"
            />
            <label htmlFor="password" className="text-sm ">
              Password
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              className="border px-4 py-2 rounded-md text-sm mt-2 outline-none"
            />

            <button className="bg-[#120B48] text-white py-2 mt-4 rounded-md">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
