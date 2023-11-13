import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
const image_hoisting_token = import.meta.env.VITE_imgApi;
const SignUp = () => {
  const { signUp, googleSignIn, updateProfiles } = useContext(AuthContext);
  const [imgPath, setImgPath] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || "/";
  const img_hoisting_url = `https://api.imgbb.com/1/upload?key=${image_hoisting_token}`;

  // Manage User Image

  const handlePhoto = async (e) => {
    setImgPath(e.target.files[0]);

    const formData = new FormData();
    formData.append("image", imgPath);
    const res = await axios.post(img_hoisting_url, formData);
    setImgUrl(res.data.display_url);
  };

  // Handle SignUp
  const handleSignUp = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const name = firstName + " " + lastName;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = imgUrl;

    signUp(email, password)
      .then((data) => {
        updateProfiles(name, photo)
          .then((data) => {
            if (data) {
              navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            const errors = error.message;
            console.log(errors);
          });
      })
      .catch((error) => {
        const errors = error.message;
        console.log(errors);
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
        <div className="bg-[rgba(0,0,0,0.5)] border-l-[30px] navBerShadow border-black text-white p-[40px] w-[450px] py-[60px] rounded-md relative">
          <h1 className="mb-[30px] text-[22px] font-[700]">User SignUp</h1>
          <form onSubmit={handleSignUp}>
            <div>
              <div className="flex flex-col  gap-4">
                <div className="flex flex-col items-start">
                  <label className="text-[14px] tracking-[3px]">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full text-black py-3 ps-2 rounded outline-none focus:border-[#58E01C] border-b-[3px] mt-[5px]"
                    placeholder="First Name"
                  />
                </div>

                <div className="flex flex-col items-start">
                  <label className="text-[14px] tracking-[3px]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full text-black py-3 ps-2 rounded outline-none focus:border-[#58E01C] border-b-[3px] mt-[5px]"
                    placeholder="Last Name"
                  />
                </div>

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

                <div className="flex flex-col items-start">
                  <label className="text-[14px] tracking-[3px]">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    onChange={handlePhoto}
                    className="w-full py-3  rounded outline-none  focus:border-[#58E01C] border-b-[3px] mt-[5px]"
                    required
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
              SignUp
            </button>
          </form>
          <div className="mt-[10px] float-right">
            <div className="flex items-center  gap-1">
              <p className="text-[12px]">Have an Account?</p>
              <Link
                to="/signIns"
                className="text-[#58E01C] text-[14px] font-[600]"
              >
                SignIn
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
          <div className="absolute left-[-19%] top-[50%] rotate-[90deg]">
            <p className="text-[12px] font-[700] tracking-[15px]">SignUp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
