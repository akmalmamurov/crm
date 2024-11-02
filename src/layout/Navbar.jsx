import { useDispatch, useSelector } from "react-redux";
import Buttons from "@/Components/navbar-components/NavbarButtons";
import NavbarIcons from "@/Components/navbar-components/NavbarIcons";
import useCurrentColor from "@/hooks/useCurrentColor";
import { memo } from "react";
import { setLanguage } from "@/Redux/slices/languageSlices";

const Navbar = memo((props) => {
  const { navHeading, buttonContent, setShowForm, searchIcon, docIcon } = props;
  const currentColor = useCurrentColor();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.language);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  return (
    <>
      <header
        className={`${currentColor.bg} fixed top-0 right-0 left-0 h-[70px] z-20 ml-14 xl:ml-20 px-5 flex items-center justify-between`}
      >
        <h2
          className={`text-[24px] xl:text-[26px] leading-8 font-medium ${currentColor.text}`}
        >
          {navHeading}
        </h2>
        <div className="flex items-center">
          <select
            className="text-[15px] xl:text-[16px] px-2 font-medium mr-4 h-8 rounded-sm bg-blueTifany text-white"
            value={currentLanguage}
            onChange={handleLanguageChange}
          >
            <option value="uz">Uz</option>
            <option value="ru">Ru</option>
            <option value="en">En</option>
            <option value="kr">Uz Kirill</option>
          </select>
          {buttonContent && (
            <Buttons buttonContent={buttonContent} setShowForm={setShowForm} />
          )}
          <NavbarIcons
            searchIcon={searchIcon}
            docIcon={docIcon}
            currentColor={currentColor}
          />
        </div>
      </header>
    </>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
