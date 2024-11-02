import * as Yup from "yup";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";

import dayjs from "dayjs";

import FormCheckbox from "../form-components/FormCheckbox";
import AddFormButtons from "../AddFormButtons";
import FormInput from "../form-components/FormInput";
import FormPhoneNumber from "../form-components/FormPhoneNumber";
import FormSelect from "../form-components/FormSelect";
import FormDate from "../form-components/FormDate";
import { GET_EMPLOYERS } from "../../adapters/Queries/employer/employers";
import { CREATE_EMPLOYERS } from "../../adapters/Mutations/employer/createEmployers";
import {
  GET_EMPLOYERS_ROLES,
  GET_EMPLOYER_PERMISSION,
} from "@/adapters/Queries/employer/employerRoles";
import { addEmployerSchemaValidation } from "@/lib/validations/employerValidation";

const AddingEmployerForm = ({
  showEmployerForm,
  setShowEmployerForm,
  closeModal,
}) => {
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [employerPermission, setEmployerPermission] = useState({});
  const {
    data: employerRolesData,
    error,
    loading: employerRolesLoading,
  } = useQuery(GET_EMPLOYERS_ROLES);

  /* EMPLOYER GENDER SELECT DATA */
  const employerGenderSelectData = ["Tanlang", "Erkak", "Ayol"];

  /* EMPLOYER ROLE SELECT DATA */
  const employerRoleSelectData = employerRolesData?.employerRoles;
  const today = dayjs();

  // employer roles permission
  const GetEmployerPermission = () => {
    const client = useApolloClient();
    const { values } = useFormikContext();

    const getPermission = async (role) => {
      try {
        const { data, error, loading } = await client.query({
          query: GET_EMPLOYER_PERMISSION,
          variables: { role },
        });
        const permissionData = JSON.parse(data?.employerPermissions);
        setEmployerPermission(permissionData);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (values.employerRole !== "Tanlang") {
        getPermission(values.employerRole);
      }
    }, [values.employerRole]);
  };
  const [createEmployer, { loading, error: errorAvailability }] = useMutation(
    CREATE_EMPLOYERS,
    {
      refetchQueries: [
        {
          query: GET_EMPLOYERS,
        },
      ],
    }
  );

  const addingEmployerSettingHeadings = [
    "Yaratish",
    "Ko'rish",
    "Tahrirlash",
    "O'chirish",
    "Export qilish",
  ];
  const addingEmployerSettingSections = [
    {
      sectionTitle: "Lidlar",
      sectionData: [
        "leadCreating",
        "leadWatching",
        "leadEditing",
        "leadDeleting",
        "leadExporting",
      ],
    },
    {
      sectionTitle: "O'quvchilar",
      sectionData: [
        "studentCreating",
        "studentWatching",
        "studentEditing",
        "studentDeleting",
        "studentExporting",
      ],
    },
    {
      sectionTitle: "Guruhlar",
      sectionData: [
        "groupCreating",
        "groupWatching",
        "groupEditing",
        "groupDeleting",
        "groupExporting",
      ],
    },
    {
      sectionTitle: "Vazifalar",
      sectionData: [
        "taskCreating",
        "taskWatching",
        "taskEditing",
        "taskDeleting",
        "taskExporting",
      ],
    },
    {
      sectionTitle: "Xodimlar",
      sectionData: [
        "employerCreating",
        "employerWatching",
        "employerEditing",
        "employerDeleting",
        "employerExporting",
      ],
    },
  ];

  return (
    <div
      className={`${
        showEmployerForm
          ? "visible translate-x-0"
          : "invisible translate-x-full"
      } fixed z-10 flex gap-x-[22px] overflow-x-hidden top-[71px] right-0 drop-shadow-md duration-700 bg-white w-[95%] h-[90vh] rounded-l-[8px] py-6`}
    >
      <div className="w-[20%] ">
        <h2 className="text-[24px] leading-4 text-left px-[13px] text-black border-b border-grayThird pb-4 mb-[24px]">
          Yangi xodim qo&apos;shish
        </h2>

        <Formik
          initialValues={{
            employerName: "",
            phoneNumber: "",
            employerGender: "Tanlang",
            employerBirthday: dayjs(""),
            employerPassword: "",
            employerRole: "Tanlang",
          }}
          validationSchema={addEmployerSchemaValidation}
          onSubmit={async (values, { resetForm }) => {
            try {
              await createEmployer({
                variables: {
                  employerName: values.employerName,
                  employerPhone: `998 ${values.phoneNumber}`,
                  employerPosition: values.employerRole,
                  employerPassword: values.employerPassword,
                },
              });
              resetForm();
              setShowEmployerForm(false);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setValues,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormInput
                  labelValue={"F.I.O"}
                  type={"text"}
                  name={"employerName"}
                  autoComplete={"off"}
                  inputValue={values.employerName}
                  inputPlaceholder={"Enter fullname"}
                  onChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                <FormPhoneNumber
                  labelValue={"Telefon raqam"}
                  name={"phoneNumber"}
                  inputValue={values.phoneNumber}
                  numberFormat={"+998 ## ### ## ##"}
                  onChange={(onChangeValues) =>
                    setValues({ ...values, phoneNumber: onChangeValues.value })
                  }
                  validationError={errors}
                  validationTouch={touched}
                  className={`border border-formRgba  rounded-[7px] h-[32px] outline-none px-[10px] py-[7px] text-formRgba text-[13px] leading-[16px] tracking-[0.12px]`}
                  required
                />

                <FormSelect
                  labelValue={"Jinsi"}
                  name={"employerGender"}
                  selectedOption={values.employerGender}
                  selectOptionsData={employerGenderSelectData}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                />

                <FormDate
                  labelValue={"Tug'ilgan sanasi"}
                  value={values.employerBirthday}
                  name={"employerBirthday"}
                  onChange={(newValue) =>
                    setValues({ ...values, employerBirthday: newValue })
                  }
                  minDate={dayjs("1950-01-01")}
                  maxDate={today}
                  validationErrors={errors}
                  validationTouched={touched}
                />

                <FormInput
                  labelValue={"Parol"}
                  type={"password"}
                  name={"employerPassword"}
                  autoComplete={"off"}
                  inputValue={values.employerPassword}
                  inputPlaceholder={"Enter password"}
                  onChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />
                <FormSelect
                  labelValue={"Rol"}
                  name={"employerRole"}
                  selectedOption={values.employerRole}
                  selectOptionsData={employerRoleSelectData}
                  setSelectedOption={setValues}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />

                <AddFormButtons
                  title={"Yaratish"}
                  loading={loading}
                  closeModal={closeModal}
                />
                <GetEmployerPermission />
              </form>
            );
          }}
        </Formik>
      </div>

      <div className="w-[80%] px-6 pb-4">
        <h2 className="text-[24px] leading-[16px] tracking-[0.12px]">
          Adminstrator
        </h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-solid border-black">
              <th className="sr-only"></th>
              {addingEmployerSettingHeadings.map((heading, index) => (
                <th
                  key={index}
                  className="text-left py-4 font-normal text-[18px] leading-[16px] tracking-[0.12px]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {addingEmployerSettingSections.map((section, index) => {
              return (
                <tr key={index} className="border-b border-solid border-black">
                  <th className="py-4 font-normal text-left text-[18px] leading-[16px] tracking-[0.12px]">
                    {section.sectionTitle}
                  </th>
                  {section.sectionData.map((data, index) => {
                    return (
                      <td key={index} className="py-4">
                        <FormCheckbox
                          checkboxId={data}
                          checkboxName={data}
                          checkboxValue={checkboxValues}
                          setCheckboxValue={setCheckboxValues}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddingEmployerForm;
