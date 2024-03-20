import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

export default function ProfilUser() {
    const [isHovered, setIsHovered] = useState(false);
    const {logout}=useLogout();
        const handleMouseEnter = () => {
        setIsHovered(true);
        };
    
        const handleMouseLeave = () => {
        setIsHovered(false);
        };
    
        const handleClick=()=>{
            logout()
        }
    return (
        <div className="user-profile">
            <div className="user-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <FaRegUserCircle />
            </div>
            {isHovered && (
            <div className="user-details">
                <h1>hhhhhhhhhhhhhhhh</h1>
                <button color="red" onClick={handleClick} className="text-white text-2xl "><RiLogoutCircleRLine /></button>
            </div>
            )}
        </div>
    );

}
