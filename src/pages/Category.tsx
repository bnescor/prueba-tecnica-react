import { columCategory } from "@/components/ColumCategory";
import ListTable from "@/components/ListTable";
import { useCategory } from "@/hooks/useActions";
import { Navigate, useParams } from "react-router-dom";

export default function Category() {
  const { page } = useParams();
  const currentPage = Number(page);

  if (isNaN(currentPage) || currentPage < 1) {
    return <Navigate to="/champions/1" replace />;
  }

  const { data: category, isLoading } = useCategory(currentPage);

  if (category && category.totalPages < currentPage) {
    return <Navigate to="/champions/1" replace />;
  }
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Categorias</h3>
      <ListTable
        columns={columCategory}
        data={category?.data || []}
        page={currentPage}
        totalPages={category?.totalPages || 1}
        Url="champions"
        items={category?.totalElements || 0}
        isloading={isLoading}
      />
    </div>
  );
}
