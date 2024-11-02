import * as Yup from "yup";

export const addGroupSchemaValidation = Yup.object({
  // GROUP NAME VALIDATION FORM
  groupName: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("This field is required"),

  // COURSE TYPES VALIDATION FORM
  courseTypes: Yup.string().test({
    name: "courseTypes",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),

  // TEACHER TYPES VALIDATION FORM
  teacherTypes: Yup.string().test({
    name: "teacherTypes",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),

  // LESSON START TIME VALIDATION FORM
  lessonStartTime: Yup.date()
    .typeError("Select a valid time")
    .nullable()
    .test({
      name: "lessonStartTime",
      test(value, ctx) {
        const date = new Date(value);

        if (value === null) {
          return ctx.createError({ message: "Select a valid time" });
        }
        if (date.getHours() === 0 && date.getMinutes() === 0) {
          return ctx.createError({
            message: "Specify the time",
          });
        }
        return true;
      },
    }),

  // LESSON END TIME VALIDATION FORM
  lessonEndTime: Yup.date()
    .typeError("Select a valid time")
    .nullable()
    .test({
      name: "lessonEndTime",
      test(value, ctx) {
        const date = new Date(value);

        if (value === null) {
          return ctx.createError({ message: "Select a valid time" });
        }
        if (date.getHours() === 0 && date.getMinutes() === 0) {
          return ctx.createError({
            message: "Specify the time",
          });
        }
        return true;
      },
    }),

  // GROUP DATE START VALIDATION FORM
  groupDateStart: Yup.date()
    .typeError("Select a valid date")
    .nullable()
    .test({
      name: "groupDateStart",
      test(value, ctx) {
        if (value === null) {
          return ctx.createError({ message: "Specify the time" });
        }
        const date = new Date(value);
        if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
          return ctx.createError({
            message: "Select a year from 2000 to 2100",
          });
        }
        return true;
      },
    }),

  // GROUP DATE END VALIDATION FORM
  groupDateEnd: Yup.date()
    .typeError("Select a valid date")
    .nullable()
    .test({
      name: "groupDateEnd",
      test(value, ctx) {
        const date = new Date(value);
        if (value === null) {
          return ctx.createError({ message: "Specify the time" });
        }
        if (date.getFullYear() > 2100 || date.getFullYear() < 2000) {
          return ctx.createError({
            message: "Select a year from 2000 to 2100",
          });
        }
        return true;
      },
    }),

  // DAY TYPES VALIDATION FORM
  dayTypes: Yup.string().test({
    name: "dayTypes",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),

  // ROOM TYPES VALIDATION FORM
  roomTypes: Yup.string().test({
    name: "roomTypes",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),

  // PAYMENT METHODS VALIDATION FORM
  // paymentMethods: Yup.string().test({
  //   name: "paymentMethods",
  //   test(value, ctx) {
  //     if (value === "Tanlang") {
  //       return ctx.createError({ message: "Please, select one of them" });
  //     }
  //     return true;
  //   },
  // }),
});
