import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Nav";

export default function Layout() {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
