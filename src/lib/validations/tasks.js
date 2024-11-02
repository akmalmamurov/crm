import * as Yup from "yup";

export const addTaskScheme = Yup.object({
  taskTitle: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("This field is required"),
  taskBody: Yup.string()
    .min(10, "It is too short, at least 10 characters")
    .max(100, "It is too long")
    .required("This field is required"),
  employerType: Yup.string().test({
    name: "employerType",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),
  taskType: Yup.string().test({
    name: "taskType",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),
  taskEndDate: Yup.date()
    .typeError(null)
    .optional()
    .nullable()
    .test({
      name: "taskEndDate",
      test(value, ctx) {
        const date = new Date(value);
        if (value === null) {
          return true;
        }
        if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
          return ctx.createError({
            message: "Select a year from 2000 to 2100",
          });
        }
        return true;
      },
    }),
});

export const addTaskMiniFormSchema = Yup.object({
  taskTitle: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("This field is required"),
  taskBody: Yup.string()
    .min(10, "It is too short, at least 10 characters")
    .max(100, "It is too long")
    .required("This field is required"),
  employerType: Yup.string().test({
    name: "employerType",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),
});
