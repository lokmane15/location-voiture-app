import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { FaCarSide, FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
function Sidebar() {
  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white'>
        <div className='flex items-center gap-2 px-1 py-3'>
            <span className='text-neutral-100 text-lg'>CarRental</span>
        </div>
        <div className="flex-1 py-8 flex flex-col gap-0.5">
        <Link
              className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutrel-600 rounded-sm text-base"
              to="/"
            >
                <RxDashboard />
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>
            <Link
              className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutrel-600 rounded-sm text-bas"
              to="/cars"
            >
                <FaCarSide />
              <span className="mx-4 font-medium">Cars</span>
            </Link>
            <Link
              className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutrel-600 rounded-sm text-bas"
              to="/users"
            >
                <FaRegUser />
              <span className="mx-4 font-medium">Users</span>
            </Link>
            <Link
              className="flex items-center px-3 py-2 font-light hover:bg-neutral-700 hover:no-underline active:bg-neutrel-600 rounded-sm text-bas"
              to="/reservation"
            >
                <IoDocumentTextOutline />
              <span className="mx-4 font-medium">Reservation</span>
            </Link>
        </div>
        <div>
            <hr className='opacity-20' />
            <p className='text-red-600 p-4'>logout</p>
        </div>
    </div>
    // <div className="fixed h-screen">
    //   <div className="flex flex-col w-64 h-full px-4 py-8 bg-gray-900 border-r dark:bg-gray-800 dark:border-gray-700">
    //     <h2 className="text-3xl font-semibold text-center text-white">CarRental</h2>
    //     <div className="flex flex-col justify-between flex-1 mt-6">
    //       <nav>
    //         <Link
    //           className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
    //           to="/"
    //         >
    //           <span className="mx-4 font-medium">Dashboard</span>
    //         </Link>
    //         <Link
    //           className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
    //           to="/cars"
    //         >
    //           <span className="mx-4 font-medium">Cars</span>
    //         </Link>
    //         <Link
    //           className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
    //           to="/users"
    //         >
    //           <span className="mx-4 font-medium">Users</span>
    //         </Link>
    //         <Link
    //           className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
    //           to="/reservation"
    //         >
    //           <span className="mx-4 font-medium">Reservation</span>
    //         </Link>
    //       </nav>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Sidebar;
