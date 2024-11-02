import * as Yup from "yup";

export const addEmployerSchemaValidation = Yup.object().shape({
  /* EMPLOYER NAME VALIDATION FORM */
  employerName: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("The field is required"),

  /* EMPLOYER PHONE NUMBER VALIDATION FORM */
  phoneNumber: Yup.string()
    .min(9, "Enter phone number properly")
    .required("The field is required"),

  /* EMPLOYER GENDER VALIDATION FORM */
  employerGender: Yup.string().optional(),
  // .test({
  //   name: "employerGender",
  //   test(value, ctx) {
  //     if (value === "Tanlang") {
  //       return ctx.createError({ message: "Select one of them" });
  //     }
  //     return true;
  //   },
  // }),

  /* EMPLOYER BIRTHDAY DATE VALIDATION FORM */
  employerBirthday: Yup.date()
    .nullable()
    .typeError(null)
    .test({
      name: "employerBirthday",
      test(value, ctx) {
        const now = new Date();
        const date = new Date(value);
        if (value === null) {
          return true;
        }
        if (
          date.getFullYear() >= now.getFullYear() ||
          date.getFullYear() < 1950
        ) {
          return ctx.createError({ message: "Select a valid date" });
        }
        return true;
      },
    }),

  /* EMPLOYER PASSWORD VALIDATION FORM */
  employerPassword: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("The field is required"),

  /* EMPLOYER ROLE VALIDATION FORM */
  employerRole: Yup.string().test({
    name: "employerRole",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Select one of them" });
      }
      return true;
    },
  }),
});
