import { Skeleton } from "./ui/skeleton";

export default function TableSkeleto() {
  return (
    <>
      <Skeleton className="border rounded-sm w-full h-96" />
      <div className="flex justify-center items-center gap-1 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton className="h-8 w-8 rounded-sm" key={i} />
        ))}
      </div>
    </>
  );
}
