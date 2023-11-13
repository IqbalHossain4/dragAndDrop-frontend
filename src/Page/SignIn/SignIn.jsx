import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";

const SignIn = () => {
  const { signIns, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || "/";
  // Handle SignIn
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIns(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errors = error.message;
      });
  };

  // Google SignIn

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const user = result.user;
      const currentUser = {
        name: user.displayName,
        email: user.email,
      };
      axios.post("http://localhost:5000/users", currentUser).then((data) => {
        if (data) {
          navigate(from, { replace: true });
        }
      });
    });
  };

  return (
    <div
      className="w-screen h-[100vh] flex items-center justify-center bg-cover bg-center box-content"
      style={{
        backgroundImage: "url('loginBg.jpg')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <div className="bg-[rgba(0,0,0,0.5)] border-r-[30px] navBerShadow border-black text-white p-[40px] w-[450px] py-[60px] rounded-md relative">
          <h1 className="mb-[30px] text-[22px] font-[700]">User SignIn</h1>
          <form onSubmit={handleSignIn}>
            <div>
              <div className="flex flex-col  gap-4">
                <div className="flex flex-col items-start">
                  <label className="text-[14px] tracking-[3px]">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="w-full text-black py-3 ps-2 rounded outline-none focus:border-[#58E01C] border-b-[3px] mt-[5px]"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-[14px] tracking-[3px]">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full text-black py-3 ps-2 rounded outline-none  focus:border-[#58E01C] border-b-[3px] mt-[5px]"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="mt-[30px]">
                <div className="flex items-center gap-1">
                  <input type="checkbox" name="" id="" />
                  <p className="text-[12px]">Remember Me</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full  text-center text-[18px] font-[700] py-2 border rounded mt-[10px] transition-colors duration-500 hover:border-none hover:bg-[#58E01C] hover:text-black"
            >
              SignIn
            </button>
          </form>
          <div className="mt-[10px] float-right">
            <div className="flex items-center  gap-1">
              <p className="text-[12px]">Create Account!</p>
              <Link
                to="/signUps"
                className="text-[#58E01C] text-[14px] font-[600]"
              >
                SignUp
              </Link>
            </div>
          </div>

          <div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-[30px]  cursor-pointer"
            >
              <img
                src="google.png"
                className="mx-auto saturate-0 transition-all duration-500 hover:saturate-100"
                width={30}
                height={30}
                alt=""
              />
            </button>
          </div>
          <div className="absolute right-[-19%] top-[50%] rotate-[90deg]">
            <p className="text-[12px] font-[700] tracking-[15px]">SignIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
