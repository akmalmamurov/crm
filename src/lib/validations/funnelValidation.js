import * as Yup from "yup";

export const addFunnelValidationScheme = Yup.object({
  funnelName: Yup.string()
    .min(4, "It is too short, at least 4 characters")
    .max(50, "It is too long")
    .required("This field is required"),
});
