import useSWR from "swr";
import { config } from "../../utils/constants";
import fetcher from "../../utils/fetcher";
import getGoogleOAuthURL from "../../utils/getGoogleUrl";

interface User {
  _id: string;
  email: string;
  name: string;
  picture: string;
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
    return (
      <div>
        <div>Welcome! {data.name}</div>
        <img src={data?.picture} alt=""></img>
      </div>
    );
  }
  return (
    <div className="{styles.container}">
      <a href={getGoogleOAuthURL()}>Login With Google</a>
      Please Login
    </div>
  );
};

export default Home;
