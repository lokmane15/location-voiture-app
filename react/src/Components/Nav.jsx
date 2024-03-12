import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

function Navbar() {
  const {logout}=useLogout()
  const {user}=useAuthContext()
  const handleClick=()=>{
    logout()
  }
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white">
              Logo
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/cars"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cars
                </Link>
                <Link
                  to="/contactus"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
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
                <button onClick={handleClick}>log out</button>
              }
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
