import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { FaCarSide, FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

function Sidebar() {
  return (
    <div className='fixed h-full bg-neutral-900 w-60 p-3 flex flex-col text-white'>
      <div className='flex items-center gap-2 px-1 py-3'>
        <span className='text-neutral-100 text-lg'>CarRental</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        <Link
          className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          to="/"
        >
          <RxDashboard />
          <span className="mx-4 font-medium">Dashboard</span>
        </Link>
        <Link
          className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          to="/cars"
        >
          <FaCarSide />
          <span className="mx-4 font-medium">Cars</span>
        </Link>
        <Link
          className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          to="/users"
        >
          <FaRegUser />
          <span className="mx-4 font-medium">Users</span>
        </Link>
        <Link
          className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
          to="/reservation"
        >
          <IoDocumentTextOutline />
          <span className="mx-4 font-medium">Reservation</span>
        </Link>
      </div>
      <div>
        <hr className='opacity-20' />
        <p className='text-red-600 p-4 cursor-pointer'>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
