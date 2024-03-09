import { Link } from 'react-router-dom'
export default function Nav() {
    return (
        <nav>
            <div className="Nav">
                <Link to="/">logo</Link>
                <Link to="/cars">cars</Link>
                <Link to="/Contactus">contact us</Link>
            </div>
        </nav>
    )
}
