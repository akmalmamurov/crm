import { useMemo} from "react";
import { useQuery } from "@apollo/client";

import Navbar from "@/layout/Navbar";
import TablesTemplate from "@/Components/TablesTemplate";
import { GET_EMPLOYERS } from "@/adapters/Queries/employer/employers";
import AddingEmployerForm from "@/Components/Employers/AddingEmployerForm";
import CourseMenusButtons from "@/Components/CourseMenusButtons";
import { useModal, useTranslation } from "@/hooks";

const Employers = () => {
  const { isOpen: showEmployerForm, toggle: toggleEmployerForm } = useModal();
  const t = useTranslation();

  const employerHeadings = useMemo(
    () => [["№"], t["fio"], t["position"], t["phoneNumber"]],
    []
  );

  const {
    loading: employerLoading,
    error: employerQueryError,
    data: employerData,
  } = useQuery(GET_EMPLOYERS);

  const dataExceptions = useMemo(
    () => ({
      dataException1: "employerBirthday",
      dataException2: "employerGender",
      dataException3: "employerUseLang",
      dataException4: "employerCreatedAt",
      dataException5: "employerDeletedAt",
      dataException6: "employerBranchId",
    }),
    []
  );

  return (
    <>
      <Navbar
        navHeading={t.employees}
        buttonContent={t.addemployee}
        setShowForm={toggleEmployerForm}
      />

      <AddingEmployerForm
        showEmployerForm={showEmployerForm}
        setShowEmployerForm={toggleEmployerForm}
      />

      <CourseMenusButtons />

      <TablesTemplate
        loading={employerLoading}
        error={employerQueryError}
        sections={employerData?.employers}
        headings={employerHeadings}
        idFieldName={"employerId"}
        {...dataExceptions}
        moreBtnExist={true}
      />
    </>
  );
};

export default Employers;
