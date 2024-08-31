import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";


export default function useAuth() {
    const admin = useSelector((state) => state.auth.admin);
    const dispatch = useDispatch();

    const loginAdmin = (adminData) =>{
        dispatch(login(adminData));
    }
    const logoutAdmin = () =>{
        dispatch(logout());
    }

    return {admin,loginAdmin,logoutAdmin}
}
