import axios from "axios";
import useAuthStore from "../store/Auth";

const refreshTokenClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const { tokens } = useAuthStore.getState().getAuth();
  const { resetAuth, setTokens } = useAuthStore.getState();
  try {
    console.log("fetching a new token...");
    const { data } = await refreshTokenClient.post("/auth/refreshToken", {
      refreshToken: tokens?.refreshToken,
    });
    const newToken = data?.result?.token?.token;

    if (!newToken) {
      resetAuth();
      console.log("not a vaild token --user-log-out");
    } else {
      setTokens(newToken, tokens?.refreshToken);
      console.log("new token has been set");
    }

    return newToken;
  } catch (e) {
    resetAuth();
    console.log("refreshToken error --user-log-out", e);
  }
};

export default refreshToken;
