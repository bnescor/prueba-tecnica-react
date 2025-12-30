import type { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { categoryData } from "@/hooks/useActions";

function ActionsCell() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>
          <Ellipsis className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex items-center flex-col gap-2">
          <Button variant={"ghost"}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant={"ghost"}>
            <Trash className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Status({ status }: { status: number }) {
  return (
    <Badge
      className={`flex items-center gap-1.5 px-2.5 py-1 max-w-fit
            ${
              status === 1
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
      variant={"outline"}
    >
      {status === 1 ? "Activo" : "Inactivo"}
    </Badge>
  );
}

function formatDate(dateString: Date) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export const columCategory: ColumnDef<categoryData>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 max-w-57.5">
          <Badge
            className="h-5 min-w-5 rounded-full px-1"
            style={{ backgroundColor: row.original.color }}
          />
          <p className="wrap-break-word whitespace-normal leading-snug">
            {row.original.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "icon",
    header: "Icono",
    enableSorting: true,
    cell: ({ row }) => {
      const icon = row.original.icon;
      return (
        <img
          src={icon}
          alt="icon"
          className="h-12 w-12 object-contain rounded-lg aspect-4/3"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = "/Fallback.png")}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    enableSorting: true,
    cell: ({ row }) => {
      return <Status status={row.original.status} />;
    },
  },
  {
    accessorKey: "description",
    header: "Descripcion",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="w-37.5">
          <p className="wrap-break-word whitespace-normal first-letter:uppercase">
            {row.original.description}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
    enableSorting: true,
    cell: ({ row }) => {
      return <p>{formatDate(row.original.createdAt)}</p>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    enableSorting: true,
    cell: () => {
      return <ActionsCell />;
    },
  },
];
