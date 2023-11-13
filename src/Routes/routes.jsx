import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignIn from "../Page/SignIn/SignIn";
import SignUp from "../Page/SignUp/SignUp";
import Profile from "../Page/Profile/Profile";
import ProfileMain from "../Page/Profile/ProfileContent/ProfileMain";
import MyContent from "../Page/Profile/ProfileContent/MyContent";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signIns",
    element: <SignIn />,
  },
  {
    path: "/signUps",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "/profile",
        element: <ProfileMain />,
      },
      {
        path: "myContent",
        element: <MyContent />,
      },
    ],
  },
]);

export default routes;
