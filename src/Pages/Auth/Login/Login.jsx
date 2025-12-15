import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchemas } from "../../../Lib/validationSchemas/AuthSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginForm } from "../../../Services/AuthSurvices";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { authContext } from "../../../context/AuthContext";

export default function Login() {
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchemas),
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
  async function submit(userData) {
    try {
      const { data } = await loginForm(userData);

      toast.success(data.message, {
        position: "top-center",
        theme: "colored",
      });
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/home");
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
          <p className="capitalize text-xl">sign in to your account</p>
        </div>
        <div className="form-inputs space-y-4">
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

          <div className="flex justify-between">
            <Button color="primary" type="submit" isLoading={isSubmitting}>
              Login
            </Button>
            <span className="items-end text-center">
              Don't have an account
              <Link to="/register" className="font-bold ms-2 underline">
                SignUp
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
