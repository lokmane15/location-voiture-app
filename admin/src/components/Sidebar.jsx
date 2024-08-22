import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaCarSide, FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiPorsche } from "react-icons/si";
import { IoLogoModelS } from "react-icons/io";

function Sidebar() {
  return (
    <div className="fixed h-full bg-neutral-900 text-white w-60 p-3 flex flex-col ">
      <div className="flex items-center gap-2 px-1 py-3">
        <h6 className=" text-2xl font-semibold">
          Car<span className="text-cyan-400 text-2xl">Rental</span>
          <FaCarSide className="inline ml-1 text-2xl" />
        </h6>
      </div>
      <div className="flex-1 py-8 flex space-y-2 flex-col gap-0.5">
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-2 py-2 font-light rounded-md text-base ${
              isActive ? "bg-cyan-400" : " hover:bg-cyan-400 hover:no-underline"
            }`
          }
          to="/"
        >
          <RxDashboard />
          <span className="mx-4 font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-2 py-2 font-light rounded-md text-base ${
              isActive ? "bg-cyan-400" : " hover:bg-cyan-400 hover:no-underline"
            }`
          }
          to="/cars"
        >
          <FaCarSide />
          <span className="mx-4 font-medium">Cars</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-2 py-2 font-light rounded-md text-base ${
              isActive ? "bg-cyan-400" : " hover:bg-cyan-400 hover:no-underline"
            }`
          }
          to="/users"
        >
          <FaRegUser />
          <span className="mx-4 font-medium">Users</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-2 py-2 font-light rounded-md text-base ${
              isActive ? "bg-cyan-400" : " hover:bg-cyan-400 hover:no-underline"
            }`
          }
          to="/reservation"
        >
          <IoDocumentTextOutline />
          <span className="mx-4 font-medium">Reservation</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-2 py-2 font-light rounded-md text-base ${
              isActive ? "bg-cyan-400" : " hover:bg-cyan-400 hover:no-underline"
            }`
          }
          to="/marque"
        >
          <SiPorsche />
          <span className="mx-4 font-medium">marque</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center px-2 py-2 font-light rounded-md text-base ${
              isActive ? "bg-cyan-400" : " hover:bg-cyan-400 hover:no-underline"
            }`
          }
          to="/model"
        >
          <IoLogoModelS />
          <span className="mx-4 font-medium">model</span>
        </NavLink>
      </div>
      <div>
        <hr className="opacity-20" />
        <p className="text-red-600 p-4 cursor-pointer">Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
