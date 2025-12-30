import { apiAuth } from "./axios";

interface LoginPayload {
  username: string;
  password: string;
}

export const loginRequest = async (data: LoginPayload) => {
  const res = await apiAuth.post("/api/Authentication/Login", data);
  return res.data;
};
