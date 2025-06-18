import '../css/NavigationBar.css'
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <nav className="navbar">
            <div className="logo">WithCenter Project</div>
            <div className="nav-links">
                <Link to="/create-blog">Create Blog</Link>
                <Link to="/logout">Log Out</Link>
            </div>
        </nav>
    )
}

export default NavigationBar