import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, object, string } from "zod";
import { config } from "../../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
const createSessionSchema = object({
  email: string().min(1, "Email Is Required"),
  password: string().min(1, "Password Is Reqruired"),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;
function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const onSubmit = async (values: CreateSessionInput) => {
    try {
      await axios.post(`${config.SERVER_ENDPOINT}/api/sessions`, values, {
        withCredentials: true,
      });
      navigate("/");
      setLoginError(null);
    } catch (error: any) {
      setLoginError(error?.message);
    }
  };

  return (
    <>
      <p>{loginError}</p>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Email..."
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <Link to="/register">New User? Sign Up</Link>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginPage;
