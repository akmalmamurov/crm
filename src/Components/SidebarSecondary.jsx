import { forwardRef, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SidebarSecondary = forwardRef(
  ({ links, handleOpen, handleClose }, ref) => {
    let pathname = useLocation().pathname;
    const sidebarSecondaryRef = useRef();
    const { sidenavType, theme } = useSelector((state) => state.theme);
    const currentColor = theme[sidenavType];
    useEffect(() => {
      const useClickOutside = (e) => {
        if (
          sidebarSecondaryRef.current &&
          sidebarSecondaryRef.current !== e.target &&
          ref.current !== e.target
        ) {
          handleClose();
        }
      };

      if (handleOpen) {
        window.addEventListener("click", useClickOutside);
      }

      return () => {
        window.removeEventListener("click", useClickOutside);
      };
    });

    return (
      <div
        ref={sidebarSecondaryRef}
        className={`fixed z-20 top-[70px] left-[60px] xl:left-[80px] py-4 xl:py-8 xl:px-[17px] px-0 ${
          handleOpen ? "translate-x-0" : "translate-x-[-100%]"
        } transition-all duration-500 ease-in-out ${
          sidenavType === "white" ? "bg-white" : "bg-darkBg"
        } h-full w-[17.5%] rounded-md shadow-sidebarSecondary overflow-hidden`}
      >
        <h2
          className={`text-[20px] xl:text-[26px] ${currentColor.text} border-b border-[#D7D7D7] w-full xl:w-[183px] pb-[3.5px] mb-[14px] px-3 xl:px-[17px]`}
        >
          {links.title}
        </h2>
        <ul className="flex flex-col px-3 xl:px-[17px]">
          {links.navigationLinks?.map((item, index) => {
            return (
              <Link
                to={item.path}
                onClick={handleClose}
                key={index}
                className={`${
                  pathname === item.path
                    ? `${
                        sidenavType === "white" ? "text-black" : "text-formRgba"
                      }`
                    : `${
                        sidenavType === "white"
                          ? "text-formRgba hover:text-black"
                          : "text-white hover:text-formRgba"
                      }`
                } text-base mb-[2px] xl:mb-[8px] xl:text-[23px] font-medium cursor-pointer  duration-150 capitalize`}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
);
SidebarSecondary.propTypes = {
  links: PropTypes.shape({
    title: PropTypes.string.isRequired,
    navigationLinks: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  handleOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
SidebarSecondary.displayName = "SidebarSecondary";

export default SidebarSecondary;
