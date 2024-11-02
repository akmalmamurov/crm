import Sidebar from "@/layout/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Sidebar />
      <main className={`${"ml-[55px] xl:ml-[80px] mt-[70px] px-[20px] py-[30px]"} `}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
