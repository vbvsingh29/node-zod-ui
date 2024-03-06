import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, object, string } from "zod";
import { config } from "../../utils/constants";
import { useState } from "react";

const createUserSchema = object({
  name: string().min(1, "Name is Required"),
  password: string()
    .min(1, "Password is Required")
    .min(6, "Password too short , should be greater than 6 chars"),
  passwordConfirmation: string().min(1, "Confirm Password is required"),
  email: string().min(1, "Email is Required").email("Email is Not valid"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password dont match",
  path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;
function RegisterPage() {
  const [registerError, setRegisterError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (values: CreateUserInput) => {
    try {
      await axios.post(`${config.SERVER_ENDPOINT}/api/users`, values);
    } catch (error: any) {
      setRegisterError(error?.message);
    }
  };
  console.log({ errors });
  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name.."
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Email..."
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className="form-element">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="confirm Password..."
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default RegisterPage;
