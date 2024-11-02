import { memo, useMemo, useState, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";

import Navbar from "@/layout/Navbar";
import TablesTemplate from "@/Components/TablesTemplate";
import { GET_COURSES } from "@/adapters/Queries/course/courses";
import AddingCourseForm from "@/Components/Courses/AddingCourseForm";
import CourseMenusButtons from "@/Components/CourseMenusButtons";
import { DELETE_COURSE } from "@/adapters/Mutations/course/deleteCourse";
import UpdateCourseForm from "@/Components/Courses/UpdateCourseForm";
import { useTranslation } from "@/hooks";

const Courses = memo(() => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showCourseUpdateForm, setShowCourseUpdateForm] = useState(false);
  const [courseId, setCourseId] = useState("");
  const t = useTranslation();
  const courseTableHeadings = ["№", t.courseName, t.coursePrice];

  const dataExceptions = useMemo(
    () => ({
      dataException1: "courseDuration",
      dataException2: "courseDurationLesson",
    }),
    []
  );

  const handleCloseCourseForm = useCallback(() => {
    setShowCourseForm(false);
  }, []);

  const handleShowCourseUpdateForm = useCallback((id) => {
    setCourseId(id);
    setShowCourseUpdateForm(true);
  }, []);

  const handleCloseCourseUpdateForm = useCallback(() => {
    setShowCourseUpdateForm(false);
  }, []);

  const {
    loading: courseQueryLoading,
    error: courseQueryError,
    data: coursesData,
  } = useQuery(GET_COURSES);

  const [deleteCourse, { loading: courseDeleteLoading }] = useMutation(
    DELETE_COURSE,
    {
      update(cache, { data: { deleteCourse } }) {
        cache.modify({
          fields: {
            course(existingCourse = []) {
              return existingCourse.filter(
                (course) => course.courseId !== deleteCourse.courseId
              );
            },
          },
        });
      },
      refetchQueries: [{ query: GET_COURSES }],
    }
  );

  useMemo(() => {
    const handleClick = (e) => {
      const el = e.target.getAttribute("data-name");
      if (el === "overlay") {
        handleCloseCourseForm();
        handleCloseCourseUpdateForm();
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleCloseCourseForm, handleCloseCourseUpdateForm]);

  return (
    <>
      <Navbar
        navHeading={t.courses}
        buttonContent={t.addCourse}
        setShowForm={() => setShowCourseForm(!showCourseForm)}
      />

      <AddingCourseForm
        showCourseForm={showCourseForm}
        setShowCourseForm={handleCloseCourseForm}
      />

      <UpdateCourseForm
        showAddForm={showCourseUpdateForm}
        closeModal={handleCloseCourseUpdateForm}
        courseId={courseId}
      />

      <CourseMenusButtons />

      <TablesTemplate
        loading={courseQueryLoading}
        headings={courseTableHeadings}
        sections={coursesData?.courses}
        dataQueryError={courseQueryError}
        deleteItem={deleteCourse}
        deleteLoading={courseDeleteLoading}
        idFieldName={"courseId"}
        {...dataExceptions}
        moreBtnExist={true}
        setShowUpdateFrom={handleShowCourseUpdateForm}
      />
    </>
  );
});

Courses.displayName = "Courses";
export default Courses;
