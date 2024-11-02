import { addStudentValidation } from "@/CustomHooks/addStudentValidation";
import * as Yup from "yup";

export const addStudentToGroupSchema = (minDate, maxDate) =>
  Yup.object().shape({
    studentName: Yup.string().test({
      name: "studentName",
      test(value, ctx) {
        if (value === "Tanlang") {
          return ctx.createError({ message: "Studentlardan birini tanlang" });
        }
        return true;
      },
    }),
    addedDate: Yup.date()
      .typeError("Select a valid date")
      .nullable()
      .test({
        name: "addedDate",
        test(value, ctx) {
          if (value === null) {
            return ctx.createError({
              message: "Specify the date",
            });
          }
          const date = new Date(value);
          const validationStr = addStudentValidation(date, minDate, maxDate);

          if (validationStr) {
            return ctx.createError({ message: validationStr });
          }
          return true;
        },
      }),
  });
