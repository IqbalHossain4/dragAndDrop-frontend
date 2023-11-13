import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
const Profile = () => {
  const Active = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-white px-3 rounded-md font-[700] bg-black block"
            : "text-black px-3 rounded-md font-[700]"
        }
      >
        {children}
      </NavLink>
    );
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-gray-400 pt-[100px] ">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li>
            <Link to="/" className="text-black px-3 rounded-md font-[700]">
              Home
            </Link>
          </li>
          <div className="divider"></div>
          <li>
            <Active to="/profile">Profile</Active>
          </li>
          <li>
            <Active to="myContent">My Font</Active>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
