
import "./navbar.css"
function Navbar() {
    const role = localStorage.getItem("role");// ດຶງ role ຈາກ localStorage
    return (
        <nav className="navbar-income">
            <ul className="navbar-list-income">
               <li className="Income"> <button style={{backgroundColor : "#ffffff"}}><a href="/income">Income</a></button></li>
                <li className="Expenses" ><button ><a href="/expenses">Expenses</a></button></li>
                
            </ul>
            <div className="Register">
                    {role === "admin" && (
             <button className="register-button"><a href="/register">Register</a></button>
                )}
              <button className="register-button"><a href="/">logout</a></button>
            </div>
        </nav>
    );
}

export default Navbar;