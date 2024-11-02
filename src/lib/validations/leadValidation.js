import * as Yup from "yup";

export const addingLeadValidationSchema = Yup.object().shape({
  leadName: Yup.string()
    .min(3, "At least 3 characters")
    .required("The field is required"),
  leadPhone: Yup.string()
    .min(9, "Enter correct phone")
    .required("The field is required"),
  courseName: Yup.string().test({
    name: "courseName",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Select one of courses" });
      }
      return true;
    },
  }),
});
