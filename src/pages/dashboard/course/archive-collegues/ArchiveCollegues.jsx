import Navbar from "@/layout/Navbar";
import CourseMenusButtons from "@/Components/CourseMenusButtons";

const ArchiveCollegues = () => {
  return (
    <>
      <Navbar navHeading={"Arxivlangan xodimlar"} />

      <CourseMenusButtons />

      <h2 className="text-5xl">Archive Collegues</h2>
    </>
  );
};

export default ArchiveCollegues;
