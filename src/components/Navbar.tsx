"use client";
import { Loader2, LogOut } from "lucide-react";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import { dataSlider } from "@/lib/Navbar.data";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import vectorLogo from "/public/logowhite.png";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth.store";
export function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const isLoggingOut = useAuthStore((s) => s.isLoggingOut);

  const basePath = pathname === "/" ? "/" : "/" + pathname.split("/")[1];

  return (
    <>
      <div className="w-full h-20 flex items-center justify-between p-2 gap-4 bg-blue-950 top-0 fixed md:justify-end z-30">
        <div className="flex md:hidden h-10">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color={isOpen ? "#ef4444" : "#cbd5e1"}
            size={20}
            hideOutline={true}
            distance="sm"
          />
        </div>
      </div>
      <nav
        className={`w-[65%] md:w-[40%] max-w-80 h-screen flex flex-col bg-background gap-4 
          ${isOpen ? "clip-open" : "clip-close"} z-30 fixed top-0`}
      >
        <div className="flex items-center justify-between h-20 p-4 bg-blue-950">
          <img src={vectorLogo} alt="Logo de la empresa" />
          <Link
            className="flex items-center gap-3"
            to={"/"}
            onClick={() => {
              setOpen(false);
            }}
          ></Link>
          <div className="flex md:hidden h-10">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              color={isOpen ? "#ef4444" : "#cbd5e1"}
              size={20}
              hideOutline={true}
              distance="sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 font-medium text-sm px-3 py-2 border-r">
          <ul className="flex flex-col gap-3">
            {dataSlider.map((data) => {
              const dataBase =
                data.href === "/" ? "/" : "/" + data.href.split("/")[1];
              const isActive = basePath === dataBase;
              return (
                <Link
                  to={data.href}
                  key={data.name}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex gap-3 items-center p-4 hover:bg-blue-300/20 hover:border-l-4 hover:border-blue-400 cursor-pointer transition-colors",
                    isActive && "bg-blue-300/20 border-l-4 border-blue-400"
                  )}
                >
                  <data.Icon strokeWidth={1} className="w-4 h-4" />
                  {data.name}
                </Link>
              );
            })}
          </ul>
          <Button variant={"ghost"} onClick={logout} disabled={isLoggingOut}>
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            {isLoggingOut ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
          </Button>
        </div>
      </nav>
      <div
        onClick={() => setOpen(false)}
        className={
          isOpen
            ? "w-full h-screen fixed top-0 bg-white/20 backdrop-blur-sm z-20 md:hidden"
            : "hidden"
        }
      />
    </>
  );
}
