import { Formik } from "formik";
import * as Yup from "yup";

import FormInput from "../form-components/FormInput";
import AddFormButtons from "../AddFormButtons";
import AddFormWrapper from "../AddFormWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ROOM_BY_ID } from "../../adapters/Queries/room/roomById";
import { UPDATE_ROOM } from "../../adapters/Mutations/room/updateRoom";
import { GET_ROOMS } from "../../adapters/Queries/room/rooms";

const UpdateRoomForm = ({ showRoomForm, closeModal, roomId }) => {
  // get room by id
  const {
    data: roomData,
    error: roomError,
    loading: roomLoading,
  } = useQuery(GET_ROOM_BY_ID, {
    variables: {
      id: roomId,
    },
  });

  console.log(roomData)
  // update room
  const [updateRoom, { loading }] = useMutation(UPDATE_ROOM, {
    refetchQueries: [
      {
        query: GET_ROOMS,
      },
    ],
  });

  const UpdateRoomScheme = Yup.object({
    name: Yup.string()
      .min(1, "It is too short, at least 4 characters")
      .max(50, "It is too long"),
  });
  return (
    <AddFormWrapper formHeading={"Xonani yangilash"} showForm={showRoomForm}>
      {roomLoading && (
        <div className="w-full flex items-center justify-center h-full">
          <h2 className="text-4xl">Loading...</h2>
        </div>
      )}
      {roomData?.roomById && (
        <Formik
          initialValues={{
            name: roomData?.roomById?.roomName,
          }}
          validationSchema={UpdateRoomScheme}
          onSubmit={async (values, {resetForm}) => {
            try {
              await updateRoom({
                variables: {
                  id: roomId,
                  name: values.name,
                },
              });
              closeModal()
              resetForm()
            } catch (error) {
                console.log(error)
            }
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormInput
                  labelValue={"Nomi"}
                  type={"text"}
                  name={"name"}
                  autoComplete={"off"}
                  inputValue={values.name}
                  inputPlaceholder={"Enter room title"}
                  onChange={handleChange}
                  validationError={errors}
                  validationTouch={touched}
                  required
                />
                <AddFormButtons title={"Yangilash"} loading={loading} closeModal={closeModal} />
              </form>
            );
          }}
        </Formik>
      )}
    </AddFormWrapper>
  );
};

export default UpdateRoomForm;
