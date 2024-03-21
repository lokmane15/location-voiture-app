import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import useAuthContext from "../hooks/useAuthContext";

export default function ProfilUser() {
    const { logout } = useLogout();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuthContext();

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickLogout = () => {
        logout();
    };

    return (
        <div className="user-profile relative">
            <span >
                <FaRegUserCircle className="profil-icon cursor-pointer text-2x" onClick={handleToggleMenu} />
            </span>
            {isOpen && (
                <div className="dropdown-menu absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg" >
                    <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Username: {user.user.nom}</p>
                    <button onClick={handleClickLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Logout
                        <RiLogoutCircleRLine className="inline ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
}
