import { useState } from "react";
import Navbar from "@/layout/Navbar";
import Profile from "@/Components/Settigns/Profile";
import Filial from "@/Components/Settigns/Filial";
import DarkLightModeSwitcher from "@/Components/DarkLightModeSwitcher";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "@/Redux/slices/themeSlices";

const PrivateSetting = () => {
  const [navTitle, setNavTitle] = useState("Profil");
  const navText = ["Profil", "Filial"];
  const dispatch = useDispatch();
  return (
    <>
      <Navbar navHeading={`Sozlamalar/${navTitle}`} />
      <div className="group-btns mb-[28px] ">
        {navText.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setNavTitle(item)}
            className={`${
              navTitle === item
                ? "bg-blueTifany text-white "
                : "bg-white text-black"
            } mr-[10px] px-[8px] py-[10px] text-[15px] font-normal text-center leading-[18px] tracking-[-0.23px uppercase rounded-[6px] duration-300`}
          >
            {item}
          </button>
        ))}
        <span onClick={() => dispatch(toggleDarkMode())}>
          <DarkLightModeSwitcher />
        </span>
      </div>

      {navTitle === "Profil" ? <Profile /> : <Filial />}
    </>
  );
};

export default PrivateSetting;
