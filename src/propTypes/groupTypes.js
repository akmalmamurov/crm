import PropTypes from "prop-types";

export const groupDataTypes = PropTypes.shape({
  courseName: PropTypes.string.isRequired,
  employerName: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  groupDays: PropTypes.arrayOf(PropTypes.string.isRequired),
  groupName: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  studentCount: PropTypes.number.isRequired,
});

export const groupTypesArray = PropTypes.arrayOf(groupDataTypes);
