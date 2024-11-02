import React from "react";
import TablesTemplate from "../TablesTemplate";
import { useQuery } from "@apollo/client";
import { STUDENT_GROUP } from "../../adapters/Queries/student/studentGroup";

const StudentGroup = ({ studentId }) => {
  const studentGroupHeadings = [
    "ID",
    "Guruh nomi",
    "O'qituvchi",
    "Kurslar",
    "Xonalar",
  ];

  const {
    data: studentGroupData,
    loading: studentGroupLoading,
    error: studentGroupError,
  } = useQuery(STUDENT_GROUP, {
    variables: {
      id: studentId,
    },
  });

  console.log(studentGroupData?.studentGroups);

  return (
    <TablesTemplate
      loading={studentGroupLoading}
      dataQueryError={studentGroupError}
      headings={studentGroupHeadings}
      sections={studentGroupData?.studentGroups}
    />
  );
};

export default StudentGroup;
