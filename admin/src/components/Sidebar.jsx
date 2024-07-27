function Sidebar() {
  return (
    <>
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-900 border-r dark:bg-gray-800 dark:border-gray-700">
    <h2 className="text-3xl font-semibold text-center text-white">CarRental</h2>
    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
        <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
            href="#"
        >
            <span className="mx-4 font-medium">Dashboard</span>
            <span className="mx-4 bg-gray-500 text-gray-100 text-xs rounded-full px-2 py-0.5">5</span>
        </a>
        <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
            href="#"
        >
            <span className="mx-4 font-medium">Cars</span>
            </a>
        <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
            href="#"
        >
            <span className="mx-4 font-medium">Users</span>
            <span className="mx-4 bg-gray-500 text-gray-100 text-xs rounded-full px-2 py-0.5">12</span>
        </a>
        <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
            href="#"
        >
            <span className="mx-4 font-medium">Reservation</span>
            <span className="mx-4 bg-gray-500 text-gray-100 text-xs rounded-full px-2 py-0.5">20+</span>
        </a>
        <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
            href="#"
        >
            <span className="mx-4 font-medium">Documents</span>
        </a>
        <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
            href="#"
        >
            <span className="mx-4 font-medium">Reports</span>
        </a>
        </nav>
    </div>
    </div>
    </>
)
}

export default Sidebar