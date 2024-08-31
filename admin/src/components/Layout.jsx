import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 p-4 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
