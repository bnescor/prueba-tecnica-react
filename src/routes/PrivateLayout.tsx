import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export function PrivateLayout() {
  return (
    <div className="flex">
      <Navbar />
      <main className="md:ml-80 px-6 pb-6 pt-24 w-full min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
