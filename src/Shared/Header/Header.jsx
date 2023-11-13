import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri"; // Import the search icon from react-icons
import Modal from "../../Components/Modal/Modal";
import DisplaySrcFont from "../../Components/modalContent/DisplaySrcFont";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Header = () => {
  const { user, signOuts } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [storeSrcData, setStoreSrcData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [srcMsg, setSrcMsg] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  // ==== Manage Modal ====
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // ==== Search ====
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.get(
      `http://localhost:5000/searchFont?font=${searchQuery}`
    );
    if (res.data.error !== "No fonts found") {
      setSrcMsg("");
      setStoreSrcData(res.data);
      if (storeSrcData) {
        openModal();
        toggleSearch();
        setIsSearchOpen(false);
      }
    } else {
      setSrcMsg("Data Not Found");
      return;
    }
  };

  // Handle SignOut

  const handleSignOut = () => {
    signOuts()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const menu = (
    <>
      <li>
        <Link to="/" className="text-white px-3 py-2 rounded-md">
          Home
        </Link>
      </li>
      <li>
        <a href="#" className="text-white px-3 py-2 rounded-md">
          About
        </a>
      </li>
      <li>
        <a href="#" className="text-white px-3 py-2 rounded-md">
          Services
        </a>
      </li>
      <li>
        <a href="#" className="text-white px-3 py-2 rounded-md">
          Contact
        </a>
      </li>
      {!user && (
        <li>
          <Link to="/signIns" className="text-white px-3 py-2 rounded-md">
            SignIn
          </Link>
        </li>
      )}
      {/* Search Icon */}
      <li>
        <button
          onClick={toggleSearch}
          className="px-3 py-2  text-white focus:outline-none focus:text-white"
        >
          <RiSearch2Line size={20} />
        </button>
      </li>
    </>
  );

  // Handle NavBer Scroll

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div>
        <nav
          className={`${
            isSticky ? "fixed top-0 w-full bg-[white]  navBerShadow " : ""
          } transition duration-300 ease-in-out p-4 bg-black z-10`}
        >
          <div className="w-[90%] mx-auto">
            <div className="flex md:items-center items-start justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  <a
                    href="#"
                    className="text-white font-bold md:text-xl flex items-center gap-2"
                  >
                    <div className="w-[30px] h-[30px]">
                      <img src="2072263.png" className="w-full h-full" alt="" />
                    </div>
                    <h2 className="lg:text-[30px] md:text-[25px] text-[18px]">
                      Tech Charms
                    </h2>
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                {/* Mobile */}
                <div className="md:hidden flex flex-col items-end">
                  <button
                    onClick={toggleNavbar}
                    className="text-white focus:outline-none focus:text-white"
                  >
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      {isMenuOpen ? (
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      ) : (
                        <path d="M4 6h16M4 12h16m-7 6h7"></path>
                      )}
                    </svg>
                  </button>
                  <div
                    className={`md:hidden   ${
                      isMenuOpen ? "block  mt-2" : "hidden"
                    }`}
                  >
                    <ul className="flex flex-col items-end gap-[15px]">
                      {menu}
                    </ul>

                    {/* Search Form */}
                    <form
                      onSubmit={handleSearchSubmit}
                      className={`${
                        isSearchOpen ? "block" : "hidden"
                      }  bg-black p-2 rounded-md`}
                    >
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="w-[150px] bg-gray-100 px-2 py-1 rounded-md outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-black border border-[#7BFF29] text-white px-2 py-1 rounded-md"
                        >
                          Search
                        </button>
                      </div>
                      <div className="text-red-500 text-xs mt-2">
                        <p>{srcMsg}</p>
                      </div>
                    </form>
                  </div>
                </div>
                {/* Desktop */}
                <div className="hidden relative md:block">
                  <ul className="flex items-center">{menu}</ul>

                  {/* Search Form */}
                  <form
                    onSubmit={handleSearchSubmit}
                    className={`${
                      isSearchOpen ? "block" : "hidden"
                    } absolute right-0 top-10 bg-black p-2 rounded-md`}
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="bg-gray-100 px-2 py-1 rounded-md outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-black border border-[#7BFF29] text-white px-2 py-1 rounded-md"
                    >
                      Search
                    </button>
                    <div className="text-red-500 text-xs mt-2">
                      <p>{srcMsg}</p>
                    </div>
                  </form>
                </div>
                {/* Profile */}
                {user && (
                  <div className="relative">
                    <button
                      className=" w-[50px] h-[50px]"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <img
                        className="border w-full h-full rounded-full ml-4"
                        title="Profile"
                        src={user.photoURL ? user?.photoURL : "avatar.jpg"}
                        alt="User Logo"
                      />
                    </button>
                    {isProfileOpen && (
                      <div className="absolute bottom-[-115%] right-[-60%] rounded p-[10px] bg-black">
                        <ul className="flex flex-col text-[14px]">
                          <li>
                            <Link
                              to="/profile"
                              className="text-white rounded-md"
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleSignOut}
                              className="text-white pt-1 rounded-md"
                            >
                              SignOut
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div>
          <Modal isOpen={modalOpen} onClose={closeModal}>
            <div>
              <DisplaySrcFont srcData={storeSrcData} />
            </div>
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
