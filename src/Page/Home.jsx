import React, { useState } from "react";
import DragAndDrop from "../Components/dragAndDrop/DragAndDrop";
import DisplayFont from "../Components/DisplayFonts/DisplayFont";
import ListAllGroups from "../Components/ListAllGroups/ListAllGroups";
import useSelectedFonts from "../Hooks/useSelectedFonts";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import Banner from "../Components/Banner/Banner";
import Modal from "../Components/Modal/Modal";
import CreateGroup from "../Components/modalContent/CreateGroup";
import useFonts from "../Hooks/useFonts";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const Home = () => {
  const [loadSelectedFonts, selectFont] = useSelectedFonts();
  const [modalOpen, setModalOpen] = useState(false);
  const [loadTotalFonts, getFont] = useFonts();

  // ==== Manage Modal ====
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <Header />

      {/* DragAndDropt */}
      <div>
        <Banner />
      </div>

      <div>
        <DragAndDrop />
      </div>

      {/* Display Font */}
      {loadTotalFonts.length > 0 && (
        <div
          className="my-24"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <DisplayFont />
        </div>
      )}

      {loadTotalFonts.length > 0 && (
        <div
          className="bg-black py-4 relative"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <div className="lineOne"></div>
          <div className="lineTwo"></div>

          <div className=" py-2 my-24 flex items-center justify-center">
            <button
              className="bg-[#7BFF29]  text-black text-[18px] font-[600] duration-200 hover:bg-black hover:border border-[#7BFF29] hover:text-[#7BFF29] py-3 px-4 rounded-lg "
              onClick={openModal}
            >
              Create Group
            </button>
          </div>

          {/* Creat Group  Button */}
          <div>
            <Modal isOpen={modalOpen} onClose={closeModal}>
              <div>
                <CreateGroup />
              </div>
            </Modal>
          </div>
        </div>
      )}

      {/* ListAllGroups */}
      {loadSelectedFonts.length > 0 && (
        <div
          className="my-24"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <ListAllGroups />
        </div>
      )}
      {/* Footer */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-duration="1000"
      >
        <Footer />
      </div>
    </div>
  );
};

export default Home;
