import * as Yup from "yup";

export const addFunnelColumnScheme = Yup.object({
  name: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("This field is required"),
  funnelType: Yup.string().test({
    name: "funnelType",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),
  colorType: Yup.string().test({
    name: "colorType",
    test(value, ctx) {
      if (value === "Tanlang") {
        return ctx.createError({ message: "Please, select one of them" });
      }
      return true;
    },
  }),
});
