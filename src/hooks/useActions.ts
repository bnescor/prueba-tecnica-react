import { useQuery } from "@tanstack/react-query";
import { getActions } from "../api/actions.api";

export interface categoryData {
  color: string;
  createdAt: Date;
  id: string;
  icon: string;
  description: string;
  name: string;
  status: number;
}
interface CategoryParams {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  data: categoryData[];
}

export const useCategory = (page: number) =>
  useQuery<CategoryParams>({
    queryKey: ["category", page],
    queryFn: () => getActions(page),
  });
