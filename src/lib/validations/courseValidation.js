import * as Yup from "yup";

export const addCourseSchemaValidation = Yup.object().shape({
  courseName: Yup.string()
    .required("The field is required")
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long, at most 50 characters"),
  coursePrice: Yup.number()
    .required("The field is required")
    .typeError("The field is required")
    .min(10000, "It is too short, at least 5 digits"),
  courseDuration: Yup.string().test({
    name: "courseDuration",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),
  courseLessonDuration: Yup.date()
    .typeError("Select a valid time")
    .nullable()
    .test({
      name: "courseLessonDuration",
      test(value, ctx) {
        const date = new Date(value);
        if (value === null) {
          return ctx.createError({ message: "Specify the time" });
        }
        if (date.getHours() === 0 && date.getMinutes() === 0) {
          return ctx.createError({ message: "Specify the time" });
        }
        return true;
      },
    }),
});
