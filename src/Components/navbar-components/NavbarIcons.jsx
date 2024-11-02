import { useState } from "react";
import NotificationModal from "../NotificationModal";
import UserModal from "../UserModal";
import DocumentModal from "../DocumentModal";
import { SearchIcon, DocIcon, BellIcon, PersonIcon } from "@/assets/icons";
import SearchModal from "../SearchModal";

const NavbarIcons = ({ searchIcon, docIcon, currentColor }) => {
  const [visibleNotifModal, setVisibleNotifModal] = useState(false);
  const [visibleUserModal, setVisibleUserModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [docModal, setDocModal] = useState(false);
  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      setVisibleNotifModal(false);
      setVisibleUserModal(false);
      setSearchModal(false);
      setDocModal(false);
    }
  });

  return (
    <ul className="flex ">
      {searchIcon ? (
        <li className="mr-[15px]">
          <span onClick={() => setSearchModal(true)} className="cursor-pointer">
            <SearchIcon className={`${currentColor.text}`} />
          </span>
          <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
          />
        </li>
      ) : (
        ""
      )}

      {docIcon ? (
        <li className="mr-[15px] cursor-pointer">
          <span
            onClick={() => setDocModal(!docModal)}
            className="cursor-pointer"
          >
            <DocIcon className={`${currentColor.text}`} />
          </span>
          <DocumentModal docModal={docModal} />
        </li>
      ) : (
        ""
      )}

      <li
        data-name="notification-modal"
        className="mr-[15px] relative cursor-pointer"
      >
        <span
          onClick={() =>
            visibleNotifModal
              ? setVisibleNotifModal(false)
              : setVisibleNotifModal(true)
          }
          className="cursor-pointer"
        >
          <BellIcon className={`${currentColor.text}`} />
        </span>
        <NotificationModal visibleNotifModal={visibleNotifModal} />
      </li>
      <li className="relative cursor-pointer">
        <span
          onClick={() =>
            visibleUserModal
              ? setVisibleUserModal(false)
              : setVisibleUserModal(true)
          }
          className="cursor-pointer"
        >
          <PersonIcon className={`${currentColor.text}`} />
        </span>
        <UserModal visibleUserModal={visibleUserModal} />
      </li>
    </ul>
  );
};

export default NavbarIcons;
