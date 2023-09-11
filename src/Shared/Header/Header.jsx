import axios from "axios";
import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri"; // Import the search icon from react-icons
import Modal from "../../Components/Modal/Modal";
import DisplaySrcFont from "../../Components/modalContent/DisplaySrcFont";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [storeSrcData, setStoreSrcData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [srcMsg, setSrcMsg] = useState("");

  // ==== Manage Modal ====
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // ==== Search ====
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.get(
      `http://localhost/projects/dragDrop/searchFont.php?searchQuery=${searchQuery}`
    );

    if (res.data.error !== "No fonts found") {
      setSrcMsg("");
      setStoreSrcData(res.data);
      if (storeSrcData.length > 0) {
        openModal();
        toggleSearch();
      }
    } else {
      setSrcMsg("Data Not Found");
      return;
    }
  };

  return (
    <header>
      <div>
        <nav className="bg-black p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  <a
                    href="#"
                    className="text-white font-bold md:text-xl flex items-center gap-2"
                  >
                    <div className="w-[30px] h-[30px]">
                      <img src="2072263.png" className="w-full h-full" alt="" />
                    </div>
                    <h2>Tech Charms</h2>
                  </a>
                </div>
              </div>
              <div className="md:hidden">
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
                    {isOpen ? (
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    ) : (
                      <path d="M4 6h16M4 12h16m-7 6h7"></path>
                    )}
                  </svg>
                </button>
              </div>
              <div className="hidden md:flex space-x-4 items-center relative">
                <a href="#" className="text-white px-3 py-2 rounded-md">
                  Home
                </a>
                <a href="#" className="text-white px-3 py-2 rounded-md">
                  About
                </a>
                <a href="#" className="text-white px-3 py-2 rounded-md">
                  Services
                </a>
                <a href="#" className="text-white px-3 py-2 rounded-md">
                  Contact
                </a>
                {/* Search Icon */}
                <button
                  onClick={toggleSearch}
                  className="text-white focus:outline-none focus:text-white"
                >
                  <RiSearch2Line size={20} />
                </button>
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
