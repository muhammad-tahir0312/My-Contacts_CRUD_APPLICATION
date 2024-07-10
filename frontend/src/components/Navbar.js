import { Link, useNavigate } from "react-router-dom";

const Navbar=()=>{
    const auth = localStorage.getItem("User");
    const navigate = useNavigate();

    function Logout() {
        localStorage.removeItem("User");    
        navigate("/register");
    }

    return(
        <div className="Navbar">
            {
                auth? 
                <ul className="nav-ul">                        
                    <li><Link to="/">CRUD Application</Link></li>                        
                    <li><Link to="/create_contact">Create Contact</Link></li>
                    <li><Link to="/update_contact">Update Contact</Link></li>
                    <li><Link to="/view_all_contacts">View All Contacts</Link></li>
                    <li><Link to="/my_profile">My Profile</Link></li>
                    <li> <Link onClick={Logout} to="/register">Logout ({JSON.parse(auth).username})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-ul-left">                        
                    <li> <Link to="/register">Register</Link></li>
                    <li> <Link to="/Login">Login</Link></li>
                </ul>
            }
        </div>
    );
}

export default Navbar;