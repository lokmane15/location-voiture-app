import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { MdNavigateBefore } from "react-icons/md";
function Sidebar({ isOpen, onClose }) {
  const { logout } = useLogout();
  const handleClickLogout = () => {
    logout();
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-gray-800 bg-opacity-50 z-50 ${isOpen ? "" : "hidden"}`}
      onClick={onClose}
    >
      <div className="max-w-xs w-full bg-white h-full shadow-lg fixed top-0 right-0 z-50 overflow-y-auto">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose}>
            <svg className="h-6 w-6 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          <Link to="/cars" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Cars</Link>
          <Link to="/contactus" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Contact Us</Link>
          <Link to="/contrat" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Contrat</Link>
          <button onClick={handleClickLogout} className="dropdown-menu-item px-4 py-2">
                      Logout
                      <RiLogoutCircleRLine className="inline ml-2" />
          </button>
        </nav>
      </div>
    </div>
  );
}

function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [profil, setProfil] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = () => {
    setProfil(!profil);
  };

  const handleClickLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-sky-600 w-full fixed top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link to="/" className="text-slate-300 font-bold">
              <h6>Location<span className="text-cyan-400">Voiture</span><FaCarSide className="inline ml-1 text-lg" /></h6>
            </Link>
          </div>
          <div className="hidden md:block flex items-center justify-center space-x-8">
            <Link
              to="/cars"
              className="text-slate-300 hover:text-black hover:bg-cyan-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 "
            >
              Cars
            </Link>
            <Link
              to="/contactus"
              className="text-slate-300 hover:text-black hover:bg-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 "
            >
              Contact Us
            </Link>
            
            <Link
              to="/contrat"
              className="text-slate-300 hover:text-black hover:bg-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 "
            >
              Contrat
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              
            <div className="ml-4 flex items-center md:ml-6">
              {!user ? (
                <div>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </Link>
                </div>)
                :
                <div className="dropdown">
                <FaRegUserCircle className="profil-icon text-white cursor-pointer text-2xl" onClick={handleClick} />
                {profil && (
                  <div className="dropdown-menu bg-white p-3 mt-2">
                    <div className="dropdown-menu-item ml-3">Username: {user.user.nom}</div>
                    <button onClick={handleClickLogout} className="dropdown-menu-item">
                      Logout
                      <RiLogoutCircleRLine className="inline ml-2" />
                    </button>
                  </div>
                )}
              </div>              
              }
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex items-center">
        {/* {user && (
          <div className="ml-4 flex items-center">
            <span className="text-gray-300 mr-2">Welcome, {user.user.nom}</span>
            <button onClick={handleClickLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Logout <RiLogoutCircleRLine className="inline ml-1" />
            </button>
          </div>
        )} */}
        <MdNavigateBefore className="text-white cursor-pointer text-2xl ml-4 absolute top-5 right-5" onClick={toggleSidebar} />
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        )}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
