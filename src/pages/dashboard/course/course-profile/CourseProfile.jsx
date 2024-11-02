import { useState } from "react";
import Navbar from "@/layout/Navbar";
import ProfileCard from "@/Components/ProfileCard";
import ProfileIcon from "@/assets/icons/course-profile-icon.svg";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "@/adapters/Queries/course/courses";
import { GET_COURSE_BY_ID } from "@/adapters/Queries/course/courseById";

const CourseProfile = () => {
  const { id } = useParams();
  const [activeButton, setActiveButton] = useState("Guruh");

  const courseProfile = useParams();

  const {
    data: courseData,
    error: courseError,
    loading: courseLoading
  } = useQuery(GET_COURSE_BY_ID, {
    variables: {
      id: id,
    },
  });

  console.log(courseData);
  let singleCourseData = courseData?.coursById;

  const hours = Math.floor(courseData?.coursById?.courseDurationLesson / 60);
  const minutes = `${courseData?.coursById?.courseDurationLesson - hours * 60}`
  singleCourseData = {
    ...singleCourseData,
    coursePrice: `${singleCourseData?.coursePrice}`,
    courseDuration: `${singleCourseData?.courseDuration} oy`,
    courseDurationLesson: `${hours} soat ${minutes} daqiqa`,
  };
 

  const courseProfileCardListInfo = [
    "Narxi",
    "Kurs davomiyligi",
    "Dars davomiyligi",
  ];

  const necessaryCourseProfileCardInfo = [
    "coursePrice",
    "courseDuration",
    "courseDurationLesson",
  ];

  const courseProfileButtons = ["Guruh", "Online test", "Tarix"];
  return (
    <>
      <Navbar navHeading={"Kurs profili"} />

      {/* GROUP PROFILE CARD BODY */}
      <section className="group-profile-body">
        <div className="flex items-start gap-[30px]">
          <ProfileCard
            loading={courseLoading}
            error={courseError}
            imageSource={ProfileIcon}
            imageAlt={"Course profile course icon"}
            informationAbout={"Kurs ma'lumotlari"}
            cardTitle={singleCourseData?.courseName}
            cardListInfoTitle={courseProfileCardListInfo}
            neccessaryProfileCardInfo={necessaryCourseProfileCardInfo}
            profileInfo={singleCourseData}
          />
          <div className="flex flex-col flex-grow">
            {/* BUTTONS */}
            <div className="flex gap-[10px] mb-[20px]">
              {/* {courseProfileButtons.map((button, index) => {
                return (
                  <button
                    onClick={() => setActiveButton(button)}
                    key={index}
                    type="button"
                    className={`${
                      activeButton === button
                        ? "bg-blueTifany text-white"
                        : "bg-lightestBlack text-black hover:bg-lighterBlack duration-200"
                    } px-[12px] py-[8px] rounded-[6px] cursor-pointer text-[15px] leading-[17.9px] tracking-[-0.23px]  font-normal `}
                  >
                    {button}
                  </button>
                );
              })} */}
            </div>

            {/* TABLE INFORMATION */}
            {/* <TablesTemplate
                  headings={groupProfileHeadings}
                  sections={groupProfileSections}
                  tableButtons={tableButtons}
                /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseProfile;
