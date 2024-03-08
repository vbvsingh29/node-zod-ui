import useSWR from "swr";
import { config } from "../../utils/constants";
import fetcher from "../../utils/fetcher";

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: number;
  iat: number;
  exp: number;
}
const Home = () => {
  const { data } = useSWR<User>(`${config.SERVER_ENDPOINT}/api/me`, fetcher);
  if (data) {
    return <div>Welcome! {data.name}</div>;
  }
  return <div className="{styles.container}">Please Login</div>;
};

export default Home;
