import { Input } from "@heroui/input";
import { Select, SelectItem, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { regSchemas } from "../../../Lib/validationSchemas/AuthSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "../../../Services/AuthSurvices";
import { toast } from "react-toastify";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [showRepassword, setshowRepassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(regSchemas),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });
  async function submit(data) {
    try {
      const response = await RegisterForm(data);

      toast.success(response.data.message, {
        position: "top-center",
        theme: "colored",
      });
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        theme: "colored",
      });
    }
  }

  return (
    <>
      <form
        noValidate
        className="w-full max-w-4xl space-y-5 p-3"
        onSubmit={handleSubmit(submit)}
      >
        <div className="form-header text-center">
          <h1 className="text-4xl font-bold mb-3">welcome to Hosny app 👋</h1>
          <p className="capitalize text-xl">sign up to your account</p>
        </div>
        <div className="form-inputs space-y-4">
          <Input
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            label="Name"
            {...register("name")}
            isRequired
            variant="faded"
            type="text"
          />
          <Input
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            label="Email"
            {...register("email")}
            isRequired
            variant="faded"
            type="email"
          />
          <Input
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            label="Password"
            {...register("password")}
            isRequired
            variant="faded"
            type={showPassword ? "text" : "Password"}
            endContent={
              showPassword ? (
                <IoIosEyeOff
                  className="text-2xl"
                  onClick={() => {
                    setshowPassword(!showPassword);
                  }}
                />
              ) : (
                <IoIosEye
                  className="text-2xl"
                  onClick={() => {
                    setshowPassword(!showPassword);
                  }}
                />
              )
            }
          />
          <Input
            isInvalid={Boolean(errors.rePassword)}
            errorMessage={errors.rePassword?.message}
            label="RePassword"
            {...register("rePassword")}
            isRequired
            variant="faded"
            type={showRepassword ? "text" : "Password"}
            endContent={
              showRepassword ? (
                <IoIosEyeOff
                  className="text-2xl"
                  onClick={() => {
                    setshowRepassword(!showRepassword);
                  }}
                />
              ) : (
                <IoIosEye
                  className="text-2xl"
                  onClick={() => {
                    setshowRepassword(!showRepassword);
                  }}
                />
              )
            }
          />
          <div className="flex items-center gap-2">
            <Input
              {...register("dateOfBirth")}
              isRequired
              label="Birth date"
              type="date"
              isInvalid={Boolean(errors.dateOfBirth)}
              errorMessage={errors.dateOfBirth?.message}
            />
            <Select
              {...register("gender")}
              label="Gender"
              placeholder="Select Your Gender"
              isRequired
              isInvalid={Boolean(errors.gender)}
              errorMessage={errors.gender?.message}
            >
              <SelectItem key="male">male</SelectItem>
              <SelectItem key="female">female</SelectItem>
            </Select>
          </div>
          <div className="flex justify-between">
            <Button color="primary" type="submit" isLoading={isSubmitting}>
              SignUp
            </Button>
            <span className="items-end text-center">
              Already have an account
              <Link to="/login" className="font-bold ms-2 underline">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
