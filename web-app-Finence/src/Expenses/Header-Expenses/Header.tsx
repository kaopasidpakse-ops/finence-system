 import axios from "axios";
import "./Header.css";
 import { useEffect , useState } from "react";
 const API = import.meta.env.VITE_API_URL;
   
 function Header() {
    const role = localStorage.getItem("role");// ດຶງ role ຈາກ localStorage
    const username = localStorage.getItem("username"); // ດຶງ username ຈາກ localStorage
    const [netBalance, setNetBalance] = useState(0);

    useEffect(() => {
        const fetchNetBalance = async () => {
            try {
                const response = await axios.get(`${API}/api/Total-money`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setNetBalance(response.data.netBalance);
            } catch (error) {
                console.error('Error fetching net balance:', error);
            }
        };

        fetchNetBalance();
    }, []);

    return (
        <header className="header-expenses">
            <h1>Finence</h1>
            <div className="user-info-expenses">
           <p style={{ fontWeight: 'bold' , textTransform: "uppercase" }}>Username: {username}</p>
            <p style={{ fontWeight: 'bold' , textTransform: "uppercase" }}>Role: {role}</p>
            </div>
            <div className="container-money-expenses">
                <div className="name-money-expenses">
                    <h2>Money</h2>
                    
                </div>
                    <div className="money-expenses">
                    <p>₭ {netBalance.toLocaleString()}</p>
                </div>
            </div>
        </header>
    );
}
export default Header;