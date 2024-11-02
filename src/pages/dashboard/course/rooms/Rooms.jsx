import { memo, useCallback, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Navbar from "@/layout/Navbar";
import TablesTemplate from "@/Components/TablesTemplate";
import AddingRoomsForm from "@/Components/Rooms/AddingRoomsForm";
import CourseMenusButtons from "@/Components/CourseMenusButtons";
import UpdateRoomForm from "@/Components/Rooms/UpdateRoomForm";
import { GET_ROOMS } from "@/adapters/Queries/room/rooms";
import { DELETE_ROOM } from "@/adapters/Mutations/room/deleteRoom";

const Rooms = memo(() => {
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showUpdateRoomForm, setShowUpdateRoomForm] = useState(false);
  const [roomId, setRoomId] = useState("");
  const roomHeadings = ["ID", "Xona nomi"];

  // Get rooms
  const {
    loading: roomLoading,
    error: roomQueryError,
    data: roomData,
  } = useQuery(GET_ROOMS);

  // Delete room
  const [deleteRoom, { loading: deleteRoomLoading }] = useMutation(
    DELETE_ROOM,
    {
      update(cache, { data: { deleteRoom } }) {
        cache.modify({
          fields: {
            room(existingRoom = []) {
              return existingRoom.filter(
                (room) => room.roomId !== deleteRoom.roomId
              );
            },
          },
        });
      },
      refetchQueries: [{ query: GET_ROOMS }],
    }
  );



  const handleCloseRoomForm = useCallback(() => {
    setShowRoomForm(false);
  }, []);

  const handleShowRoomUpdateForm = useCallback((id) => {
    setRoomId(id);
    setShowUpdateRoomForm(true);
  }, []);

  const handleCloseRoomUpdateForm = useCallback(() => {
    setShowUpdateRoomForm(false);
  }, []);

  // Close forms when clicking outside
  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");
    if (el === "overlay") {
      handleCloseRoomForm();
      handleCloseRoomUpdateForm();
    }
  });

  return (
    <>
      <Navbar
        navHeading={"Xonalar"}
        buttonContent={"Xona qo'shish"}
        setShowForm={() => setShowRoomForm(!showRoomForm)}
      />

      <AddingRoomsForm
        showRoomsForm={showRoomForm}
        setShowRoomForm={handleCloseRoomForm}
      />

      <UpdateRoomForm
        showRoomForm={showUpdateRoomForm}
        closeModal={handleCloseRoomUpdateForm}
        roomId={roomId}
      />

      <CourseMenusButtons />

      <TablesTemplate
        loading={roomLoading}
        error={roomQueryError}
        deleteItem={deleteRoom}
        deleteLoading={deleteRoomLoading}
        sections={roomData?.rooms}
        headings={roomHeadings}
        idFieldName={"roomId"}
        moreBtnExist={true}
        setShowUpdateFrom={handleShowRoomUpdateForm}
      />
    </>
  );
});

Rooms.displayName = "Rooms";
export default Rooms;
