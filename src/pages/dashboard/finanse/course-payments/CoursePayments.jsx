import Navbar from "@/layout/Navbar";
import NavbarIcons from "@/Components/navbar-components/NavbarIcons";
import FinanceHeader from "@/Components/FinanceHeader";
import useCurrentColor from "@/hooks/useCurrentColor";

const CoursePayments = () => {
  const currentColor = useCurrentColor();
  return (
    <>
      <Navbar navHeading={"Kurs to'lovlari"}>
        <NavbarIcons />
      </Navbar>

      <div className={`${currentColor.bg} rounded-[8px] w-full px-[20px]`}>
        <FinanceHeader />
      </div>
    </>
  );
};

export default CoursePayments;
