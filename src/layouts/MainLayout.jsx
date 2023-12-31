import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { GiSpellBook } from "react-icons/gi";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import LoadingSpinner from "../utils/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
  const { toggleTheme, checked } = useContext(ThemeContext);
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="drawer block z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full bg-base-300">
          <div className="flex items-center w-full max-w-7xl mx-auto px-8">
            <div className="toggle-div fixed top-1/2 transform -translate-y-1/2 left-0 lg:left-auto lg:-ms-6 ms-0.5 ps-px -rotate-90 z-20">
              <div className="flex justify-center items-center gap-2 absolute">
                <span className="text-sm">Toggle</span>
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={toggleTheme}
                  checked={checked}
                />
                <span className="text-sm">Theme</span>
              </div>
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="logo flex-1 px-2 mx-2 font-bold text-xl">
              <div className="flex gap-3 items-center">
                <GiSpellBook className="text-4xl -mt-2" />
                Encyclopaedia
              </div>
            </div>
            <div className="flex-none hidden lg:block">
              <div className="menu menu-horizontal font-semibold text-base items-center">
                {/* Navbar menu content here */}
                <Navbar />
              </div>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <div className="mx-auto w-full max-w-7xl px-10 overflow-x-hidden z-10">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-6 w-80 min-h-full bg-base-200 text-lg font-semibold">
          {/* Sidebar content here */}
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
