import { useRef, useEffect, useState } from "react";
import FormInput from "../form-components/FormInput";
import { useMutation } from "@apollo/client";
import { CREATE_ROOMS } from "../../adapters/Mutations/room/createRooms";
import AddFormButtons from "../AddFormButtons";
import AddFormWrapper from "../AddFormWrapper";
import { GET_ROOMS } from "../../adapters/Queries/room/rooms";
import { Formik } from "formik";
import * as Yup from "yup";
import ToastWarning from "../ToastWarning";

const AddingRoomsForm = ({ showRoomsForm, setShowRoomForm }) => {
  const [showWarningToast, setShowWarningToast] = useState(false);

  const roomRef = useRef(null);

  const [createRoom, { loading, error: errorAvailability }] = useMutation(
    CREATE_ROOMS,
    {
      refetchQueries: [
        {
          query: GET_ROOMS,
        },
      ],
    }
  );

  useEffect(() => {
    if (showRoomsForm && roomRef.current) {
      roomRef.current.focus();
    }
  }, [showRoomsForm]);

  const addRoomSchemaValidation = Yup.object().shape({
    // ROOM NAME VALIDATION FORM
    roomName: Yup.string()
      .required("The field is required")
      .min(3, "It is too short, at least 3 characters")
      .max(50, "It is too long"),
  });

  return (
    <AddFormWrapper showForm={showRoomsForm} formHeading={"Xonani yaratish"}>
      {/* DATA AVAILABILITY ERROR TOAST */}
      <ToastWarning
        errorAvailability={errorAvailability}
        showWarningToast={showWarningToast}
        setShowWarningToast={setShowWarningToast}
      />

      {/* ROOM FORM */}
      <Formik
        initialValues={{
          roomName: "",
        }}
        validationSchema={addRoomSchemaValidation}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createRoom({
              variables: {
                roomName: values.roomName,
              },
            });
            resetForm();
            setShowRoomForm(false);
          } catch (error) {
            if (error && error?.message) {
              setShowWarningToast(true);
            }
            console.log(error);
          }

          setTimeout(() => {
            setShowWarningToast(false);
          }, 4000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                autoComplete={"off"}
                labelValue={"Xona nomi"}
                type={"text"}
                name={"roomName"}
                inputValue={values.roomName}
                placeholder={"Enter room name"}
                roomRef={roomRef}
                onChange={handleChange}
                onBlur={handleBlur}
                validationError={errors}
                validationTouch={touched}
              />

              {/* buttons */}
              <AddFormButtons
                loading={loading}
                closeModal={() => setShowRoomForm(false)}
                title={"Yaratish"}
              />
            </form>
          );
        }}
      </Formik>
    </AddFormWrapper>
  );
};

export default AddingRoomsForm;
