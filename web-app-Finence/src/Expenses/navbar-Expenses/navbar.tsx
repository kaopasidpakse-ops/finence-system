
import "./navbar.css"
function Navbar() {
    const role = localStorage.getItem("role");// ດຶງ role ຈາກ localStorage
   
    return (
        <nav className="navbar-expenses">
            <ul className="navbar-list-expenses">
               <li className="Income-expenses"> <button><a href="/income">Income</a></button></li>
                <li className="Expenses-expenses" ><button  style={{backgroundColor : "#ffffff"}}><a href="/expenses">Expenses</a></button></li>
            </ul>
            <div className="Register">
        {role === "admin" && (
            <button className="register-button"><a href="/register">Register</a></button>
        )}
            <button className="register-button"><a href="/">Login</a></button>
            </div>
        </nav>
    );
}

export default Navbar;