import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Nav";

export default function Layout() {
    return (
        <>
        <Navbar/>
            <main>
                <Outlet/>
            </main>
        <Footer/>
        </>
    )
}