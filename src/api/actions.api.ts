import { apiCore } from "./axios";

export const getActions = async (page: number, size = 10) => {
  const res = await apiCore.get(
    `/api/v1/actions/admin-list?pageNumber=${page}&pageSize=${size}`
  );
  return res.data.data;
};
