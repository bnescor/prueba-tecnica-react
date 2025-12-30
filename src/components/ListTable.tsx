import { ChevronLeft, ChevronRight } from "lucide-react";
import { DataTable } from "./DataTable";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import TableSkeleto from "./TableSkelto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modalcategory from "./ModalCategory";

interface ListTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  totalPages: number;
  Url: string;
  isloading: boolean;
  items: number;
}

export default function ListTable<TData, TValue>({
  data,
  columns,
  page,
  items,
  totalPages,
  Url,
  isloading,
}: ListTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(page);
  const [tempPage, setTempPage] = useState(page);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setTempPage(newPage);
      navigate(`/${Url}/${newPage}`);
    } else {
      setCurrentPage(1);
      setTempPage(1);
      navigate(`/${Url}/${1}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">

      <div className=" flex justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Buscar..." className="w-auto" />
          <Button type="button" variant="outline">
            Filtrar
          </Button>
        </div>
        <Button type="button" onClick={() => setOpen(true)}>
          Crear tipo de categoria
        </Button>
        <Modalcategory open={open} onClose={() => setOpen(false)} />
      </div>

      {isloading ? (
        <TableSkeleto />
      ) : (
        <>
          <DataTable columns={columns} data={data} />
          {/* Paginación */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              size="icon"
              className="h-8 w-8 hover:bg-gray-400/25"
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </Button>
            {/* Page input */}
            <span className="flex items-center gap-2">
              <Input
                className="w-10 h-8 border rounded px-2 py-1 bg-transparent"
                inputMode="numeric"
                value={tempPage}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (!isNaN(num)) setTempPage(num);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePageChange(tempPage);
                  }
                }}
              />
              / {totalPages}
            </span>

            <Button
              size="icon"
              className="h-8 w-8 hover:bg-gray-400/25"
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </Button>
            <p className="text-muted-foreground">{`${items} Elementos`}</p>
          </div>
        </>
      )}
    </div>
  );
}
