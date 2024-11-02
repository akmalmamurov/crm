import PropTypes from "prop-types";
import { groupTypesArray } from "./groupTypes";

export const calendarDataObject = PropTypes.shape({
  date: PropTypes.string.isRequired,
  groups: groupTypesArray,
});

export const calendarDataProps = {
  calendarData: PropTypes.arrayOf(calendarDataObject),
};
