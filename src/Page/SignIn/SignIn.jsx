import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const SignIn = () => {
  const { signIns, googleSignIn } = useContext(AuthContext);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [checked, setChecked] = useState(false);
  const [isPassShow, setIsPassShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || "/";
  console.log(isPassShow);
  // Handle SignIn
  const handleSignIn = (e) => {
    e.preventDefault();
    setEmailErrorMsg("");
    setPassErrorMsg("");
    setErrorMsg("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email == "") {
      setEmailErrorMsg("Your Email Field is Empty");
      return;
    }
    if (password == "") {
      setPassErrorMsg("Your Password Field is Empty");
      return;
    }

    if (!checked) {
      return;
    }

    signIns(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errors = error.message;
        setErrorMsg;
        errors;
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
      navigate(from, { replace: true });
      axios
        .post("https://tech-charms-seven.vercel.app/users", currentUser)
        .then((data) => {
          if (data) {
            navigate(from, { replace: true });
          }
        });
    });
  };

  return (
    <div
      className="w-screen md:h-[100vh] h-screen flex items-center justify-center bg-cover bg-center box-content"
      style={{
        backgroundImage: "url('loginBg.jpg')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <div className="bg-[rgba(0,0,0,0.5)] border-r-[30px] navBerShadow border-black text-white p-[40px] md:w-[450px] md:h-fit h-[60%]   py-[60px] rounded-md relative">
          <h1 className="mb-[30px] text-[22px] font-[700]">User SignIn</h1>
          <form onSubmit={handleSignIn}>
            <div>
              <div className="flex flex-col  gap-4">
                <div className="flex flex-col items-start">
                  <label className="text-[14px] tracking-[3px]">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="w-full text-black md:py-3 py-1 ps-2 rounded outline-none focus:border-[#58E01C] border-b-[3px] mt-[5px]"
                    placeholder="Email"
                  />
                </div>
                <p className="text-red-500">{emailErrorMsg}</p>
                <div className="relative ">
                  <div className="flex flex-col items-start">
                    <label className="text-[14px] tracking-[3px]">
                      Password
                    </label>
                    <input
                      type={isPassShow ? "text" : "password"}
                      name="password"
                      className="w-full text-black md:py-3 py-1 ps-2 rounded outline-none  focus:border-[#58E01C] border-b-[3px] mt-[5px]"
                      placeholder="Password"
                    />
                  </div>
                  <p
                    onClick={() => setIsPassShow(!isPassShow)}
                    className="absolute right-[20px] md:top-[55%] top-[50%] text-[25px] text-black"
                  >
                    {isPassShow ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </p>
                </div>
              </div>

              <p className="text-red-500">{passErrorMsg}</p>
              <p className="text-red-500">{errorMsg}</p>
              <div className="mt-[30px]">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <p className="text-[12px]">Remember Me</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full  text-center text-[18px] font-[700] py-2 border rounded mt-[10px] transition-colors duration-500 hover:border-none hover:bg-[#58E01C] hover:text-black ${
                checked ? "cursor-pointer" : "cursor-not-allowed"
              }`}
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
          <div className="absolute md:right-[-19%]  right-[-28%] top-[50%] rotate-[90deg]">
            <p className="text-[12px] font-[700] tracking-[15px]">SignIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
