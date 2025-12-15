import * as z from "zod";
export const regSchemas = z
  .object({
    name: z
      .string()
      .nonempty("Name is Required")
      .min(5, "Name must be at least 5 characters")
      .max(12, "Name must be no exceed 10 characters"),
    email: z.email("email is invalid").nonempty("email is Required"),
    password: z
      .string()
      .nonempty("password is Required")
      .min(8, "password must be at least 8 characters")
      .max(50, "password must not exceed 50 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)"
      ),
    rePassword: z.string().nonempty("repassword is Required"),
    dateOfBirth: z.string().refine(
      (date) => {
        const cutrrent = new Date().getFullYear();
        const birthDate = new Date(date).getFullYear();
        const age = cutrrent - birthDate;
        return age >= 18;
      },
      { message: "Age must be atleast 18 years old" }
    ),
    gender: z.string().nonempty("gender is Required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "password must match",
  });

export const loginSchemas = z.object({
  email: z.email("email is invalid").nonempty("email is Required"),
  password: z
    .string()
    .nonempty("password is Required")
    .min(8, "password must be at least 8 characters")
    .max(50, "password must not exceed 50 characters")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)"
    ),
});
