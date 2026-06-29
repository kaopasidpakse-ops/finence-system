import '../Form-Login/Form-Login.css';
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

import axios from "axios";  

type LoginDataType = {
    username: string;
    password: string | number;
};

function FormLogin() {
      // 👉 ໄປໜ້າ dashboard
    const navigate = useNavigate();


    const [LoginData, setLoginData] = useState<LoginDataType>({
        username: "",
        password: "",
    });
    // console.log(LoginData);

    const LoginUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!LoginData.username || !LoginData.password) {
            alert("Please fill in all fields");
            return;
        }   
        try {
            const res = await axios.post(
                "http://localhost:3000/api/login",
                LoginData
            );
            // console.log(res.data);
            alert("Login successful");

          // ສັງ token ໃຫ bowser localStorage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user.role); // ສັງ role ເພື່ອໃຊ້ໃນ ProtectedRoute
          localStorage.setItem("username", res.data.user.username); // ສັງ username ເພື່ອໃຊ້ໃນ Header
       navigate("/income")
     //   console.log("Token stored in localStorage:", res.data.token); // ກວດສອບ token
            

            setLoginData({
                username: "",
                password: "",
            });
        }
        catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };


    return (
        <div>
            <div className="login-container">
                <h2>Login</h2>
                
                <form className="login-form" onSubmit={LoginUser}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter username" value={LoginData.username} onChange={(e) => setLoginData({...LoginData, username: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" value={LoginData.password} onChange={(e) => setLoginData({...LoginData, password: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>





                </form>
            </div>
        </div>
    );
}

export default FormLogin;