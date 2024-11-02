import * as Yup from "yup";

export const addCostScheme = Yup.object({
  // STUDENT NAME
  name: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("This field is required"),

  // STUDENT GENDER TYPE
  costType: Yup.string().test({
    name: "costType",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),

  // Payment validation
  price: Yup.string()
    .min(4, "Please, at least 4 numbers")
    .required("The field is required"),
  // STUDENT BIRTHDAY DATE
  slectedDate: Yup.date()
    .typeError(null)
    .optional()
    .nullable()
    .test({
      name: "slectedDate",
      test(value, ctx) {
        const date = new Date(value);

        if (value === null) {
          return true;
        }
        if (date.getFullYear() > 2024 || date.getFullYear() < 1900) {
          return ctx.createError({
            message: "Select a year till 2024",
          });
        }
        return true;
      },
    }),
});
