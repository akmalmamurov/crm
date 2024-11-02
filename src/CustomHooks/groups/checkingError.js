// CHECKING TEACHER AND ROOM BUSYNESS

export const checkingTeacherAndRoomBusyness = (formRef, error) => {
  let teacherAndRoomBusyness;
  let formValues = formRef?.current?.values;
  // CHECKING WHETHER TEACHER AND ROOM BOOLEAN VALUES ARE TRUE
  const teacherBooleanValue = error?.message.includes("teacher: true");
  const roomBooleanValue = error?.message.includes("room: true");

  // CHECKING TEACHER AND ROOM BUSYNESS IN THE SPECIFIC TIME
  if (teacherBooleanValue && roomBooleanValue) {
    teacherAndRoomBusyness = `Bu vaqtlarda teacher:${formValues.teacherTypes} and room: ${formValues.roomTypes} band `;
  } else if (teacherBooleanValue) {
    teacherAndRoomBusyness = `Bu vaqtlarda faqat teacher: ${formValues.teacherTypes} band`;
  } else if (roomBooleanValue) {
    teacherAndRoomBusyness = `Bu vaqtlarda faqat room: ${formValues.roomTypes} band`;
  } else {
    teacherAndRoomBusyness = error?.message;
  }
  return teacherAndRoomBusyness;
};
